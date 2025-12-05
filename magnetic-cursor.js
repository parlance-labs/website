/**
 * Magnetic Cursor Effect
 * Adapted from motion-plus for vanilla JS/Quarto
 */

(function() {
  // Only enable on desktop (no touch)
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    return;
  }

  // Create cursor elements
  const cursorDot = document.createElement('div');
  cursorDot.className = 'magnetic-cursor-dot';
  
  const cursorReticle = document.createElement('div');
  cursorReticle.className = 'magnetic-cursor-reticle';
  cursorReticle.innerHTML = `
    <div class="reticle-corner top-left-v"></div>
    <div class="reticle-corner top-left-h"></div>
    <div class="reticle-corner top-right-v"></div>
    <div class="reticle-corner top-right-h"></div>
    <div class="reticle-corner bottom-left-v"></div>
    <div class="reticle-corner bottom-left-h"></div>
    <div class="reticle-corner bottom-right-v"></div>
    <div class="reticle-corner bottom-right-h"></div>
  `;

  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorReticle);

  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  let reticleX = 0;
  let reticleY = 0;
  let reticleWidth = 40;
  let reticleHeight = 40;
  let targetWidth = 40;
  let targetHeight = 40;
  let currentTarget = null;
  let rotation = 0;
  let isSpinning = true;

  // Magnetic targets - buttons and links
  const magneticSelector = '.cta-button, .cta-button-primary, .cta-button-secondary, .value-card, .nav-link, .navbar-brand';

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function updateCursor() {
    // Smooth follow for dot - always follows mouse
    dotX = lerp(dotX, mouseX, 0.2);
    dotY = lerp(dotY, mouseY, 0.2);
    
    // Position dot centered on its position
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';

    // Reticle behavior
    let targetX, targetY;
    
    if (currentTarget) {
      const rect = currentTarget.getBoundingClientRect();
      // Target center position
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
      
      // Morph to target size with padding
      targetWidth = rect.width + 16;
      targetHeight = rect.height + 16;
    } else {
      // Follow mouse when no target
      targetX = mouseX;
      targetY = mouseY;
      targetWidth = 40;
      targetHeight = 40;
    }

    // Smooth interpolation to target
    reticleX = lerp(reticleX, targetX, currentTarget ? 0.15 : 0.1);
    reticleY = lerp(reticleY, targetY, currentTarget ? 0.15 : 0.1);
    reticleWidth = lerp(reticleWidth, targetWidth, 0.12);
    reticleHeight = lerp(reticleHeight, targetHeight, 0.12);

    // Rotation
    if (isSpinning) {
      rotation += 1.2;
    } else {
      // Snap to nearest 180 degrees
      const targetRotation = Math.round(rotation / 180) * 180;
      rotation = lerp(rotation, targetRotation, 0.15);
    }

    // Position reticle centered on its position
    cursorReticle.style.left = reticleX + 'px';
    cursorReticle.style.top = reticleY + 'px';
    cursorReticle.style.width = reticleWidth + 'px';
    cursorReticle.style.height = reticleHeight + 'px';
    cursorReticle.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

    requestAnimationFrame(updateCursor);
  }

  // Sections where magnetic cursor is disabled
  const disabledSelector = '.wall-of-love, .logo-carousel-section, .hero-section';
  
  // Navbar selector (always enabled)
  const navbarSelector = '.navbar, #quarto-header';
  
  // Page detection
  const path = window.location.pathname;
  const isServicesPage = path === '/services.html' || path === '/services';
  const isTeamPage = path === '/team.html' || path === '/team';
  const isEducationPage = path.startsWith('/education');

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const target = document.elementFromPoint(e.clientX, e.clientY);
    
    // Navbar is always enabled
    const inNavbar = target?.closest(navbarSelector);
    
    // Check if in CTA section (always enabled on services page)
    const inCTASection = target?.closest('.cta-section, .cta-prominent');
    
    // Check if we're in a disabled section
    let inDisabledSection = target?.closest(disabledSelector);
    
    // Services page: disable except navbar and CTA sections
    if (isServicesPage && !inNavbar && !inCTASection) {
      const inMainContent = target?.closest('main, #quarto-document-content');
      if (inMainContent) {
        inDisabledSection = true;
      }
    }
    
    // Team page: navbar only
    if (isTeamPage && !inNavbar) {
      const inMainContent = target?.closest('main, #quarto-document-content');
      if (inMainContent) {
        inDisabledSection = true;
      }
    }
    
    // Education pages: navbar only (disable in main content and sidebar)
    if (isEducationPage && !inNavbar) {
      inDisabledSection = true;
    }
    
    if (inDisabledSection) {
      // Hide cursor in disabled sections
      cursorDot.classList.add('hidden');
      cursorReticle.classList.add('hidden');
      currentTarget = null;
      isSpinning = true;
      return;
    } else {
      cursorDot.classList.remove('hidden');
      cursorReticle.classList.remove('hidden');
    }

    // Check for magnetic targets
    const magneticTarget = target?.closest(magneticSelector);
    
    if (magneticTarget !== currentTarget) {
      currentTarget = magneticTarget;
      isSpinning = !currentTarget;
      
      if (currentTarget) {
        cursorReticle.classList.add('has-target');
        cursorDot.classList.add('has-target');
      } else {
        cursorReticle.classList.remove('has-target');
        cursorDot.classList.remove('has-target');
      }
    }
  });

  document.addEventListener('mousedown', () => {
    cursorReticle.classList.add('pressed');
    cursorDot.classList.add('pressed');
  });

  document.addEventListener('mouseup', () => {
    cursorReticle.classList.remove('pressed');
    cursorDot.classList.remove('pressed');
  });

  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorReticle.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorReticle.style.opacity = '1';
  });

  // Start animation loop
  requestAnimationFrame(updateCursor);

  // Add loaded class after a brief delay to trigger entrance animation
  setTimeout(() => {
    cursorDot.classList.add('loaded');
    cursorReticle.classList.add('loaded');
  }, 100);
})();
