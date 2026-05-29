// 1. Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// 2. Typing Effect (Replaces React-Type-Animation)
const words = ["Software Engineer.", "AI-Powered Web Dev."];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
const typeElement = document.getElementById('typewriter');

function type() {
    currentWord = words[i];
    
    if (isDeleting) {
        typeElement.textContent = currentWord.substring(0, j - 1);
        j--;
    } else {
        typeElement.textContent = currentWord.substring(0, j + 1);
        j++;
    }

    let typeSpeed = 100;

    if (isDeleting) { typeSpeed /= 2; }

    if (!isDeleting && j === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i++;
        if (i === words.length) { i = 0; }
        typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
}
document.addEventListener("DOMContentLoaded", type);

// 3. Parallax Scrolling Effect
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed');
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// --- CYBERPUNK BACKGROUND ANIMATION LOGIC ---
const canvas = document.getElementById('rain');
const scene  = document.getElementById('scene');
const ctx    = canvas.getContext('2d');
let drops = [], W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const rainColors = ['#cc44ff','#9966ff','#00ccff','#aaaacc','#8888bb'];
for (let i = 0; i < 180; i++) {
  drops.push({
    x:     Math.random() * 1200,
    y:     Math.random() * 600,
    len:   Math.random() * 14 + 6,
    speed: Math.random() * 3.5 + 1.5,
    alpha: Math.random() * 0.4 + 0.08,
    color: rainColors[Math.floor(Math.random() * rainColors.length)]
  });
}

const signs = document.querySelectorAll('.sign');
function randomFlicker() {
  if (signs.length > 0) {
      const s = signs[Math.floor(Math.random() * signs.length)];
      const orig = s.style.opacity || '1';
      s.style.opacity = '0.15';
      setTimeout(() => { s.style.opacity = '1'; }, 60 + Math.random() * 100);
      setTimeout(randomFlicker, 800 + Math.random() * 3000);
  }
}
randomFlicker();

function animateBg() {
  ctx.clearRect(0, 0, W, H);
  for (let d of drops) {
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x - 1.2, d.y + d.len);
    ctx.strokeStyle = d.color;
    ctx.globalAlpha = d.alpha;
    ctx.lineWidth = 0.6;
    ctx.stroke();
    d.y += d.speed;
    d.x -= 0.4;
    if (d.y > H) { d.y = -d.len; d.x = Math.random() * W; }
    if (d.x < -5) { d.x = W + 5; }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateBg);
}
animateBg();
// --- SPLASH SCREEN INTRO LOGIC ---
// --- SPLASH SCREEN INTRO LOGIC ---
window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    const splashText = document.getElementById('splash-text');
    const splashLogo = document.getElementById('splash-logo');

    // If the splash screen is missing, stop to prevent errors
    if (!splashScreen) return; 

    // Phase 1: After 1.5s, hide text and try to play video
    setTimeout(() => {
        if (splashText) splashText.style.opacity = '0';
        
        if (splashLogo) {
            splashLogo.style.opacity = '1';
            
            // Safely attempt to play the video without crashing the script
            let playPromise = splashLogo.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("Video autoplay prevented or file missing.", error);
                });
            }
        }
    }, 1500);

    // Phase 2: After 4.5s, force the screen to hide no matter what
    setTimeout(() => {
        splashScreen.classList.add('hide-splash');
        
        // Remove it entirely so it doesn't block you from clicking the website
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 1000);
    }, 4500);
});


// --- MOBILE MENU TOGGLE FIX ---
document.addEventListener('DOMContentLoaded', () => {
    // Select the hamburger icon and the navigation links container
    // (This targets common class names like .menu-icon or .hamburger)
    const menuBtn = document.querySelector('.menu-icon, .hamburger, [class*="menu"]'); 
    const navLinks = document.querySelector('.nav-links, nav ul');

    if (menuBtn && navLinks) {
        // Toggle the menu open/closed when tapping the icon
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Automatically close the menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});