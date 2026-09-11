document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");
    const indicator = document.querySelector(".nav-indicator");

    function updateIndicator(el) {
        if (!el || !indicator) return;
        const navStyle = window.getComputedStyle(nav);
        const navPaddingLeft = parseFloat(navStyle.paddingLeft) || 0;
        
        const offsetLeft = el.offsetLeft - navPaddingLeft;
        const width = el.offsetWidth;

        indicator.style.left = `${offsetLeft}px`;
        indicator.style.width = `${width}px`;
    }

    const activeLink = document.querySelector("nav a.active") || navLinks[0];
    updateIndicator(activeLink);

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            updateIndicator(link);
            link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });
    });

    window.addEventListener("resize", () => {
        const currentActive = document.querySelector("nav a.active") || navLinks[0];
        updateIndicator(currentActive);
    });

    // Animasi memunculkan elemen saat di-scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
