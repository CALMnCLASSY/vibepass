// ============================================
// API CONFIGURATION
// ============================================
// Update this to match your Laravel backend URL
// Examples:
// - Local: 'http://localhost/gettiko-v1/public'
// - Production: 'https://yourdomain.com'
// Note: If your Laravel app is on a different domain, ensure CORS is configured
const getBackendBaseUrl = () => {
    const hostname = window.location.hostname.toLowerCase();
    const isLocal = hostname.includes('localhost') || hostname.includes('127.0.0.1');
    const isDevHost = hostname.includes('getaticket.test');

    return (isLocal || isDevHost)
        ? 'http://getaticket.test'
        : 'https://getaticket.co.ke';
};

const API_BASE_URL = getBackendBaseUrl();
const SUPPORT_INQUIRY_URL = `${API_BASE_URL}/api/inquiries`;

let eventData = null;
let selectedShow = null;
let selectedPrices = [];
let selectedEvent = null;

function clearSupportFeedback() {
    const msg = document.getElementById('supportMessage');
    const err = document.getElementById('supportError');
    if (msg) msg.style.display = 'none';
    if (err) err.style.display = 'none';
}

function setSupportMessage({ success, text }) {
    const successEl = document.getElementById('supportMessage');
    const errorEl = document.getElementById('supportError');

    if (!successEl || !errorEl) return;

    if (success) {
        successEl.textContent = text || '';
        successEl.style.display = 'block';
        errorEl.style.display = 'none';
    } else {
        errorEl.textContent = text || 'Something went wrong.';
        errorEl.style.display = 'block';
        successEl.style.display = 'none';
    }
}

function setContinuePaymentSectionVisibility(events) {
    const section = document.getElementById('continuePaymentSection');
    if (!section) return;

    const hasInstallmentsEnabledEvent = Array.isArray(events)
        && events.some(event => !!event.allow_installments);

    section.style.display = hasInstallmentsEnabledEvent ? 'block' : 'none';
}

// Load event data on page load
async function loadEventData() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/showman`);
        const data = await response.json();
        
        if (data.status === 200 && data.events && data.events.length > 0) {
            eventData = data;
            setContinuePaymentSectionVisibility(data.events);
            
            // Combine all shows from all events and sort by date
            const allShows = [];
            
            // First, count shows per event
            const eventShowCounts = {};
            data.events.forEach(event => {
                eventShowCounts[event.id] = event.shows ? event.shows.length : 0;
            });
            
            data.events.forEach(event => {
                event.shows.forEach(show => {
                    // Extract time from prices if available (check first price's event_date)
                    let showTime = null;
                    if (show.prices && show.prices.length > 0 && show.prices[0].event_date) {
                        // Extract time directly from event_date string (format: Y-m-d H:i:s)
                        const priceDate = show.prices[0].event_date;
                        // Match time pattern HH:MM:SS or HH:MM
                        const timeMatch = priceDate.match(/(\d{1,2}):(\d{2})(?::\d{2})?/);
                        if (timeMatch) {
                            const hours = String(parseInt(timeMatch[1])).padStart(2, '0');
                            const minutes = timeMatch[2];
                            showTime = `${hours}:${minutes}`;
                        }
                    }
                    
                    // Fallback to event start_date if no time found
                    if (!showTime && event.start_date) {
                        const eventDate = event.start_date;
                        // Match time pattern HH:MM:SS or HH:MM
                        const timeMatch = eventDate.match(/(\d{1,2}):(\d{2})(?::\d{2})?/);
                        if (timeMatch) {
                            const hours = String(parseInt(timeMatch[1])).padStart(2, '0');
                            const minutes = timeMatch[2];
                            showTime = `${hours}:${minutes}`;
                        }
                    }
                    
                    // Add event info to each show for reference
                    allShows.push({
                        ...show,
                        event_id: event.id,
                        event_title: event.title,
                        event_slug: event.slug,
                        event_location: event.physical_location,
                        event_start_date: event.start_date,
                        allow_installments: !!event.allow_installments,
                        min_reserve_percent: Number(event.min_reserve_percent || 0),
                        installment_percent: Number(event.installment_percent || 0),
                        show_time: showTime,
                        event_show_count: eventShowCounts[event.id] || 0
                    });
                });
            });
            
            // Sort all shows by date
            allShows.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
            
            renderShows(allShows);
            updatePageTitle(data.events);
        } else {
            setContinuePaymentSectionVisibility([]);
            showError('Failed to load event data');
        }
    } catch (error) {
        console.error('Error loading event:', error);
        setContinuePaymentSectionVisibility([]);
        showError('Error connecting to server. Please check your API configuration.');
    }
}

function updatePageTitle(events) {
    if (events && events.length > 0) {
        if (events.length === 1) {
            document.title = `${events[0].title} - The Residency`;
        } else {
            // Multiple events - use a general title
            document.title = 'Showman Events - The Residency';
        }
    }
}

function formatDateCompact(dateString) {
    // Format like "4 APR 2026" - matching poster style
    const date = new Date(dateString + 'T00:00:00');
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                       'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const day = date.getDate();
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    return `${day} ${month} ${year}`;
}

function formatDateForDisplay(dateString) {
    // Parse date string (Y-m-d format)
    const date = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone issues
    const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
                       'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    const day = date.getDate();
    
    // Get ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) suffix = 'st';
    else if (day === 2 || day === 22) suffix = 'nd';
    else if (day === 3 || day === 23) suffix = 'rd';
    
    const month = monthNames[date.getMonth()];
    return `${month} ${day}${suffix}`;
}

function getEventBackgroundColor(eventTitle) {
    // If event title contains "VIP", use dark background
    // Otherwise, use red background
    if (eventTitle && eventTitle.toLowerCase().includes('vip')) {
        return '#1d1d1d'; // Dark background for VIP events
    }
    return '#e42e2e'; // Red background for all other events
}

function renderShows(shows) {
    const grid = document.getElementById('showsGrid');
    
    if (!shows || shows.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: 40px; color: #1d1d1d; font-size: 1.5rem;">No shows available</div>';
        return;
    }

    grid.innerHTML = shows.map(show => {
        const badgeClass = show.is_special ? 'special-badge' : '';
        const badgeText = show.is_special ? '★ HBD SPECIAL ★' : show.show_count;
        const formattedDate = formatDateCompact(show.date);
        
        // Escape event title for safe use in HTML/JS
        const eventTitleSafe = show.event_title ? show.event_title.replace(/'/g, "\\'").replace(/"/g, '&quot;') : '';
        const eventId = show.event_id || null;
        
        // Check if this is a VIP event
        const isVIP = show.event_title && show.event_title.toLowerCase().includes('vip');
        
        // Get contrasting background color for VIP events, red for others
        const backgroundColor = getEventBackgroundColor(show.event_title);
        const isDarkBackground = isVIP;
        const textColor = isDarkBackground ? '#e42e2e' : '#ffffff';
        const dateColor = isDarkBackground ? '#e42e2e' : '#ffffff';
        // Event name: dark for regular events, red for VIP
        const eventNameColor = isDarkBackground ? '#e42e2e' : '#1d1d1d';
        // Event location: always white
        const venueColor = '#ffffff';
        
        // Format day and time
        const dayTime = show.show_time ? `${show.day_short} ${show.show_time}` : show.day_short;
        
        // Show button if event has 2 or more shows, OR if it's a VIP event
        const showButton = (show.event_show_count || 0) >= 2 || isVIP;
        const buttonClass = isVIP ? 'btn-buy vip-button' : 'btn-buy';
        const buttonHtml = showButton ? `<button class="${buttonClass}">GET TICKETS</button>` : '';
        
        // Make card non-clickable if no button
        const cardOnClick = showButton ? `onclick="openModal('${show.date}', '${show.display_text}', ${JSON.stringify(show.prices).replace(/"/g, '&quot;')}, ${eventId || 'null'}, '${eventTitleSafe}')"` : '';
        const cardCursor = showButton ? 'cursor: pointer;' : 'cursor: default;';
        
        return `
            <div class="show-card" ${cardOnClick} style="background: ${backgroundColor}; color: ${textColor}; ${cardCursor}">
                <div class="show-card-left">
                    <div class="show-date-compact" style="color: ${dateColor};">${formattedDate}</div>
                    <div class="show-day-time">${dayTime}</div>
                </div>
                <div class="show-card-right">
                    <div class="show-event-name" style="color: ${eventNameColor};">${show.event_title || 'SHOWMAN'}</div>
                    ${show.event_location ? `<div class="show-venue" style="color: ${venueColor};">${show.event_location}</div>` : ''}
                    ${isVIP ? '<div class="vip-show-badge"><span class="vip-star">★</span> VIP SHOW</div>' : ''}
                    ${buttonHtml}
                </div>
            </div>
        `;
    }).join('');
}

function showError(message) {
    const grid = document.getElementById('showsGrid');
    grid.innerHTML = `<div style="text-align: center; padding: 40px; color: #1d1d1d; font-size: 1.5rem;">${message}</div>`;
}

async function submitSupportForm(event) {
    event.preventDefault();
    clearSupportFeedback();

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : 'SEND';
    const payload = {
        name: (document.getElementById('supportName').value || '').trim(),
        email: (document.getElementById('supportEmail').value || '').trim(),
        phone: (document.getElementById('supportPhone').value || '').trim(),
        subject: (document.getElementById('supportSubject').value || '').trim(),
        message: (document.getElementById('supportMessageText').value || '').trim()
    };

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
        setSupportMessage({ success: false, text: 'Name, email, subject, and message are required.' });
        return;
    }

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'SENDING...';
    }

    try {
        const response = await fetch(SUPPORT_INQUIRY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.status === 200) {
            setSupportMessage({
                success: true,
                text: 'Thank you — your message was sent successfully.'
            });
            form.reset();
        } else {
            const message = data.message || 'Unable to send your message. Please try again.';
            setSupportMessage({ success: false, text: message });
        }
    } catch (error) {
        setSupportMessage({
            success: false,
            text: 'Network error. Check your connection and try again.'
        });
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }
}

function openModal(showDate, displayText, prices, eventId = null, eventTitle = null) {
    selectedEvent = findEventById(eventId);

    selectedShow = {
        date: showDate,
        displayText: displayText,
        prices: typeof prices === 'string' ? JSON.parse(prices.replace(/&quot;/g, '"')) : prices,
        event_id: eventId,
        event_title: eventTitle,
        allow_installments: !!(selectedEvent && selectedEvent.allow_installments),
        min_reserve_percent: Number((selectedEvent && selectedEvent.min_reserve_percent) || 0),
        installment_percent: Number((selectedEvent && selectedEvent.installment_percent) || 0)
    };
    
    // Update modal title to include event name if available
    let modalTitleText = displayText;
    if (eventTitle) {
        modalTitleText = `${eventTitle} - ${displayText}`;
    }
    
    document.getElementById('modalTitle').textContent = modalTitleText;
    
    // Populate price options
    const priceSelect = document.getElementById('price_id');
    priceSelect.innerHTML = '<option value="">Select ticket type</option>';
    
    selectedPrices = selectedShow.prices.filter(price => {
        // Only show available prices (not locked and have quantity)
        return !price.locked && price.qty > 0;
    });
    
    selectedPrices.forEach(price => {
        const option = document.createElement('option');
        option.value = price.id;
        const priceText = price.no_cost ? 'FREE' : `KES ${price.price.toLocaleString()}`;
        const availableText = price.qty <= 10 ? ` (${price.qty} available)` : '';
        option.textContent = `${price.event_type} - ${priceText}${availableText}`;
        option.dataset.price = price.price;
        option.dataset.noCost = price.no_cost;
        option.dataset.maxQty = price.qty;
        priceSelect.appendChild(option);
    });

    if (selectedPrices.length === 0) {
        priceSelect.innerHTML = '<option value="">No tickets available</option>';
        priceSelect.disabled = true;
    } else {
        priceSelect.disabled = false;
    }

    // Remove existing listeners and add new one
    const newPriceSelect = priceSelect.cloneNode(true);
    priceSelect.parentNode.replaceChild(newPriceSelect, priceSelect);
    newPriceSelect.addEventListener('change', updateTicketQuantityOptions);

    const paymentModeSelect = document.getElementById('payment_mode');
    if (paymentModeSelect) {
        paymentModeSelect.onchange = updateInstallmentUI;
    }

    const ticketsSelect = document.getElementById('tickets');
    if (ticketsSelect) {
        ticketsSelect.onchange = updateInstallmentUI;
    }
    
    updateInstallmentUI();
    
    document.getElementById('ticketModal').classList.add('active');
    document.getElementById('formSection').style.display = 'block';
    document.getElementById('successMessage').classList.remove('active');
    document.body.style.overflow = 'hidden';
}

function updateTicketQuantityOptions() {
    const priceSelect = document.getElementById('price_id');
    const ticketsSelect = document.getElementById('tickets');
    
    if (!priceSelect || !ticketsSelect) return;
    
    const selectedOption = priceSelect.options[priceSelect.selectedIndex];
    
    if (!selectedOption || !selectedOption.value) {
        ticketsSelect.innerHTML = '<option value="">Select quantity</option>';
        return;
    }

    const maxQty = parseInt(selectedOption.dataset.maxQty) || 10;
    const currentValue = ticketsSelect.value;
    
    ticketsSelect.innerHTML = '<option value="">Select quantity</option>';
    
    for (let i = 1; i <= Math.min(maxQty, 10); i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} Ticket${i > 1 ? 's' : ''}`;
        if (i == currentValue) {
            option.selected = true;
        }
        ticketsSelect.appendChild(option);
    }

    updateInstallmentUI();
}

function findEventById(eventId) {
    if (!eventData || !eventData.events || !eventId) return null;
    return eventData.events.find(evt => Number(evt.id) === Number(eventId)) || null;
}

function roundUpToNearestTen(value) {
    if (!value || value <= 0) return 0;
    return Math.ceil(value / 10) * 10;
}

function updateInstallmentUI() {
    const paymentModeGroup = document.getElementById('paymentModeGroup');
    const depositGroup = document.getElementById('depositGroup');
    const installmentsCountGroup = document.getElementById('installmentsCountGroup');
    const paymentMode = document.getElementById('payment_mode');
    const depositInput = document.getElementById('deposit_amount');
    const depositHint = document.getElementById('depositHint');
    const priceSelect = document.getElementById('price_id');
    const ticketsSelect = document.getElementById('tickets');

    if (!paymentModeGroup || !depositGroup || !installmentsCountGroup || !paymentMode || !depositInput || !depositHint) {
        return;
    }

    const allowsInstallments = !!(selectedShow && selectedShow.allow_installments);
    paymentModeGroup.style.display = allowsInstallments ? 'block' : 'none';

    if (!allowsInstallments) {
        paymentMode.value = 'full';
        depositGroup.style.display = 'none';
        installmentsCountGroup.style.display = 'none';
        depositHint.textContent = '';
        depositInput.value = '';
        return;
    }

    const selectedOption = priceSelect && priceSelect.options[priceSelect.selectedIndex];
    const ticketQty = parseInt(ticketsSelect ? ticketsSelect.value : '0', 10) || 0;
    const unitPrice = selectedOption && selectedOption.value ? Number(selectedOption.dataset.price || 0) : 0;
    const noCost = selectedOption && selectedOption.value
        ? ['1', 'true'].includes(String(selectedOption.dataset.noCost).toLowerCase())
        : false;
    const totalBase = unitPrice * ticketQty;
    const installmentPercent = Number((selectedShow && selectedShow.installment_percent) || 0);
    const installmentTotal = roundUpToNearestTen(totalBase + ((totalBase * installmentPercent) / 100));
    const minReservePercent = Number((selectedShow && selectedShow.min_reserve_percent) || 0);
    const minimumDeposit = roundUpToNearestTen((installmentTotal * minReservePercent) / 100);

    if (noCost || totalBase <= 0) {
        paymentMode.value = 'full';
        paymentMode.disabled = true;
        depositGroup.style.display = 'none';
        installmentsCountGroup.style.display = 'none';
        depositHint.textContent = '';
        depositInput.value = '';
        return;
    }

    paymentMode.disabled = false;
    const isInstallments = paymentMode.value === 'installments';
    depositGroup.style.display = isInstallments ? 'block' : 'none';
    installmentsCountGroup.style.display = isInstallments ? 'block' : 'none';

    if (isInstallments) {
        depositInput.min = String(Math.max(1, minimumDeposit));
        if (!depositInput.value || Number(depositInput.value) < minimumDeposit) {
            depositInput.value = String(Math.max(1, minimumDeposit));
        }
        depositHint.textContent = `Installments total: KES ${installmentTotal.toLocaleString()}. Minimum deposit: KES ${minimumDeposit.toLocaleString()} (${minReservePercent}% of installments total).`;
    } else {
        depositHint.textContent = '';
        depositInput.value = '';
    }
}

function closeModal() {
    document.getElementById('ticketModal').classList.remove('active');
    document.getElementById('ticketForm').reset();
    document.getElementById('formSection').style.display = 'block';
    document.getElementById('successMessage').classList.remove('active');
    document.getElementById('errorMessage').classList.remove('active');
    document.getElementById('paymentModeGroup').style.display = 'none';
    document.getElementById('depositGroup').style.display = 'none';
    document.getElementById('installmentsCountGroup').style.display = 'none';
    selectedShow = null;
    selectedPrices = [];
    selectedEvent = null;
    document.body.style.overflow = 'auto';
}

function closeError() {
    document.getElementById('errorMessage').classList.remove('active');
    document.getElementById('formSection').style.display = 'block';
}

function showSuccessMessage(title, message, icon = '★') {
    document.getElementById('successIcon').textContent = icon;
    document.getElementById('successTitle').textContent = title || 'SUCCESS';
    document.getElementById('successMessageText').innerHTML = formatMessageWithLinks(message || '');
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('successMessage').classList.add('active');
    document.getElementById('errorMessage').classList.remove('active');
}

function showErrorMessage(message) {
    document.getElementById('errorMessageText').textContent = message || 'An error occurred. Please try again.';
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('successMessage').classList.remove('active');
    document.getElementById('errorMessage').classList.add('active');
}

function formatMessageWithLinks(message) {
    const escaped = String(message)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const withLinks = escaped.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    return withLinks.replace(/\n/g, '<br>');
}

function isValidKenyaPhone(phone) {
    return /^(?:\+?254|0)?[71]\d{8}$/.test((phone || '').trim());
}

async function checkPendingInstallmentPayment(event) {
    event.preventDefault();

    const phoneInput = document.getElementById('continuePhone');
    const feedback = document.getElementById('continuePaymentFeedback');
    const submitBtn = document.querySelector('#continuePaymentForm button[type="submit"]');
    const phone = (phoneInput ? phoneInput.value : '').trim();

    if (!isValidKenyaPhone(phone)) {
        feedback.textContent = 'Please enter a valid Safaricom number.';
        feedback.className = 'continue-payment-feedback error';
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'CHECKING...';
    feedback.textContent = '';
    feedback.className = 'continue-payment-feedback';

    try {
        const params = new URLSearchParams({ phone });
        const response = await fetch(`${API_BASE_URL}/api/showman/pending-payment?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        const data = await response.json();

        if ((data.status === 200 || response.ok) && data.payment_options_url) {
            feedback.textContent = 'Pending plan found. Redirecting to payment page...';
            feedback.className = 'continue-payment-feedback success';
            window.location.href = data.payment_options_url;
            return;
        }

        feedback.textContent = data.message || 'No pending payment plan found for this number.';
        feedback.className = 'continue-payment-feedback error';
    } catch (err) {
        feedback.textContent = 'Unable to check payment plan right now. Please try again.';
        feedback.className = 'continue-payment-feedback error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'CONTINUE PAYMENT';
    }
}

async function submitForm(event) {
    event.preventDefault();
    
    // Ensure date is in Y-m-d format without timezone
    let showDate = selectedShow.date;
    if (showDate) {
        // Extract just the date part (Y-m-d) if it includes time or timezone
        const dateMatch = showDate.match(/^(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
            showDate = dateMatch[1];
        }
    }
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        tickets: parseInt(document.getElementById('tickets').value),
        show_date: showDate,
        price_id: parseInt(document.getElementById('price_id').value),
        event_id: selectedShow.event_id || null
    };

    const paymentModeField = document.getElementById('payment_mode');
    const paymentMode = paymentModeField ? paymentModeField.value : 'full';
    const selectedPriceOption = document.getElementById('price_id').options[document.getElementById('price_id').selectedIndex];
    const noCostSelected = selectedPriceOption
        ? ['1', 'true'].includes(String(selectedPriceOption.dataset.noCost).toLowerCase())
        : false;

    if (selectedShow && selectedShow.allow_installments && !noCostSelected) {
        formData.payment_mode = paymentMode;
        if (paymentMode === 'installments') {
            formData.deposit_amount = Number(document.getElementById('deposit_amount').value || 0);
            formData.installments_count = parseInt(document.getElementById('installments_count').value || '1', 10);
        }
    }

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.tickets || !formData.price_id) {
        alert('Please fill in all fields');
        return;
    }

    if (formData.payment_mode === 'installments') {
        if (!formData.deposit_amount || formData.deposit_amount <= 0) {
            alert('Please enter a valid deposit amount.');
            return;
        }
    }

    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'PROCESSING...';

    try {
        const response = await fetch(`${API_BASE_URL}/api/showman/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(formData)
        });

        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            // If response is not JSON, handle as error
            showErrorMessage('Invalid response from server. Please try again.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            return;
        }

        if (data.status === 200 || response.ok) {
            // Success - show API response message
            const successTitle = data.message || 'TICKETS RESERVED!';
            let successMessage = '';
            
            // Build success message from API response
            if (data.tickets && data.tickets.length > 0) {
                const ticketNumbers = data.tickets.map(t => t.ticket_number).join(', ');
                successMessage = `Your ticket${data.tickets.length > 1 ? 's' : ''} ${data.tickets.length > 1 ? 'are' : 'is'}: ${ticketNumbers}`;
                if (data.message && data.message !== successTitle) {
                    successMessage = data.message + '\n\n' + successMessage;
                }
            } else if (data.message) {
                successMessage = data.message;
            } else {
                successMessage = 'Thank you for your order. You will receive a confirmation email with payment instructions shortly.';
            }

            if (data.pay_now_amount) {
                successMessage += `\n\nAmount prompted now: KES ${Number(data.pay_now_amount).toLocaleString()}.`;
            }
            if (data.payment_link) {
                successMessage += `\nContinue payment URL: ${data.payment_link}`;
            }
            
            showSuccessMessage(successTitle, successMessage);
        } else {
            // Error - show API error message
            const errorMessage = data.message || 'An error occurred. Please try again.';
            showErrorMessage(errorMessage);
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    } catch (error) {
        console.error('Purchase error:', error);
        const errorMessage = error.message || 'Network error. Please check your connection and try again.';
        showErrorMessage(errorMessage);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// Initialize event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Modal click outside to close
    document.getElementById('ticketModal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeModal();
        }
    });

    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    const continuePaymentForm = document.getElementById('continuePaymentForm');
    if (continuePaymentForm) {
        continuePaymentForm.addEventListener('submit', checkPendingInstallmentPayment);
    }

    const supportForm = document.getElementById('supportForm');
    if (supportForm) {
        supportForm.addEventListener('submit', submitSupportForm);
    }

    // Initialize on page load
    loadEventData();
});

