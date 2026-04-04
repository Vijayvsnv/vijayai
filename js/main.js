document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS Animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // 2. Navbar scroll effect upgrade
    let lastScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > lastScrollY && window.scrollY > 80) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });

    // 3. Mobile Menu Toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // 4. Active Link Detection
    const path = window.location.pathname;
    const currentFile = path.split('/').pop() || 'index.html';
    
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentFile) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 5. Smooth scroll for internal '#' links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 6. Typing Animation Upgrade
    const phrases = [
      "AI Agents",
      "Sales Bots",
      "RAG Systems",
      "AI Workflows",
      "Agentic AI"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingEl = document.querySelector('.typing-text');

    function type() {
      if (!typingEl) return;
      const current = phrases[phraseIndex];
      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }
      if (!isDeleting && charIndex === current.length) {
        setTimeout(() => isDeleting = true, 2000);
      }
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      const speed = isDeleting ? 60 : 110;
      setTimeout(type, speed);
    }
    type();

    // 7. Custom Animated Cursor
    const cursorMain = document.createElement('div');
    cursorMain.id = 'cursor-main';
    document.body.appendChild(cursorMain);

    const trail1 = document.createElement('div');
    trail1.id = 'cursor-trail-1';
    document.body.appendChild(trail1);

    const trail2 = document.createElement('div');
    trail2.id = 'cursor-trail-2';
    document.body.appendChild(trail2);

    let mouse = {x: 0, y: 0};
    let pos1 = {x: 0, y: 0};
    let pos2 = {x: 0, y: 0};

    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function animateCursor() {
      cursorMain.style.left = mouse.x + 'px';
      cursorMain.style.top = mouse.y + 'px';

      pos1.x += (mouse.x - pos1.x) * 0.25;
      pos1.y += (mouse.y - pos1.y) * 0.25;
      trail1.style.left = pos1.x + 'px';
      trail1.style.top = pos1.y + 'px';

      pos2.x += (mouse.x - pos2.x) * 0.12;
      pos2.y += (mouse.y - pos2.y) * 0.12;
      trail2.style.left = pos2.x + 'px';
      trail2.style.top = pos2.y + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorMain.style.transform = 'translate(-50%,-50%) scale(1.8)';
        trail1.style.transform = 'translate(-50%,-50%) scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursorMain.style.transform = 'translate(-50%,-50%) scale(1)';
        trail1.style.transform = 'translate(-50%,-50%) scale(1)';
      });
    });

    // 8. Particle Background
    const hero = document.querySelector('.hero');
    if(hero) {
        for(let i = 0; i < 50; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.width = (Math.random() * 3 + 2) + 'px';
            p.style.height = p.style.width;
            p.style.animationDuration = (Math.random() * 15 + 10) + 's';
            p.style.animationDelay = (Math.random() * 10) + 's';
            hero.appendChild(p);
        }
    }

    // 9. Smooth Page Transition (Fade Out)
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if(href && !href.startsWith('http') && 
           !href.startsWith('#') && !href.startsWith('mailto') && 
           !href.startsWith('tel') && !href.startsWith('wa')) {
            link.addEventListener('click', (e) => {
                // Ignore if it's opening in a new tab
                if (link.getAttribute('target') === '_blank') return;
                
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                setTimeout(() => window.location.href = href, 300);
            });
        }
    });

});
