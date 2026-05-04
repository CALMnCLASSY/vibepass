/**
 * AI Browser Detection Script
 *
 * Detects when the Claude Chrome extension (or similar AI agent tooling) is actively
 * browsing the page. Detection signals are based on known artifacts injected by the
 * Claude Chrome extension (ID: fcoeoabgfenejglbffodgkkbkcdhcgfn).
 *
 * Signals detected:
 *   1. window.__claudeElementMap (global injected by content script)
 *   2. window.__generateAccessibilityTree (global injected by content script)
 *   3. <style id="claude-agent-animation-styles"> (persists after agent finishes)
 *   4. <div id="claude-agent-stop-container"> (present during active agent control)
 */
(function () {
	"use strict";

	var POLL_INTERVAL_MS = 1500;
	var POLL_DURATION_MS = 15000;

	var detected = false;
	var signals = {};

	function checkGlobals() {
		if (typeof window.__claudeElementMap !== "undefined") {
			signals.claudeElementMap = true;
		}
		if (typeof window.__generateAccessibilityTree === "function") {
			signals.generateAccessibilityTree = true;
		}
	}

	function checkDomElements() {
		var match = document.querySelector('[id^="claude-agent-"]');
		if (match) {
			signals.agentDomArtifact = match.id;
		}
	}

	function setupMutationObserver() {
		if (typeof MutationObserver !== "function") return;

		var observer = new MutationObserver(function (mutations) {
			for (var i = 0; i < mutations.length; i++) {
				var added = mutations[i].addedNodes;
				for (var j = 0; j < added.length; j++) {
					var node = added[j];
					if (node.nodeType !== 1) continue;
					if (node.id && node.id.indexOf("claude-agent-") === 0) {
						signals.agentDomArtifact = node.id;
						evaluate();
					}
				}
			}
		});

		observer.observe(document.documentElement, {
			childList: true,
			subtree: true,
		});
	}

	function evaluate() {
		if (detected) return;

		checkGlobals();
		checkDomElements();

		// High-confidence: at least one of the injected globals found
		if (signals.claudeElementMap || signals.generateAccessibilityTree) {
			onDetected("active_agent");
			return;
		}

		// Medium-confidence: DOM artifacts present (agent was or is active)
		if (signals.agentDomArtifact) {
			onDetected("agent_artifacts");
			return;
		}
	}

	function onDetected(level) {
		if (detected) return;
		detected = true;

		var payload = {
			level: level,
			signals: signals,
			url: window.location.href,
			timestamp: new Date().toISOString(),
			userAgent: navigator.userAgent,
		};

		// Log to console for debugging
		console.info("[seg-ai-detect]:", payload);

		if (typeof posthog !== "undefined" && typeof posthog.capture === "function") {
			posthog.capture("seg-ai-detect", payload);
		}

		// // Dispatch custom event so other scripts can react
		// try {
		// 	var event = new CustomEvent('seg:ai-browser-detected', { detail: payload });
		// 	document.dispatchEvent(event);
		// } catch (e) {
		// 	// CustomEvent not supported in old browsers — not critical.
		// }
	}

	// --- Run detection ---

	// Immediate check
	evaluate();

	// Watch for DOM injections
	setupMutationObserver();

	// Poll for globals that may be injected after page load
	var pollStart = Date.now();
	var pollTimer = setInterval(function () {
		evaluate();
		if (detected || Date.now() - pollStart > POLL_DURATION_MS) {
			clearInterval(pollTimer);
		}
	}, POLL_INTERVAL_MS);
})();
