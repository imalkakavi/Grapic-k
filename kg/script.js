document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       SCROLL REVEAL ANIMATIONS (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-delay-1');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animates once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       HEADER SCROLL BACKGROUND
       ========================================================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       MOBILE NAVIGATION TOGGLE
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle mobile icon shape
        if (navMenu.classList.contains('active')) {
            mobileToggle.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
        } else {
            mobileToggle.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
        });
    });

    /* ==========================================================================
       ACTIVE NAV LINK SECTIONS TRACKING
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-list a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-list a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    });

    /* ==========================================================================
       PORTFOLIO GRID FILTER
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                // Apply a quick scale out animation
                item.style.transform = 'scale(0.9)';
                item.style.opacity = '0';
                
                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.transform = 'scale(1)';
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    /* ==========================================================================
       PORTFOLIO LIGHTBOX VIEW
       ========================================================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxTag = document.getElementById('lightbox-tag');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.getElementById('lightbox-close');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const imageSrc = item.getAttribute('data-image');
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');
            const category = item.getAttribute('data-category');
            
            lightboxImg.src = imageSrc;
            lightboxImg.alt = title;
            lightboxTitle.textContent = title;
            lightboxTag.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            lightboxDesc.textContent = desc;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        });
    });
    
    const closeLightboxFunc = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    lightboxClose.addEventListener('click', closeLightboxFunc);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });

    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightboxFunc();
        }
    });

    /* ==========================================================================
       INTERACTIVE QUOTE ESTIMATOR CALCULATOR
       ========================================================================== */
    const calcCheckboxes = document.querySelectorAll('.calc-checkbox');
    const revisionsSlider = document.getElementById('revisions-slider');
    const revisionsCountText = document.getElementById('revisions-count');
    const revisionsMultiplierText = document.getElementById('revisions-multiplier');
    const timelineRadios = document.querySelectorAll('input[name="timeline"]');
    const calcTotal = document.getElementById('calc-total');
    const calcTimeline = document.getElementById('calc-timeline');
    const resultSummaryList = document.getElementById('result-summary-list');
    const applyQuoteBtn = document.getElementById('apply-quote-btn');
    
    // Service details metadata (price, base days)
    const servicesMeta = {
        'Logo Design': { price: 150, days: 3 },
        'Brand Guidelines': { price: 200, days: 5 },
        'Social Media Kit': { price: 90, days: 2 },
        'Packaging Design': { price: 220, days: 4 },
        'Custom Illustration': { price: 180, days: 3 }
    };

    // Revisions multiplier definition
    const getRevisionsMultiplier = (val) => {
        switch(parseInt(val)) {
            case 1: return 0.9;
            case 2: return 0.95;
            case 3: return 1.0;
            case 4: return 1.15;
            case 5: return 1.3;
            default: return 1.0;
        }
    };
    
    function updateQuote() {
        let basePrice = 0;
        let baseDays = 0;
        let selectedServices = [];
        
        calcCheckboxes.forEach(cb => {
            if (cb.checked) {
                const serviceName = cb.getAttribute('data-service');
                const meta = servicesMeta[serviceName];
                basePrice += meta.price;
                baseDays += meta.days;
                selectedServices.push(serviceName);
            }
        });
        
        // If nothing is selected, reset display
        if (selectedServices.length === 0) {
            calcTotal.textContent = "0";
            calcTimeline.textContent = "0 days";
            resultSummaryList.innerHTML = "<li class='text-muted'>Please select at least one design asset.</li>";
            return;
        }
        
        // Revision modifications
        const revisionVal = revisionsSlider.value;
        revisionsCountText.textContent = revisionVal;
        const revMultiplier = getRevisionsMultiplier(revisionVal);
        revisionsMultiplierText.textContent = `${revMultiplier}x`;
        
        // Price multiplication
        let totalPrice = Math.round(basePrice * revMultiplier);
        
        // Timeline radio configuration
        let timelineType = 'standard';
        timelineRadios.forEach(radio => {
            if (radio.checked) timelineType = radio.value;
        });
        
        let minDays = baseDays;
        let maxDays = baseDays + 3;
        
        if (timelineType === 'express') {
            totalPrice += 50; // Add express charge
            minDays = Math.max(2, Math.round(baseDays * 0.6));
            maxDays = Math.max(3, Math.round((baseDays + 3) * 0.6));
        }
        
        // Update price display
        calcTotal.textContent = totalPrice;
        
        // Update timeline display
        calcTimeline.textContent = `${minDays} - ${maxDays} business days`;
        
        // Update summary listing
        resultSummaryList.innerHTML = '';
        selectedServices.forEach(srv => {
            const li = document.createElement('li');
            li.textContent = srv;
            resultSummaryList.appendChild(li);
        });

        // Proactively recalculate WhatsApp link
        updateWhatsAppLink(totalPrice, selectedServices, revisionVal, timelineType);
    }
    
    // Attach Event Listeners to Calculator Controls
    calcCheckboxes.forEach(cb => cb.addEventListener('change', updateQuote));
    revisionsSlider.addEventListener('input', updateQuote);
    timelineRadios.forEach(radio => radio.addEventListener('change', updateQuote));
    
    // Initial calculation call
    updateQuote();

    /* ==========================================================================
       BRIDGE ESTIMATOR TO CONTACT FORM
       ========================================================================== */
    const projectTypeSelect = document.getElementById('project-type');
    const budgetSelect = document.getElementById('project-budget');
    const projectDetailsText = document.getElementById('project-details');
    
    applyQuoteBtn.addEventListener('click', () => {
        let selectedServices = [];
        calcCheckboxes.forEach(cb => {
            if (cb.checked) {
                selectedServices.push(cb.getAttribute('data-service'));
            }
        });
        
        if (selectedServices.length === 0) {
            alert('Please select at least one design service in the estimator first.');
            return;
        }
        
        const price = calcTotal.textContent;
        const revisions = revisionsSlider.value;
        let timelineType = 'Standard';
        timelineRadios.forEach(radio => {
            if (radio.checked && radio.value === 'express') timelineType = 'Express';
        });
        
        // Set dropdown project type
        if (selectedServices.length === 1) {
            const sName = selectedServices[0];
            if (sName === 'Logo Design') projectTypeSelect.value = 'Logo & Branding';
            else if (sName === 'Brand Guidelines') projectTypeSelect.value = 'Logo & Branding';
            else if (sName === 'Social Media Kit') projectTypeSelect.value = 'Social Media Graphics';
            else if (sName === 'Packaging Design') projectTypeSelect.value = 'Packaging & Label';
            else if (sName === 'Custom Illustration') projectTypeSelect.value = 'Custom Illustration';
        } else {
            projectTypeSelect.value = 'Other Design Task';
        }
        
        // Set budget tier dropdown
        const priceNum = parseInt(price);
        if (priceNum < 150) budgetSelect.value = 'Under $150';
        else if (priceNum >= 150 && priceNum <= 300) budgetSelect.value = '$150 - $300';
        else if (priceNum > 300 && priceNum <= 600) budgetSelect.value = '$300 - $600';
        else budgetSelect.value = 'Over $600';
        
        // Set description
        projectDetailsText.value = `Hello Kavinda,\n\nI calculated a proposal estimate using your planner.\nI am interested in:\n- ${selectedServices.join('\n- ')}\n\nProject Specifications:\n- Revisions: ${revisions} rounds\n- Delivery speed: ${timelineType}\n- Estimated Valuation: $${price}\n\nLet's get started!`;
        
        // Smooth scroll to contact
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        
        // Fire toast to alert user
        showToast('Calculator Applied!', 'The planner inputs have been imported into the contact form.');
    });

    /* ==========================================================================
       DYNAMIC WHATSAPP PRE-FILLED LINK BUILDER
       ========================================================================== */
    const whatsappDirectBtn = document.getElementById('whatsapp-direct-btn');
    const clientNameInput = document.getElementById('client-name');
    const clientEmailInput = document.getElementById('client-email');
    
    function updateWhatsAppLink(price, services, revisions, timelineType) {
        // Read form inputs in case they are filled
        const clientName = clientNameInput.value.trim();
        const clientEmail = clientEmailInput.value.trim();
        
        let text = `Hi Kavinda! I'm interested in a graphic design project.`;
        
        if (services && services.length > 0) {
            text += `\n\nI used your online estimator and selected:\n- ${services.join('\n- ')}`;
            text += `\n\nSpecifications:\n- Revisions: ${revisions} rounds\n- Delivery Speed: ${timelineType.toUpperCase()}\n- Estimated Price: $${price}`;
        }
        
        if (clientName) {
            text += `\n\nMy Name: ${clientName}`;
        }
        if (clientEmail) {
            text += `\nEmail: ${clientEmail}`;
        }
        
        // Encode message
        const encodedText = encodeURIComponent(text);
        // Set href
        whatsappDirectBtn.href = `https://wa.me/94771234567?text=${encodedText}`;
    }
    
    // Update WhatsApp link when form fields are filled
    clientNameInput.addEventListener('input', () => {
        let selectedServices = [];
        calcCheckboxes.forEach(cb => {
            if (cb.checked) selectedServices.push(cb.getAttribute('data-service'));
        });
        let timelineType = 'standard';
        timelineRadios.forEach(radio => {
            if (radio.checked) timelineType = radio.value;
        });
        updateWhatsAppLink(calcTotal.textContent, selectedServices, revisionsSlider.value, timelineType);
    });

    clientEmailInput.addEventListener('input', () => {
        let selectedServices = [];
        calcCheckboxes.forEach(cb => {
            if (cb.checked) selectedServices.push(cb.getAttribute('data-service'));
        });
        let timelineType = 'standard';
        timelineRadios.forEach(radio => {
            if (radio.checked) timelineType = radio.value;
        });
        updateWhatsAppLink(calcTotal.textContent, selectedServices, revisionsSlider.value, timelineType);
    });

    /* ==========================================================================
       CONTACT FORM ACTION (Toast success simulator)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Mock loading state
        submitBtn.textContent = 'Submitting Proposal...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Reset state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Show toast message
            showToast('Proposal Sent Successfully!', 'Thank you! I will review your project brief and get back to you within 24 hours.');
            
            // Reset form
            contactForm.reset();
            // Reset calculator to default
            calcCheckboxes.forEach((cb, idx) => {
                cb.checked = (idx === 0); // Check only the first one
            });
            revisionsSlider.value = 3;
            timelineRadios[0].checked = true;
            updateQuote();
            
        }, 1500);
    });

    /* ==========================================================================
       TOAST GENERATOR FUNCTION
       ========================================================================== */
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastDesc = document.getElementById('toast-desc');
    let toastTimeout;
    
    function showToast(title, desc) {
        // Clear previous timeout if toast is running
        clearTimeout(toastTimeout);
        
        toastTitle.textContent = title;
        toastDesc.textContent = desc;
        
        toast.classList.add('show');
        
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    /* ==========================================================================
       3D TILT PARALLAX EFFECT FOR HERO IMAGE
       ========================================================================== */
    const tiltContainer = document.getElementById('hero-tilt-container');
    const tiltImage = document.getElementById('hero-img');
    const tiltShine = document.getElementById('hero-tilt-shine');
    
    if (tiltContainer && tiltImage && tiltShine) {
        tiltContainer.addEventListener('mousemove', (e) => {
            // Disable 3D tilt on mobile/tablets to prevent touch stickiness
            if (window.innerWidth <= 768) return;
            
            const rect = tiltContainer.getBoundingClientRect();
            
            // Mouse position relative to the element
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Normalised coordinates (-0.5 to +0.5)
            const xVal = (mouseX / rect.width) - 0.5;
            const yVal = (mouseY / rect.height) - 0.5;
            
            // Tilt calculation (max rotation degrees)
            const maxTilt = 18;
            const tiltY = xVal * maxTilt; // Rotate around Y axis based on X movement
            const tiltX = -yVal * maxTilt;  // Rotate around X axis based on Y movement
            
            // Apply 3D rotation transform
            tiltImage.style.transform = `rotateY(${tiltY}deg) rotateX(${tiltX}deg) scale(1.03)`;
            
            // Shine position & visibility
            tiltShine.style.opacity = '1';
            
            // Calculate shine direction coordinates
            const shineX = (mouseX / rect.width) * 100;
            const shineY = (mouseY / rect.height) * 100;
            tiltShine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 70%)`;
        });
        
        tiltContainer.addEventListener('mouseleave', () => {
            // Smoothly reset transformations when mouse leaves
            tiltImage.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
            tiltShine.style.opacity = '0';
        });
    }

    /* ==========================================================================
       SPOTLIGHT CURSOR TRACKING FOR SERVICE CARDS
       ========================================================================== */
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate cursor position relative to card borders
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Pass variables to CSS custom properties
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* ==========================================================================
       DYNAMIC BUBBLE SPANNER
       ========================================================================== */
    function initFloatingBubbles() {
        const bubbleSections = document.querySelectorAll('#hero, #services, #process, #calculator');
        
        bubbleSections.forEach(section => {
            // Ensure section position is relative/absolute so bubbles are contained correctly
            const style = window.getComputedStyle(section);
            if (style.position === 'static') {
                section.style.position = 'relative';
            }
            
            let container = section.querySelector('.bubbles-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'bubbles-container';
                section.insertBefore(container, section.firstChild);
            }
            
            // Adjust number of bubbles depending on desktop vs mobile
            const isMobile = window.innerWidth <= 768;
            const bubbleCount = isMobile ? 8 : (section.id === 'hero' ? 22 : 14);
            
            for (let i = 0; i < bubbleCount; i++) {
                const bubble = document.createElement('div');
                bubble.className = 'bubble-particle';
                
                // Random bubble sizes (between 15px and 85px)
                const size = Math.random() * 70 + 15;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                
                // Random horizontal position
                bubble.style.left = `${Math.random() * 100}%`;
                
                // Random delay and duration
                const delay = Math.random() * 10;
                const duration = Math.random() * 15 + 8; // 8s to 23s
                bubble.style.animationDelay = `${delay}s`;
                bubble.style.animationDuration = `${duration}s`;
                
                // Random horizontal drift
                const driftX = (Math.random() * 160 - 80); // -80px to 80px
                bubble.style.setProperty('--drift-x', `${driftX}px`);
                
                // Random scale
                const scale = Math.random() * 0.5 + 0.8;
                bubble.style.setProperty('--scale', scale);
                
                container.appendChild(bubble);
            }
        });
    }
    
    initFloatingBubbles();
});
