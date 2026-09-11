document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");
    const indicator = document.querySelector(".nav-indicator");

    function updateIndicator(el) {
        if (!el || !indicator) return;
        
        const offsetLeft = el.offsetLeft;
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

    // Kontrol Scroll untuk Bunga Matahari (Mekar saat di atas, Menutup saat scroll ke bawah)
    const petalsGroup = document.getElementById('petalsGroup');
    window.addEventListener('scroll', () => {
        if (!petalsGroup) return;
        const scrollY = window.scrollY;
        // Hitung persentase scroll (maksimal 400 pixel)
        let progress = scrollY / 400;
        if (progress > 1) progress = 1;
        if (progress < 0) progress = 0;

        // Skala kelopak menyusut dari 1 (mekar penuh) ke 0.15 (menutup)
        const scaleValue = 1 - (progress * 0.85);
        petalsGroup.style.transform = `scale(${scaleValue})`;
    });

    // Generator Partikel Gerimis (Lebih Rapat)
    const rainContainer = document.getElementById('rainContainer');
    if (rainContainer) {
        const dropCount = 75;
        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('div');
            drop.classList.add('raindrop');
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.top = `${Math.random() * -50}px`;
            drop.style.animationDuration = `${0.4 + Math.random() * 0.6}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            rainContainer.appendChild(drop);
        }
    }

    // Efek Animasi Petir Random di Section About
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        function triggerLightning() {
            aboutSection.classList.add('lightning');
            setTimeout(() => {
                aboutSection.classList.remove('lightning');
                setTimeout(() => {
                    aboutSection.classList.add('lightning');
                    setTimeout(() => {
                        aboutSection.classList.remove('lightning');
                    }, 80);
                }, 120);
            }, 100);

            const nextTime = Math.random() * 5000 + 4000;
            setTimeout(triggerLightning, nextTime);
        }
        setTimeout(triggerLightning, 3000);
    }

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
