/* A restrained procedural vine that grows along fine-pointer movement. */

(() => {
  const canvas = document.querySelector("[data-living-vine]");
  const root = document.querySelector("[data-data-rain]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const context = canvas?.getContext("2d");
  if (!canvas || !root || !context) return;
  if (reducedMotion || !finePointer) {
    canvas.hidden = true;
    return;
  }

  const maxAge = 1900;
  const points = [];
  const pointer = { x: 0, y: 0, active: false };
  const tip = { x: 0, y: 0 };
  let width = 1;
  let height = 1;
  let pixelRatio = 1;
  let frameRequest = 0;
  let visible = !document.hidden;
  let protectedRects = [];
  let protectedRectsDirty = true;
  let protectedRectsUpdatedAt = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    protectedRectsDirty = true;
  }

  function addPoint(x, y, now) {
    const previous = points.at(-1);
    const angle = previous ? Math.atan2(y - previous.y, x - previous.x) : 0;
    points.push({ x, y, angle, bornAt: now });
    if (points.length > 72) points.shift();
  }

  function updatePointer(event) {
    if (event.pointerType === "touch") return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    if (!pointer.active) {
      pointer.active = true;
      tip.x = pointer.x;
      tip.y = pointer.y;
      addPoint(tip.x, tip.y, performance.now());
    }
  }

  function rgba(rgb, alpha) {
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
  }

  function updateProtectedRects(now) {
    if (!protectedRectsDirty && now - protectedRectsUpdatedAt < 240) return;
    protectedRects = [...document.querySelectorAll("h1, h2, h3, p, blockquote, a, button, label, input, textarea, dd, dt")]
      .map((element) => element.getBoundingClientRect())
      .filter((rect) => rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < height)
      .map((rect) => ({
        left: rect.left - 8,
        right: rect.right + 8,
        top: rect.top - 6,
        bottom: rect.bottom + 6,
      }));
    protectedRectsDirty = false;
    protectedRectsUpdatedAt = now;
  }

  function isProtected(point) {
    return protectedRects.some((rect) => (
      point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom
    ));
  }

  function drawLeaf(point, side, alpha, color) {
    const length = 9 + (point.bornAt % 4);
    const branchAngle = point.angle + side * 0.82;
    const endX = point.x - Math.cos(branchAngle) * length;
    const endY = point.y - Math.sin(branchAngle) * length;

    context.beginPath();
    context.moveTo(point.x, point.y);
    context.lineTo(endX, endY);
    context.strokeStyle = rgba(color, alpha * 0.62);
    context.lineWidth = 0.75;
    context.stroke();

    context.save();
    context.translate(endX, endY);
    context.rotate(branchAngle + side * 0.48);
    context.beginPath();
    context.moveTo(0, 0);
    context.bezierCurveTo(4, -2.6, 8, -1.6, 9, 0);
    context.bezierCurveTo(6, 2.1, 2.5, 2.3, 0, 0);
    context.fillStyle = rgba(color, alpha * 0.72);
    context.fill();
    context.restore();
  }

  function draw(now) {
    frameRequest = window.requestAnimationFrame(draw);
    if (!visible) return;

    context.clearRect(0, 0, width, height);
    if (pointer.active) {
      tip.x += (pointer.x - tip.x) * 0.24;
      tip.y += (pointer.y - tip.y) * 0.24;
      const previous = points.at(-1);
      if (!previous || Math.hypot(tip.x - previous.x, tip.y - previous.y) > 7) {
        addPoint(tip.x, tip.y, now);
      }
    }

    while (points.length && now - points[0].bornAt > maxAge) points.shift();
    if (points.length < 2) return;
    updateProtectedRects(now);

    const overDark = root.classList.contains("is-over-dark") || document.body.classList.contains("nav-open");
    const stemColor = overDark ? [141, 224, 194] : [31, 107, 90];
    const leafColor = overDark ? [179, 240, 219] : [49, 93, 87];

    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1];
      const point = points[index];
      const age = now - point.bornAt;
      const alpha = Math.max(0, 1 - age / maxAge) * Math.min(1, index / 7);
      if (isProtected(previous) || isProtected(point)) continue;
      context.beginPath();
      context.moveTo(previous.x, previous.y);
      context.lineTo(point.x, point.y);
      context.strokeStyle = rgba(stemColor, alpha * 0.66);
      context.lineWidth = 0.65 + alpha * 1.15;
      context.lineCap = "round";
      context.stroke();

      if (index > 3 && index % 5 === 0 && alpha > 0.08) {
        drawLeaf(point, index % 10 === 0 ? 1 : -1, alpha, leafColor);
      }
    }
  }

  window.addEventListener("pointermove", updatePointer, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("scroll", () => { protectedRectsDirty = true; }, { passive: true });
  window.addEventListener("blur", () => { pointer.active = false; });
  document.addEventListener("visibilitychange", () => {
    visible = !document.hidden;
  });

  resize();
  frameRequest = window.requestAnimationFrame(draw);

  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(frameRequest);
  }, { once: true });
})();
