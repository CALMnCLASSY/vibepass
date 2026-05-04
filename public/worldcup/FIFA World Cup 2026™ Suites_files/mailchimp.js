/* Form submission functions for the MailChimp Widget */
;(function($){
	$(function($) {
		// Change our submit type from HTML (default) to JS
		$('#mc_submit_type').val('js');
		
		// Attach our form submitter action
		$('#mc_signup_form').ajaxForm({
			url: mailchimpSF.ajax_url, 
			type: 'POST', 
			dataType: 'text',
			beforeSubmit: mc_beforeForm,
			success: mc_success
		});
		$('#mc_signup_form2').ajaxForm({
			url: mailchimpSF.ajax_url, 
			type: 'POST', 
			dataType: 'text',
			beforeSubmit: mc_beforeForm,
			success: mc_success
		});

	});
	
	function mc_beforeForm(){
		// Disable the submit button
		$('.mc_signup_submit .blue.button').attr("disabled","disabled");
		$('.mc_signup_submit .blue.button').val("Submitting...")
	}
	function mc_success(data){

		var is_newsletter = false;
		if($('.mc_merge_var.mc_merge_container_FNAME').is(":visible")) 
		{ is_newsletter = false; } 
		else 
		{ is_newsletter = true; }

		// Put the response in the message div
		if(data && data.length < 500) {
			$('#mc_message').html(data);
		}
		
		// Re-enable the submit button
		$('.mc_signup_submit .blue.button').removeAttr("disabled");
		$('.mc_signup_submit .blue.button').val("Submit Request");

		//$('body').scrollTo('#header',{duration:'slow'});
		
		// See if we're successful, if so, wipe the fields
		var reg = new RegExp("class='mc_success_msg'", 'i');
		var xref = $('#mc_mv_XREF').val();
		var browser = $('#mc_mv_BROWSER').val();

		//use these vars to determine if we're executing on local or prod
		var parts = location.hostname.split('.');
		var subdomain = parts.shift();

		//***********************************************************************************************
		// VALID DATA SUBMITTED
		//***********************************************************************************************
		if (reg.test(data)){

			show_blackout();

			$('#mc_signup_form').find('input:text, input:password, input:file, select, textarea').val('');
			$('#mc_mv_XREF').val(xref);
			$('#mc_mv_BROWSER').val(browser);

			if ( document.getElementById("seg_stadium_page") == null ) {

				//----------------------------------------------------------------------------
				// SELL YOUR SUITE PAGE LIGHTBOX FORM
				if( $('.sys_request_lightbox').length && $('.sys_request_lightbox').is(':visible') ) {

					//sell your suite page lightbox request form
					$('#mc_message').hide();
					$('.pre_submit').hide();
					$('.post_submit').fadeIn(600);
					$('.loader').delay(200).fadeIn(400);
					$('.pre_submit').animate(
						{opacity:0}, 
						600,
						function(){
							$('.loader').delay(800).fadeOut(200, function() {
								$('.request_success_container').fadeIn(200);
							});
							
						}
					);
					if (subdomain !== "local") {
						if(typeof _gaq !== 'undefined') {
							_gaq.push(['_trackEvent', 'Forms', 'Submit - success', 'Sell your suite']);
						}
					}
				}

				//----------------------------------------------------------------------------
				// NEW EDP - WAITLIST SIGN UP
				else if( $('#edp_container.no-listings').length ) {

					//TODO: animate
					close_all_lightboxes();
					
					$('#lightbox2').appendTo($('#blackout'));
					$('#lightbox2').show();

					if (subdomain !== "local") {
						
						if(typeof _gaq !== 'undefined') {
							_gaq.push(['_trackEvent', 'Forms', 'Submit - success', 'Book a suite inline']);
						}
						
						// optimizely goal tracking
						// ensures the optimizely object is defined globally using
						// window['optimizely'] = window['optimizely'] || [];

						// sends a tracking call to Optimizely for the given event name. 
						// window.optimizely.push(["trackEvent", "request_submission"]);	
					}
				} 

				//----------------------------------------------------------------------------
				// BOOK A SUITE PAGE, SYS PAGE EMBEDDED FORM
				else {

					//book a suite page
					show_lightbox('lightbox');

					if (subdomain !== "local") {
						if( document.getElementById("make_a_request_page") != null ) {
							if(typeof _gaq !== 'undefined') {
								_gaq.push(['_trackEvent', 'Forms', 'Submit - success', 'Book a suite']);
							}
						} else if( xref === "inspirato" ) {
							if(typeof _gaq !== 'undefined') {
								_gaq.push(['_trackEvent', 'Forms', 'Submit - success', 'Book a suite']);
							}
						} else {
							if(typeof _gaq !== 'undefined') {
								_gaq.push(['_trackEvent', 'Forms', 'Submit - success', 'Sell your suite']);
							}
						}

						// optimizely goal tracking
						// ensures the optimizely object is defined globally using
						// window['optimizely'] = window['optimizely'] || [];

						// sends a tracking call to Optimizely for the given event name. 
						// window.optimizely.push(["trackEvent", "request_submission"]);	
					}
				}
			}

			//old LB7 no inventory request
			else if($('.no-listings').length) {

				//TODO: animate
				close_all_lightboxes();
				$('#mc_message').show();
				$('.pre_submit').hide();
				$('.newsletter_success_container').hide();
				$('.post_submit').show();
				$('.request_success_container').fadeIn(200);
				
				toggle2();

				if (subdomain !== "local") {
					
					if(typeof _gaq !== 'undefined') {
						_gaq.push(['_trackEvent', 'Forms', 'Submit - success', 'Book a suite inline']);
					}
					
					// optimizely goal tracking
					// ensures the optimizely object is defined globally using
					// window['optimizely'] = window['optimizely'] || [];

					// sends a tracking call to Optimizely for the given event name. 
					// window.optimizely.push(["trackEvent", "request_submission"]);	
				}
				
			} else {

				$('#mc_message').hide();
				$('.pre_submit').hide();
				$('.post_submit').fadeIn(600);
				$('.loader').delay(200).fadeIn(400);
				$('.pre_submit').animate(
					{opacity:0}, 
					600,
					function(){
						$('.loader').delay(800).fadeOut(200, function() {
							if(!is_newsletter) {
								$('.request_success_container').fadeIn(200);
							} else {
								$('.newsletter_success_container').fadeIn(200);
							}
						});
						
					}
				);
				
				if (subdomain !== "local") {
					if(is_newsletter) {
						if(typeof _gaq !== 'undefined') {
							_gaq.push(['_trackEvent', 'Forms', 'Submit - success', 'Email sign up']);
						}
					} else {
						if(typeof _gaq !== 'undefined') {
							_gaq.push(['_trackEvent', 'Forms', 'Submit - success', 'Book a suite inline']);
						}
						
						// optimizely goal tracking
						// ensures the optimizely object is defined globally using
						// window['optimizely'] = window['optimizely'] || [];

						// sends a tracking call to Optimizely for the given event name. 
						// window.optimizely.push(["trackEvent", "request_submission"]);
					}
				}
			}
			
			if (subdomain !== "local") {
				// Facebook pixel
				fbq('track', 'CompleteRegistration');

				// Adroll
			    adroll_adv_id = "BUD4HIIWGNBDNLZR3KHKY5";
			    adroll_pix_id = "DMD2YUYQJBGYLLZF4JG4TV";
			    /* OPTIONAL: provide email to improve user identification */
			    /* adroll_email = "username@example.com"; */

			    (function () {
			        var _onload = function(){
			            if (document.readyState && !/loaded|complete/.test(document.readyState)){setTimeout(_onload, 10);return}
			            if (!window.__adroll_loaded){__adroll_loaded=true;setTimeout(_onload, 50);return}
			            var scr = document.createElement("script");
			            var host = (("https:" == document.location.protocol) ? "https://s.adroll.com" : "http://a.adroll.com");
			            scr.setAttribute('async', 'true');
			            scr.type = "text/javascript";
			            scr.src = host + "/j/roundtrip.js";
			            ((document.getElementsByTagName('head') || [null])[0] ||
			                document.getElementsByTagName('script')[0].parentNode).appendChild(scr);
			        };
			        if (window.addEventListener) {window.addEventListener('load', _onload, false);}
			        else {window.attachEvent('onload', _onload)}
			    }());
				try{
				    __adroll.record_user({"adroll_segments": "5dff5511"})
				} catch(err) {}
			}

			$('#mc_submit_type').val('js');

		} 

		//***********************************************************************************************
		// NO DATA SUBMITTED
		//***********************************************************************************************
		else {

			//show error message
			$('#mc_message').show();
						
			if (subdomain !== "local") {
				if( document.getElementById("make_a_request_page") != null ) {
					if(typeof _gaq !== 'undefined') {
						_gaq.push(['_trackEvent', 'Forms', 'Submit - errors', 'Book a suite']);
					}
				} else if ( document.getElementById("list_your_suite_page") != null ) {
					if(typeof _gaq !== 'undefined') {
						_gaq.push(['_trackEvent', 'Forms', 'Submit - errors', 'Sell your suite']);
					}
				} else {
					if(typeof _gaq !== 'undefined') {
						_gaq.push(['_trackEvent', 'Forms', 'Submit - errors', 'Email sign up']);
					}
				}
			}
		}
				

	}
})(jQuery);
