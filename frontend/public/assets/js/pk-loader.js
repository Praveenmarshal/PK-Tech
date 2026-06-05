/**
 * pk-loader.js — PK Tech intro screen
 * Shows logo + sequential status messages, then fades out.
 * Runs once per session (sessionStorage flag).
 */
(function () {
  "use strict";

  // Only show once per browser session
  if (sessionStorage.getItem("pk_loaded")) return;

  const STEPS = [
    { text: "Website connecting",  duration: 900  },
    { text: "Website loading",     duration: 900  },
    { text: "Website opening",     duration: 700  },
  ];

  const PROGRESS = [20, 65, 100];

  // ── Build DOM ────────────────────────────────────────────
  const loader = document.createElement("div");
  loader.id = "pk-loader";
  loader.innerHTML = `
    <div class="pk-logo-wrap">
      <div class="pk-ring-2"></div>
      <div class="pk-ring"></div>
      <div class="pk-logo">PK</div>
    </div>
    <div class="pk-brand">PK Tech</div>

    <div class="pk-status-wrap">
      ${STEPS.map((s, i) => `
        <div class="pk-status" id="pk-step-${i}">
          <span class="pk-dot"></span>
          <span>${s.text}</span>
        </div>`).join("")}
    </div>

    <div class="pk-progress-wrap">
      <div class="pk-progress-bar" id="pk-bar"></div>
    </div>
  `;

  document.body.insertBefore(loader, document.body.firstChild);

  // Prevent scroll while loading
  document.body.style.overflow = "hidden";

  // ── Sequence ─────────────────────────────────────────────
  const bar = document.getElementById("pk-bar");

  function activate(index) {
    // Mark previous as done
    if (index > 0) {
      const prev = document.getElementById(`pk-step-${index - 1}`);
      if (prev) { prev.classList.remove("active"); prev.classList.add("done"); }
    }
    const el = document.getElementById(`pk-step-${index}`);
    if (el) el.classList.add("active");
    if (bar) bar.style.width = PROGRESS[index] + "%";
  }

  function exit() {
    bar.style.width = "100%";
    // Small pause at 100% then fade out
    setTimeout(() => {
      loader.classList.add("pk-exit");
      loader.addEventListener("animationend", () => {
        loader.remove();
        document.body.style.overflow = "";
        sessionStorage.setItem("pk_loaded", "1");
      }, { once: true });
    }, 300);
  }

  // Kick off the sequence
  let elapsed = 0;
  STEPS.forEach((step, i) => {
    setTimeout(() => activate(i), elapsed);
    elapsed += step.duration;
  });

  // Mark last step done + exit
  setTimeout(() => {
    const last = document.getElementById(`pk-step-${STEPS.length - 1}`);
    if (last) { last.classList.remove("active"); last.classList.add("done"); }
    exit();
  }, elapsed + 200);

})();
