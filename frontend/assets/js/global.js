(function () {
  const links = [
    ["Home", "index.html", "home"],
    ["Features", "features.html", "features"],
    ["Solutions", "solutions.html", "solutions"],
    ["Projects", "projects.html", "projects"],
    ["About", "about.html", "about"],
    ["Resources", "resources.html", "resources"],
    ["Contact", "contact.html", "contact"],
    ["Portfolio", "portfolio.html", "portfolio"]
  ];

  const owner = {
    email: "praveenkicha01@gmail.com",
    phone: "+91 8825870266",
    portfolio: "https://praveen-kannan-4607.vercel.app/",
    linkedin: "https://www.linkedin.com/in/praveen-kannan-6862382a2",
    github: "https://github.com/Praveenmarshal",
    whatsapp: "https://wa.me/918825870266"
  };

  const defaultApiBase = (() => {
    if (window.ZILIST_API_BASE) return window.ZILIST_API_BASE;
    if (window.location.protocol === "file:" || ["8000", "8080", "5500"].includes(window.location.port)) {
      return "https://zilist-ai-1.onrender.com/api";
    }
    return `${window.location.origin}/api`;
  })();

  const state = {
    apiBase: defaultApiBase,
    mouse: { x: 0.5, y: 0.5 }
  };

  function apiHeaders(json) {
    const token = localStorage.getItem("zilist_admin_token");
    return {
      ...(json ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }

  async function request(path, options = {}) {
    const isJson = options.body && !(options.body instanceof FormData);
    const response = await fetch(`${state.apiBase}${path}`, {
      ...options,
      headers: { ...apiHeaders(isJson), ...(options.headers || {}) },
      body: isJson ? JSON.stringify(options.body) : options.body
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  }

  function renderEnvironment() {
    if (document.querySelector(".cinematic-environment")) return;
    const env = document.createElement("div");
    env.className = "cinematic-environment";
    env.innerHTML = `
      <video autoplay muted loop playsinline aria-hidden="true">
        <source src="assets/videos/background.mp4" type="video/mp4">
      </video>
      <canvas id="zilist-three"></canvas>
      <div class="living-brain" aria-hidden="true">
        <span class="brain-core"></span>
        <span class="brain-lobe lobe-a"></span>
        <span class="brain-lobe lobe-b"></span>
        <span class="brain-lobe lobe-c"></span>
        <span class="brain-lobe lobe-d"></span>
        <span class="neural-thread thread-a"></span>
        <span class="neural-thread thread-b"></span>
        <span class="neural-thread thread-c"></span>
        <span class="brain-ring"></span>
        <span class="brain-ring-b"></span>
        <span class="brain-ring-c"></span>
      </div>
      <div class="flying-robot" aria-hidden="true">
        <span class="robot-head"><span></span></span>
        <span class="robot-body"></span>
        <span class="robot-arm arm-left"></span>
        <span class="robot-arm arm-right"></span>
      </div>
      <div class="flying-robot-b" aria-hidden="true">
        <span class="robot-head"><span></span></span>
        <span class="robot-body"></span>
        <span class="robot-arm arm-left"></span>
        <span class="robot-arm arm-right"></span>
      </div>
      <div class="flying-robot-c" aria-hidden="true">
        <span class="robot-head"><span></span></span>
        <span class="robot-body"></span>
        <span class="robot-arm arm-left"></span>
        <span class="robot-arm arm-right"></span>
      </div>
      <div class="flying-robot-d" aria-hidden="true">
        <span class="robot-head"><span></span></span>
        <span class="robot-body"></span>
        <span class="robot-arm arm-left"></span>
        <span class="robot-arm arm-right"></span>
      </div>
      <div class="flying-robot-e" aria-hidden="true">
        <span class="robot-head"><span></span></span>
        <span class="robot-body"></span>
        <span class="robot-arm arm-left"></span>
        <span class="robot-arm arm-right"></span>
      </div>
      <div class="ocean-scene" aria-hidden="true">
        <canvas id="ocean-canvas"></canvas>
      </div>
      <div class="crystal-cluster" aria-hidden="true">
        <!-- 7 crossed 4D crystals rendered as SVG octahedrons -->
        <div class="xtal xtal-a">
          <svg width="68" height="230" viewBox="0 0 68 230">
            <!-- Front face up -->
            <polygon points="34,0 68,230 0,230" fill="url(#xg-a)" opacity="0.95"/>
            <!-- Front face down (base mirror) -->
            <polygon points="34,230 68,170 0,170" fill="url(#xg-a2)" opacity="0.8"/>
            <!-- Cross arm 1 -->
            <polygon points="34,0 60,230 8,230" fill="url(#xg-a3)" opacity="0.55" transform="rotate(90,34,115)"/>
            <!-- Cross arm 2 -->
            <polygon points="34,0 60,230 8,230" fill="url(#xg-a4)" opacity="0.45" transform="rotate(45,34,115)"/>
            <!-- Highlight edge -->
            <line x1="34" y1="0" x2="34" y2="230" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
            <defs>
              <linearGradient id="xg-a" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fff"/>
                <stop offset="18%" stop-color="#d8b4fe"/>
                <stop offset="50%" stop-color="#a855f7"/>
                <stop offset="100%" stop-color="#5b21b6"/>
              </linearGradient>
              <linearGradient id="xg-a2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="#4c1d95"/>
              </linearGradient>
              <linearGradient id="xg-a3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#c4b5fd" stop-opacity="0.6"/>
                <stop offset="100%" stop-color="#6d28d9" stop-opacity="0.3"/>
              </linearGradient>
              <linearGradient id="xg-a4" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#f5f3ff" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="xtal xtal-b">
          <svg width="48" height="165" viewBox="0 0 48 165">
            <polygon points="24,0 48,165 0,165" fill="url(#xg-b)" opacity="0.93"/>
            <polygon points="24,165 44,120 4,120" fill="url(#xg-b2)" opacity="0.8"/>
            <polygon points="24,0 44,165 4,165" fill="url(#xg-b3)" opacity="0.5" transform="rotate(90,24,82)"/>
            <polygon points="24,0 44,165 4,165" fill="url(#xg-b4)" opacity="0.4" transform="rotate(60,24,82)"/>
            <line x1="24" y1="0" x2="24" y2="165" stroke="rgba(255,255,255,0.65)" stroke-width="1.2"/>
            <defs>
              <linearGradient id="xg-b" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ede9fe"/>
                <stop offset="30%" stop-color="#a78bfa"/>
                <stop offset="100%" stop-color="#4c1d95"/>
              </linearGradient>
              <linearGradient id="xg-b2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#7c3aed"/>
                <stop offset="100%" stop-color="#3b0764"/>
              </linearGradient>
              <linearGradient id="xg-b3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#c4b5fd" stop-opacity="0.55"/>
                <stop offset="100%" stop-color="#6d28d9" stop-opacity="0.25"/>
              </linearGradient>
              <linearGradient id="xg-b4" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#f5f3ff" stop-opacity="0.45"/>
                <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="xtal xtal-c">
          <svg width="52" height="180" viewBox="0 0 52 180">
            <polygon points="26,0 52,180 0,180" fill="url(#xg-c)" opacity="0.93"/>
            <polygon points="26,180 48,130 4,130" fill="url(#xg-c2)" opacity="0.8"/>
            <polygon points="26,0 48,180 4,180" fill="url(#xg-c3)" opacity="0.5" transform="rotate(90,26,90)"/>
            <polygon points="26,0 48,180 4,180" fill="url(#xg-c4)" opacity="0.38" transform="rotate(-55,26,90)"/>
            <line x1="26" y1="0" x2="26" y2="180" stroke="rgba(255,255,255,0.65)" stroke-width="1.2"/>
            <defs>
              <linearGradient id="xg-c" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#f5f3ff"/>
                <stop offset="25%" stop-color="#c4b5fd"/>
                <stop offset="100%" stop-color="#5b21b6"/>
              </linearGradient>
              <linearGradient id="xg-c2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6d28d9"/>
                <stop offset="100%" stop-color="#3b0764"/>
              </linearGradient>
              <linearGradient id="xg-c3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#ddd6fe" stop-opacity="0.55"/>
                <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.2"/>
              </linearGradient>
              <linearGradient id="xg-c4" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fff" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.15"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="xtal xtal-d">
          <svg width="34" height="120" viewBox="0 0 34 120">
            <polygon points="17,0 34,120 0,120" fill="url(#xg-d)" opacity="0.9"/>
            <polygon points="17,120 32,88 2,88" fill="url(#xg-d2)" opacity="0.75"/>
            <polygon points="17,0 32,120 2,120" fill="url(#xg-d3)" opacity="0.48" transform="rotate(90,17,60)"/>
            <line x1="17" y1="0" x2="17" y2="120" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
            <defs>
              <linearGradient id="xg-d" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fff"/>
                <stop offset="40%" stop-color="#a78bfa"/>
                <stop offset="100%" stop-color="#4c1d95"/>
              </linearGradient>
              <linearGradient id="xg-d2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#7c3aed"/>
                <stop offset="100%" stop-color="#2e1065"/>
              </linearGradient>
              <linearGradient id="xg-d3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#ddd6fe" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#6d28d9" stop-opacity="0.2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="xtal xtal-e">
          <svg width="38" height="135" viewBox="0 0 38 135">
            <polygon points="19,0 38,135 0,135" fill="url(#xg-e)" opacity="0.9"/>
            <polygon points="19,135 36,98 2,98" fill="url(#xg-e2)" opacity="0.78"/>
            <polygon points="19,0 36,135 2,135" fill="url(#xg-e3)" opacity="0.46" transform="rotate(90,19,67)"/>
            <line x1="19" y1="0" x2="19" y2="135" stroke="rgba(255,255,255,0.62)" stroke-width="1"/>
            <defs>
              <linearGradient id="xg-e" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ede9fe"/>
                <stop offset="35%" stop-color="#c4b5fd"/>
                <stop offset="100%" stop-color="#5b21b6"/>
              </linearGradient>
              <linearGradient id="xg-e2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6d28d9"/>
                <stop offset="100%" stop-color="#2e1065"/>
              </linearGradient>
              <linearGradient id="xg-e3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#ddd6fe" stop-opacity="0.48"/>
                <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.18"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="xtal xtal-f">
          <svg width="26" height="95" viewBox="0 0 26 95">
            <polygon points="13,0 26,95 0,95" fill="url(#xg-f)" opacity="0.88"/>
            <polygon points="13,95 24,68 2,68" fill="url(#xg-f2)" opacity="0.72"/>
            <polygon points="13,0 24,95 2,95" fill="url(#xg-f3)" opacity="0.44" transform="rotate(90,13,47)"/>
            <line x1="13" y1="0" x2="13" y2="95" stroke="rgba(255,255,255,0.58)" stroke-width="0.8"/>
            <defs>
              <linearGradient id="xg-f" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#f5f3ff"/>
                <stop offset="50%" stop-color="#8b5cf6"/>
                <stop offset="100%" stop-color="#3b0764"/>
              </linearGradient>
              <linearGradient id="xg-f2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6d28d9"/>
                <stop offset="100%" stop-color="#1e0a40"/>
              </linearGradient>
              <linearGradient id="xg-f3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#c4b5fd" stop-opacity="0.45"/>
                <stop offset="100%" stop-color="#5b21b6" stop-opacity="0.15"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="xtal xtal-g">
          <svg width="30" height="105" viewBox="0 0 30 105">
            <polygon points="15,0 30,105 0,105" fill="url(#xg-g)" opacity="0.88"/>
            <polygon points="15,105 28,76 2,76" fill="url(#xg-g2)" opacity="0.74"/>
            <polygon points="15,0 28,105 2,105" fill="url(#xg-g3)" opacity="0.44" transform="rotate(90,15,52)"/>
            <line x1="15" y1="0" x2="15" y2="105" stroke="rgba(255,255,255,0.6)" stroke-width="0.8"/>
            <defs>
              <linearGradient id="xg-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fff"/>
                <stop offset="30%" stop-color="#a78bfa"/>
                <stop offset="100%" stop-color="#4c1d95"/>
              </linearGradient>
              <linearGradient id="xg-g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#7c3aed"/>
                <stop offset="100%" stop-color="#2e1065"/>
              </linearGradient>
              <linearGradient id="xg-g3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#ddd6fe" stop-opacity="0.46"/>
                <stop offset="100%" stop-color="#6d28d9" stop-opacity="0.18"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="xtal-base-glow"></div>
        <div class="xtal-spark" style="top:8%;left:47%;animation-delay:0s"></div>
        <div class="xtal-spark" style="top:22%;left:28%;animation-delay:0.6s"></div>
        <div class="xtal-spark" style="top:18%;right:26%;animation-delay:1.1s"></div>
        <div class="xtal-spark" style="top:38%;left:16%;animation-delay:1.8s"></div>
        <div class="xtal-spark" style="top:42%;right:14%;animation-delay:0.9s"></div>
      </div>
      <div class="alive-field" aria-hidden="true"></div>
    `;
    document.body.prepend(env);
  }

  function renderNavbar() {
    const target = document.querySelector("[data-navbar]");
    if (!target) return;
    const page = document.body.dataset.page || "";
    target.innerHTML = `
      <header class="site-nav-wrap">
        <nav class="site-nav" aria-label="Primary navigation">
          <a class="brand" href="index.html" aria-label="ZILIST home">ZILIST</a>
          <button class="nav-toggle" type="button" aria-label="Open navigation">☰</button>
          <div class="nav-links">
            ${links.map(([label, href, key]) => `<a class="nav-link ${page === key ? "is-active" : ""}" href="${href}">${label}</a>`).join("")}
          </div>
          <div class="nav-actions">
            <a class="btn btn-secondary" href="contact.html">Contact Me</a>
            <a class="btn btn-ghost" href="admin-login.html">Admin Login</a>
          </div>
        </nav>
      </header>
    `;
    target.querySelector(".nav-toggle")?.addEventListener("click", () => {
      target.querySelector(".site-nav")?.classList.toggle("is-open");
    });
  }

  function renderFooter() {
    const target = document.querySelector("[data-footer]");
    if (!target) return;
    target.innerHTML = `
      <footer class="site-footer">
        <div class="footer-grid">
          <div>
            <h2 class="footer-title">ZILIST</h2>
            <p class="body-copy" style="color:rgba(255,255,255,.7)">Building intelligent AI systems, automation platforms, and premium digital experiences for the future.</p>
          </div>
          <div>
            <h3 class="footer-heading">Company</h3>
            <div class="footer-links">
              <a href="about.html">About Us</a>
              <a href="solutions.html">Our Mission</a>
              <a href="projects.html">Careers</a>
              <a href="contact.html">Contact</a>
            </div>
          </div>
          <div>
            <h3 class="footer-heading">Services</h3>
            <div class="footer-links">
              <a href="features.html">AI Automation</a>
              <a href="features.html">AI Chatbots</a>
              <a href="solutions.html">Web Development</a>
              <a href="solutions.html">Data Analytics</a>
            </div>
          </div>
          <div>
            <h3 class="footer-heading">Resources</h3>
            <div class="footer-links">
              <a href="resources.html">Articles</a>
              <a href="resources.html">Guides</a>
              <a href="resources.html">Tutorials</a>
              <a href="resources.html">Tools</a>
            </div>
          </div>
          <div>
            <h3 class="footer-heading">Contact</h3>
            <div class="footer-links">
              <a href="mailto:${owner.email}">${owner.email}</a>
              <a href="tel:+918825870266">${owner.phone}</a>
              <a href="${owner.github}" target="_blank" rel="noreferrer">GitHub</a>
              <a href="${owner.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="${owner.portfolio}" target="_blank" rel="noreferrer">Portfolio</a>
            </div>
          </div>
        </div>
        <div class="footer-copy">© 2026 ZILIST — Built by Praveen Kannan</div>
      </footer>
    `;
  }

  function setupTransitions() {
    const veil = document.createElement("div");
    veil.className = "transition-veil";
    document.body.appendChild(veil);

    window.addEventListener("pointermove", (event) => {
      state.mouse.x = event.clientX / window.innerWidth;
      state.mouse.y = event.clientY / window.innerHeight;
      veil.style.setProperty("--mx", `${event.clientX}px`);
      veil.style.setProperty("--my", `${event.clientY}px`);
    });

    document.addEventListener("click", (event) => {
      const anchor = event.target.closest("a[href]");
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      const sameOrigin = url.origin === window.location.origin;
      const htmlPage = url.pathname.endsWith(".html") || url.pathname.endsWith("/");
      if (!sameOrigin || anchor.target || !htmlPage) return;
      event.preventDefault();
      if (window.gsap) {
        gsap.to(veil, { opacity: 1, duration: 0.38, ease: "power2.out", onComplete: () => { window.location.href = anchor.href; } });
      } else {
        veil.style.opacity = "1";
        setTimeout(() => { window.location.href = anchor.href; }, 220);
      }
    });
  }

  function setupOcean() {
    const canvas = document.getElementById("ocean-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);

    function resize() {
      canvas.width  = canvas.offsetWidth  || window.innerWidth;
      canvas.height = canvas.offsetHeight || 200;
    }
    resize();
    window.addEventListener("resize", () => { resize(); });

    // Desktop: 5 layers, 38 foam — Mobile: 3 layers, 12 foam, bigger step
    const layers = isMobile ? [
      { speed: 0.45, amp: 22, wl: 0.013, phase: 0,   color: "rgba(139,92,246,0.36)",  yBase: 0.52 },
      { speed: 0.30, amp: 14, wl: 0.020, phase: 2.1, color: "rgba(167,139,250,0.30)", yBase: 0.68 },
      { speed: 0.60, amp:  8, wl: 0.032, phase: 4.0, color: "rgba(196,181,253,0.42)", yBase: 0.82 },
    ] : [
      { speed: 0.55, amp: 28, wl: 0.012, phase: 0,   color: "rgba(139,92,246,0.38)",  yBase: 0.55 },
      { speed: 0.38, amp: 20, wl: 0.018, phase: 1.8, color: "rgba(167,139,250,0.30)", yBase: 0.65 },
      { speed: 0.70, amp: 14, wl: 0.022, phase: 3.5, color: "rgba(196,181,253,0.45)", yBase: 0.72 },
      { speed: 0.28, amp: 10, wl: 0.030, phase: 5.2, color: "rgba(237,233,254,0.55)", yBase: 0.80 },
      { speed: 0.90, amp:  6, wl: 0.040, phase: 2.1, color: "rgba(255,255,255,0.38)", yBase: 0.88 },
    ];

    const foamCount = isMobile ? 12 : 38;
    const step      = isMobile ? 6  : 2;   // pixel step — bigger = fewer Math.sin calls
    const foam = Array.from({ length: foamCount }, () => ({
      x: Math.random(), y: 0,
      r: 1.5 + Math.random() * 3,
      speed: 0.15 + Math.random() * 0.4,
      life: Math.random(),
      maxLife: 0.6 + Math.random() * 0.8,
      layer: Math.floor(Math.random() * Math.min(3, layers.length)),
    }));

    // Pre-bake gradient colours as solid fills on mobile to avoid per-frame gradient creation
    layers.forEach(lyr => {
      lyr._fill = lyr.color;
    });

    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const interval  = 1000 / targetFPS;

    function draw(ts) {
      requestAnimationFrame(draw);
      if (ts - lastTime < interval) return;  // throttle to target FPS
      lastTime = ts;

      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      layers.forEach((lyr, li) => {
        lyr.phase += lyr.speed * (isMobile ? 0.010 : 0.012);
        const baseY = H * lyr.yBase;

        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W + step; x += step) {
          const y = baseY
            - Math.sin(x * lyr.wl + lyr.phase) * lyr.amp
            - Math.sin(x * lyr.wl * 2.2 + lyr.phase * 1.3) * (lyr.amp * 0.32);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.closePath();

        if (isMobile) {
          // Solid fill on mobile — no gradient creation per frame
          ctx.fillStyle = lyr._fill;
        } else {
          const grad = ctx.createLinearGradient(0, baseY - lyr.amp * 2, 0, H);
          grad.addColorStop(0,   lyr.color);
          grad.addColorStop(0.6, lyr.color.replace(/[\d.]+\)$/, v => (+v.match(/[\d.]+/)[0] * 0.45).toFixed(2) + ")"));
          grad.addColorStop(1,   "rgba(255,255,255,0)");
          ctx.fillStyle = grad;
        }
        ctx.fill();

        // Crest line — skip on mobile innermost layers
        if (!isMobile && li < 3 || isMobile && li < 1) {
          ctx.beginPath();
          for (let x = 0; x <= W + step; x += step) {
            const y = H * lyr.yBase
              - Math.sin(x * lyr.wl + lyr.phase) * lyr.amp
              - Math.sin(x * lyr.wl * 2.2 + lyr.phase * 1.3) * (lyr.amp * 0.32);
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(255,255,255,${isMobile ? 0.45 : 0.55 - li * 0.12})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });

      // Foam — skip on very small mobile
      if (!isMobile || W > 400) {
        foam.forEach(f => {
          f.life += 0.012 * f.speed;
          if (f.life > f.maxLife) { f.life = 0; f.x = Math.random(); }
          const lyr = layers[f.layer];
          const px  = f.x * W;
          const py  = H * lyr.yBase - Math.sin(px * lyr.wl + lyr.phase) * lyr.amp;
          const alpha = Math.sin((f.life / f.maxLife) * Math.PI) * 0.65;
          ctx.beginPath();
          ctx.arc(px, py, f.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
          ctx.fill();
        });
      }
    }
    requestAnimationFrame(draw);
  }

  function setupThree() {
    const canvas = document.getElementById("zilist-three");
    if (!canvas || !window.THREE) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    const point = new THREE.PointLight(0xc4b5fd, 2.15, 22);
    point.position.set(3, 2, 6);
    scene.add(ambient, point);

    const particles = new THREE.BufferGeometry();
    const count = window.innerWidth < 680 ? 760 : 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleSystem = new THREE.Points(
      particles,
      new THREE.PointsMaterial({ color: 0x8b5cf6, size: 0.02, transparent: true, opacity: 0.82 })
    );
    scene.add(particleSystem);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xc4b5fd, wireframe: true, transparent: true, opacity: 0.26 });
    const rings = [];
    for (let i = 0; i < 3; i += 1) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.4 + i * 0.62, 0.012, 16, 120), ringMaterial.clone());
      ring.position.set(2.2 - i * 0.35, 0.2 - i * 0.14, -1 - i);
      ring.rotation.x = Math.PI / 2.6;
      ring.rotation.z = i * 0.7;
      rings.push(ring);
      scene.add(ring);
    }

    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    function frame(time) {
      const t = time * 0.001;
      particleSystem.rotation.y = t * 0.035 + (state.mouse.x - 0.5) * 0.18;
      particleSystem.rotation.x = (state.mouse.y - 0.5) * 0.08;
      rings.forEach((ring, index) => {
        ring.rotation.z = t * (0.08 + index * 0.018) + index;
        ring.position.y = Math.sin(t + index) * 0.12;
      });
      point.position.x = 2.4 + (state.mouse.x - 0.5) * 2;
      point.position.y = 1.4 - (state.mouse.y - 0.5) * 1.4;
      renderer.render(scene, camera);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const knowledge = [
    [["about", "zilist", "company"], "ZILIST is Praveen Kannan's premium AI company for AI systems, chatbots, automation platforms, dashboards, cybersecurity tools, data analytics, and full-stack digital experiences."],
    [["praveen", "owner", "developer", "founder"], "Praveen Kannan is a full-stack AI developer and software engineer focused on futuristic AI systems, automation platforms, premium dashboards, intelligent business solutions, and next-generation digital experiences."],
    [["service", "services", "offer", "build", "make", "develop"], "ZILIST builds AI automation, AI chatbots, full-stack apps, AI dashboards, cybersecurity systems, analytics platforms, and business automation workflows."],
    [["contact", "email", "phone", "call", "whatsapp", "linkedin", "github"], `You can contact Praveen at ${owner.email}, call ${owner.phone}, message on WhatsApp, connect on LinkedIn or GitHub, or visit the portfolio at ${owner.portfolio}.`],
    [["project", "portfolio", "case study", "work"], "Featured ZILIST projects include AI Chatbot Platform, Analytics Dashboard, Gym Management System, AI Automation Platform, Cybersecurity Dashboard, and Portfolio System."],
    [["technology", "stack", "tools", "database", "backend", "frontend"], "The ZILIST stack includes Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary, Nodemailer, OpenAI, Gemini, Three.js, GSAP, Swiper, Tailwind, and modern frontend architecture."],
    [["price", "pricing", "cost", "budget", "quote"], "ZILIST does not use public subscriptions or fixed pricing. Every project is scoped privately with Praveen after understanding your goals, timeline, integrations, and required AI features."],
    [["time", "timeline", "deadline", "duration"], "Timeline depends on scope. A chatbot or focused dashboard can be planned quickly, while a full-stack AI platform needs discovery, UI, backend, database, testing, and deployment phases."],
    [["chatbot", "assistant", "bot"], "ZILIST can build custom AI chatbots with website knowledge, lead capture, multilingual support, admin review, OpenAI or Gemini integration, and safe fallback answers."],
    [["automation", "workflow", "automate"], "ZILIST automation systems can connect forms, CRMs, dashboards, APIs, notifications, reports, and AI decisions so repetitive work runs with less manual effort."],
    [["dashboard", "analytics", "data", "report"], "ZILIST creates premium AI dashboards for business metrics, analytics, operations, cybersecurity visibility, customer insights, and executive decision-making."],
    [["security", "cybersecurity", "secure"], "ZILIST can design cybersecurity dashboards and secure application layers with admin authentication, protected APIs, careful data handling, and monitoring workflows."],
    [["mobile", "responsive", "phone"], "The ZILIST website and platforms are designed to adapt across desktop, tablet, and mobile with cinematic visuals, readable sections, and touch-friendly controls."],
    [["admin", "login", "credentials"], "The ZILIST admin area is private for the owner only. It manages projects, resources, messages, payment proofs, testimonials, analytics, settings, and chatbot knowledge."]
  ];

  function localAssistant(message) {
    const text = message.toLowerCase().replace(/[^\w\s+@.-]/g, " ");
    if (/\b(can|could|will|do)\b.*\b(build|create|make|develop|design|automate|integrate)\b/.test(text)) {
      return "Yes. ZILIST can build custom AI systems, chatbots, automations, dashboards, cybersecurity tools, data products, and full-stack applications. Share your idea through the contact form or email Praveen directly so the project can be scoped.";
    }
    const hit = knowledge.find(([keys]) => keys.some((key) => text.includes(key)));
    if (hit) return hit[1];
    if (text.includes("?")) {
      return "That sounds like a custom ZILIST project question. Praveen can help clarify the best AI architecture, automation flow, database, dashboard, or deployment plan. Send the details through Contact Me or email praveenkicha01@gmail.com.";
    }
    return "I can help with ZILIST services, custom project ideas, AI chatbots, automation, dashboards, cybersecurity, technology stack, pricing approach, timelines, portfolio, contact details, and navigation.";
  }

  function setupChatbot() {
    if (document.querySelector(".chat-launcher")) return;
    const panel = document.createElement("section");
    panel.className = "chat-panel glass-panel";
    panel.setAttribute("aria-label", "ZILIST AI Assistant");
    panel.innerHTML = `
      <div class="chat-head">
        <strong>ZILIST AI Assistant</strong>
        <button class="round-icon" data-chat-close type="button" aria-label="Close chat">×</button>
      </div>
      <div class="chat-body" data-chat-body>
        <p class="chat-msg">Hello. I am your ZILIST AI assistant. How can I help you today?</p>
      </div>
      <div class="chat-actions">
        <button class="chat-suggestion" type="button">Tell me about ZILIST</button>
        <button class="chat-suggestion" type="button">Show your projects</button>
        <button class="chat-suggestion" type="button">Explain your services</button>
        <button class="chat-suggestion" type="button">Contact Praveen</button>
      </div>
      <form class="chat-form" data-chat-form>
        <input name="message" autocomplete="off" placeholder="Type your message..." aria-label="Chat message">
        <button class="round-icon" type="submit" aria-label="Send message">›</button>
      </form>
    `;
    const launcher = document.createElement("button");
    launcher.className = "chat-launcher";
    launcher.type = "button";
    launcher.setAttribute("aria-label", "Open ZILIST AI Assistant");
    document.body.append(panel, launcher);

    const body = panel.querySelector("[data-chat-body]");
    function addMessage(text, role) {
      const msg = document.createElement("p");
      msg.className = `chat-msg ${role === "user" ? "user" : ""}`;
      msg.textContent = text;
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
    }

    async function ask(message) {
      addMessage(message, "user");
      try {
        const data = await request("/chatbot/message", {
          method: "POST",
          body: { message, page: document.body.dataset.page || window.location.pathname }
        });
        addMessage(data.reply || localAssistant(message), "assistant");
      } catch (error) {
        addMessage(localAssistant(message), "assistant");
      }
    }

    launcher.addEventListener("click", () => panel.classList.toggle("is-open"));
    panel.querySelector("[data-chat-close]").addEventListener("click", () => panel.classList.remove("is-open"));
    panel.querySelectorAll(".chat-suggestion").forEach((button) => button.addEventListener("click", () => ask(button.textContent.trim())));
    panel.querySelector("[data-chat-form]").addEventListener("submit", (event) => {
      event.preventDefault();
      const input = event.currentTarget.message;
      const message = input.value.trim();
      if (!message) return;
      input.value = "";
      ask(message);
    });
  }

  function animateBasics() {
    if (!window.gsap) return;
    gsap.from(".eyebrow, .page-title, .display-title, .hero-copy, .button-row", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power2.out"
    });
    gsap.from(".feature-card, .solution-card, .project-card, .resource-card, .metric-card, .glass-panel", {
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.04,
      delay: 0.18,
      ease: "power2.out"
    });
  }

  function trackPage() {
    request("/analytics/event", {
      method: "POST",
      body: { type: "page_view", page: document.body.dataset.page || window.location.pathname, referrer: document.referrer }
    }).catch(() => {});
  }

  window.Zilist = {
    owner,
    apiBase: state.apiBase,
    api: {
      get: (path) => request(path),
      post: (path, body) => request(path, { method: "POST", body }),
      put: (path, body) => request(path, { method: "PUT", body }),
      delete: (path) => request(path, { method: "DELETE" })
    },
    animateBasics,
    localAssistant
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderEnvironment();
    renderNavbar();
    renderFooter();
    setupTransitions();
    setupThree();
    setupOcean();
    setupChatbot();
    animateBasics();
    trackPage();
  });
})();
