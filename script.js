// Page behaviour for the SidTech yoga website.
// Shared file: checks which page elements exist before attaching handlers.

// Homepage interactions
const CLIENT_WHATSAPP = '91XXXXXXXXXX'; // Replace with client number, digits only, international format.
        const menuBtn = document.getElementById('menuBtn'), mobileMenu = document.getElementById('mobileMenu');
        menuBtn?.addEventListener('click', () => { const opening = mobileMenu.classList.contains('hidden'); mobileMenu.classList.toggle('hidden'); menuBtn.setAttribute('aria-expanded', String(opening)); });
        mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mobileMenu.classList.add('hidden'); menuBtn.setAttribute('aria-expanded', 'false'); }));
        document.getElementById('year').textContent = new Date().getFullYear();
        const observer = ('IntersectionObserver' in window) ? new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); observer.unobserve(e.target); } }), { threshold: .12 }) : null;
        document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('show'));
        document.getElementById('enquiryForm').addEventListener('submit', e => { e.preventDefault(); if (!/^\d{10,15}$/.test(CLIENT_WHATSAPP)) { alert('Setup needed: replace CLIENT_WHATSAPP with the client’s WhatsApp number.'); return; } const n = document.getElementById('name').value.trim(), p = document.getElementById('phone').value.trim(), i = document.getElementById('interest').value, m = document.getElementById('message').value.trim(); const msg = `Hello, I am interested in your online wellness programmes.\n\nName: ${n}\nMy phone: ${p}\nInterested in: ${i}\nMessage: ${m || 'Not provided'}`; window.open(`https://wa.me/${CLIENT_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer'); });

// Programmes page interactions
document.getElementById('year').textContent = new Date().getFullYear(); const o = ('IntersectionObserver' in window) ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); o.unobserve(e.target) } }), { threshold: .12 }) : null; document.querySelectorAll('.reveal').forEach(el => o ? o.observe(el) : el.classList.add('show'));

// Automatically rotate the student-story slides; arrows allow manual navigation.
        const reviewTrack = document.getElementById('reviewTrack');
        const reviewSlides = Array.from(document.querySelectorAll('.review-slide'));
        let reviewIndex = 0;
        const showReview = (index) => {
            if (!reviewTrack || !reviewSlides.length) return;
            reviewIndex = (index + reviewSlides.length) % reviewSlides.length;
            reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
        };
        let reviewTimer;
        const startReviewTimer = () => {
            clearInterval(reviewTimer);
            reviewTimer = setInterval(() => showReview(reviewIndex + 1), 6000);
        };
        document.getElementById('reviewPrev')?.addEventListener('click', () => { showReview(reviewIndex - 1); startReviewTimer(); });
        document.getElementById('reviewNext')?.addEventListener('click', () => { showReview(reviewIndex + 1); startReviewTimer(); });
        document.getElementById('stories')?.addEventListener('mouseenter', () => clearInterval(reviewTimer));
        document.getElementById('stories')?.addEventListener('mouseleave', startReviewTimer);
        if (reviewSlides.length > 1) startReviewTimer();