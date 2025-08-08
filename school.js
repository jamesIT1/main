document.addEventListener('DOMContentLoaded', () => {
    // Animate-on-scroll functionality
    const productCards = document.querySelectorAll('.product-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a staggered delay for each card
                const delay = entry.target.dataset.index * 100; // 100ms delay per card
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    productCards.forEach((card, index) => {
        card.dataset.index = index; // Add index for staggering
        observer.observe(card);
    });

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
                
                modalTitle.textContent = card.querySelector('.product-title').textContent;
                modalDescription.textContent = card.querySelector('.product-description').textContent;
                modalPrice.textContent = card.querySelector('.product-price').textContent;
                modalImage.src = card.querySelector('.product-image').src;
                
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('visible'), 10);
            });
        });

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
});