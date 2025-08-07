document.addEventListener('DOMContentLoaded', () => {
    // Filter functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-card');

    if (filterTabs.length > 0 && productCards.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Deactivate all tabs
                filterTabs.forEach(t => t.classList.remove('active'));
                // Activate clicked tab
                tab.classList.add('active');

                const filter = tab.getAttribute('data-filter');

                // Show/hide cards based on filter
                productCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Modal functionality
    const modal = document.getElementById('productModal');
    const closeModal = document.querySelector('.close-modal-btn');

    if (modal && closeModal) {
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalPrice = document.getElementById('modalPrice');

        document.querySelectorAll('.quick-view').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const card = e.target.closest('.product-card');
                
                // Populate modal with data from the card
                modalTitle.textContent = card.querySelector('.product-title').textContent;
                modalDescription.textContent = card.querySelector('.product-description').textContent;
                modalPrice.textContent = card.querySelector('.product-price').textContent;
                modalImage.src = card.querySelector('.product-image').src;
                
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('visible'), 10);
            });
        });

        // Close modal actions
        const hideModal = () => {
            modal.classList.remove('visible');
            setTimeout(() => modal.style.display = 'none', 300);
        };

        closeModal.addEventListener('click', hideModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
        
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('visible')) {
                hideModal();
            }
        });
    }

    // Scroll-to-top functionality
    const scrollBtn = document.getElementById('scrollTopBtn');

    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });

        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // "Contact Us" links scroll to form
    const contactLinks = Array.from(document.querySelectorAll('a, button'))
        .filter(el => el.textContent.trim().toLowerCase() === 'contact us');
    const contactForm = document.getElementById('contactForm');

    if (contactForm && contactLinks.length > 0) {
        contactLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                contactForm.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // --- Google Sheet Form Submission ---
    const googleForm = document.getElementById('contact-google-form');
    
    if (googleForm) {
        const statusDiv = document.getElementById('form-status');

        googleForm.addEventListener('submit', e => {
            e.preventDefault();
            
            const submitBtn = googleForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            // --- IMPORTANT ---
            // PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby1BVIKVz1sXHY99CoFCMvlYlgGJgz-bON5jiiiupGSWbYbbhwJukok1IRfWCgGNVKJ/exec';

            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: new FormData(googleForm)
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    statusDiv.textContent = 'Thank you! Your message has been sent successfully.';
                    statusDiv.className = 'success';
                    googleForm.reset();
                } else {
                    throw new Error(data.message || 'An unknown error occurred.');
                }
            })
            .catch(error => {
                statusDiv.textContent = `An error occurred: ${error.message}`;
                statusDiv.className = 'error';
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit';
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                    statusDiv.className = '';
                }, 6000);
            });
        });
    }

    // Smooth scroll for "Explore Now" button
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('gallery').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});