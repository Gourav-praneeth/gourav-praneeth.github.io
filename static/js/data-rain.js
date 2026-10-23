/* Pointer-reactive data rain adapted for the portfolio's dependency-free stack. */

(() => {
  const root = document.querySelector("[data-data-rain]");
  if (!root) return;

  const main = root.querySelector(".data-rain-main");
  const bloom = root.querySelector(".data-rain-bloom");
  const context = main?.getContext("2d");
  const bloomContext = bloom?.getContext("2d");
  if (!main || !bloom || !context || !bloomContext) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const historyLength = 13;
  const fixedStep = 1 / 60;
  const maxParticles = 1700;
  const particles = [];
  let width = 1;
  let height = 1;
  let pixelRatio = 1;
  let targetCount = 900;
  let quality = 1;
  let frameRequest = 0;
  let lastTime = performance.now();
  let accumulator = 0;
  let elapsed = 0;
  let visible = true;
  let pointerActive = false;
  let pointerX = 0;
  let pointerY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let cursorVelocityX = 0;
  let cursorVelocityY = 0;
  let frameAverage = 16.7;
  let slowFrames = 0;

  function getCssColor(property, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(property).trim();
    return /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
  }

  function hexToRgb(hex) {
    const value = Number.parseInt(hex.slice(1), 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
  }

  function seededRandom(seed) {
    let state = seed >>> 0;
    return () => {
      state = (state + 0x6d2b79f5) >>> 0;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  const random = seededRandom(7);
  const rgbColors = [
    getCssColor("--rain-calm", "#8de0c2"),
    getCssColor("--rain-mid", "#6f93a1"),
    getCssColor("--rain-hot", "#ef8354"),
  ].map(hexToRgb);
  const rgbCore = hexToRgb(getCssColor("--rain-core", "#f1f3ee"));

  function seedParticle(particle, uniform = false) {
    const depth = 0.3 + random() * 0.7;
    particle.x = -40 + random() * (width + 80);
    particle.y = uniform ? random() * height : -50 - random() * 140;
    particle.depth = depth;
    particle.speed = 58 + depth * depth * 92;
    particle.vx = 0;
    particle.vy = particle.speed;
    particle.heat = 0;
    particle.history = Array.from({ length: historyLength }, () => [particle.x, particle.y]);
  }

  function setParticleCount(count, uniform = false) {
    const nextCount = Math.max(240, Math.min(maxParticles, Math.round(count)));
    while (particles.length < nextCount) {
      const particle = {};
      seedParticle(particle, uniform);
      particles.push(particle);
    }
    if (particles.length > nextCount) particles.length = nextCount;
  }

  function render() {
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "lighter";
    context.lineCap = "round";

    particles.forEach((particle) => {
      const speedRatio = Math.hypot(particle.vx, particle.vy) / particle.speed;
      const colorIndex = particle.heat > 0.2 || speedRatio > 1.75 ? 2 : speedRatio > 1.2 ? 1 : 0;
      const [red, green, blue] = rgbColors[colorIndex];
      const alpha = (0.1 + particle.depth * 0.23) * (colorIndex === 2 ? 1.2 : 1);
      context.beginPath();
      particle.history.forEach(([x, y], pointIndex) => {
        if (pointIndex === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      context.lineWidth = 0.45 + particle.depth * 0.7;
      context.stroke();

      if (colorIndex === 2) {
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(particle.history[1][0], particle.history[1][1]);
        context.strokeStyle = `rgba(${rgbCore.join(", ")}, ${0.25 + particle.heat * 0.42})`;
        context.lineWidth = 1.1;
        context.stroke();
      }
    });

    bloomContext.clearRect(0, 0, bloom.width, bloom.height);
    bloomContext.drawImage(main, 0, 0, bloom.width, bloom.height);
  }

  function resize() {
    const bounds = root.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
    if (width * height * pixelRatio * pixelRatio > 3600000) {
      pixelRatio = Math.sqrt(3600000 / (width * height));
    }
    main.width = Math.round(width * pixelRatio);
    main.height = Math.round(height * pixelRatio);
    bloom.width = Math.max(1, Math.ceil(width / 4));
    bloom.height = Math.max(1, Math.ceil(height / 4));
    targetCount = Math.max(520, Math.min(maxParticles, Math.round((width * height) / 780)));
    setParticleCount(targetCount * quality, true);
    cursorX = width * 0.58;
    cursorY = height * 0.42;
    render();
  }

  function updatePointer(event) {
    if (!finePointer) return;
    const bounds = root.getBoundingClientRect();
    pointerX = event.clientX - bounds.left;
    pointerY = event.clientY - bounds.top;
    pointerActive =
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom &&
      pointerX >= 0 &&
      pointerX <= bounds.width;
  }

  function simulate() {
    elapsed += fixedStep;
    const targetX = pointerActive ? pointerX : width * (0.58 + Math.sin(elapsed * 0.31) * 0.16);
    const targetY = pointerActive ? pointerY : height * (0.43 + Math.sin(elapsed * 0.47 + 1.2) * 0.18);
    const previousX = cursorX;
    const previousY = cursorY;
    cursorX += (targetX - cursorX) * 0.18;
    cursorY += (targetY - cursorY) * 0.18;
    cursorVelocityX += (((cursorX - previousX) / fixedStep) - cursorVelocityX) * 0.16;
    cursorVelocityY += (((cursorY - previousY) / fixedStep) - cursorVelocityY) * 0.16;
    const cursorSpeed = Math.hypot(cursorVelocityX, cursorVelocityY);
    const obstacleRadius = 54 + Math.min(cursorSpeed * 0.018, 28);

    particles.forEach((particle, index) => {
      const sway =
        Math.sin(particle.y * 0.009 + elapsed * 0.7 + index * 0.013) * 10 +
        Math.cos(particle.x * 0.006 - elapsed * 0.36) * 7;
      let targetVelocityX = sway * particle.depth;
      let targetVelocityY = particle.speed;
      const dx = particle.x - cursorX;
      const dy = particle.y - cursorY;
      const distanceSquared = dx * dx + dy * dy;
      const influenceRadius = obstacleRadius * 4.6;

      if (distanceSquared < influenceRadius * influenceRadius) {
        const distance = Math.max(1, Math.sqrt(distanceSquared));
        const influence = (1 - distance / influenceRadius) ** 2;
        const tangentX = -dy / distance;
        const tangentY = dx / distance;
        const radialX = dx / distance;
        const radialY = dy / distance;
        const direction = cursorVelocityX >= 0 ? 1 : -1;
        targetVelocityX += (tangentX * direction * 210 + radialX * 125) * influence;
        targetVelocityY += (tangentY * direction * 210 + radialY * 125) * influence;
        particle.heat = Math.max(particle.heat, influence);
      }

      particle.heat *= 0.965;
      particle.vx += (targetVelocityX - particle.vx) * 0.12;
      particle.vy += (targetVelocityY - particle.vy) * 0.12;
      particle.x += particle.vx * fixedStep;
      particle.y += particle.vy * fixedStep;
      particle.history.unshift([particle.x, particle.y]);
      particle.history.length = historyLength;

      if (particle.y > height + 60 || particle.x < -160 || particle.x > width + 160) {
        seedParticle(particle);
      }
    });
  }

  function frame(now) {
    frameRequest = 0;
    if (!visible || document.hidden || reducedMotion) return;
    const frameDuration = Math.min(50, Math.max(0, now - lastTime));
    lastTime = now;
    accumulator += frameDuration / 1000;
    let steps = 0;
    while (accumulator >= fixedStep && steps < 3) {
      simulate();
      accumulator -= fixedStep;
      steps += 1;
    }
    if (steps === 3) accumulator = 0;
    if (steps) render();

    frameAverage += (frameDuration - frameAverage) * 0.05;
    slowFrames = frameAverage > 21 ? slowFrames + 1 : 0;
    if (slowFrames > 75 && quality > 0.45) {
      quality -= 0.12;
      setParticleCount(targetCount * quality);
      slowFrames = 0;
    }
    frameRequest = window.requestAnimationFrame(frame);
  }

  function start() {
    if (frameRequest || reducedMotion || !visible || document.hidden) return;
    lastTime = performance.now();
    frameRequest = window.requestAnimationFrame(frame);
  }

  function stop() {
    window.cancelAnimationFrame(frameRequest);
    frameRequest = 0;
  }

  function renderStaticFrame() {
    for (let index = 0; index < 90; index += 1) simulate();
    render();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  });
  visibilityObserver.observe(root);

  window.addEventListener("pointermove", updatePointer, { passive: true });
  window.addEventListener("blur", () => { pointerActive = false; });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  resize();
  if (reducedMotion) renderStaticFrame();
  else start();
})();
