(function () {
    const track = document.querySelector('[data-conveyor-track]');
    const prevBtn = document.querySelector('[data-conveyor-prev]');
    const nextBtn = document.querySelector('[data-conveyor-next]');
  
    if (!track) return;
  
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  
    const BASE_SPEED = prefersReducedMotion ? 0 : 0.045; // px per ms, moving left
    const BOOST_MULTIPLIER = 6;
    const BOOST_HOLD_MS = 350; // how long a click's target speed is held before easing back
    const DECAY_PER_SECOND = 0.02; // fraction of the gap to BASE_SPEED remaining after 1s
  
    let singleSetWidth = 0;
    let offset = 0;
    let velocity = BASE_SPEED;
    let boostTarget = null;
    let boostUntil = 0;
    let lastTime = null;
  
    function measure() {
      // Track contains two identical sets of items back to back —
      // half its width is exactly one full loop.
      singleSetWidth = track.scrollWidth / 2;
    }
  
    function step(timestamp) {
      if (lastTime === null) lastTime = timestamp;
      const dt = timestamp - lastTime;
      lastTime = timestamp;
  
      if (boostTarget !== null && timestamp >= boostUntil) {
        boostTarget = null;
      }
      const currentTarget = boostTarget !== null ? boostTarget : BASE_SPEED;
  
      const decayFactor = Math.pow(DECAY_PER_SECOND, dt / 1000);
      velocity = currentTarget + (velocity - currentTarget) * decayFactor;
  
      offset += velocity * dt;
  
      if (singleSetWidth > 0) {
        offset = ((offset % singleSetWidth) + singleSetWidth) % singleSetWidth;
      }
  
      track.style.transform = `translateX(${-offset}px)`;
  
      requestAnimationFrame(step);
    }
  
    function boost(direction) {
      // direction: 1 = right arrow (temporarily reverses direction),
      // -1 = left arrow (temporarily speeds up the existing autoplay direction)
      boostTarget = direction > 0 ? -BASE_SPEED * BOOST_MULTIPLIER : BASE_SPEED * BOOST_MULTIPLIER;
      boostUntil = performance.now() + BOOST_HOLD_MS;
    }
  
    measure();
    window.addEventListener('resize', measure);
  
    if (prevBtn) {
      prevBtn.addEventListener('click', () => boost(-1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => boost(1));
    }
  
    requestAnimationFrame(step);
  })();