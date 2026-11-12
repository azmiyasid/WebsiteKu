document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
    if (/index\.html$/.test(location.pathname)) {
        history.replaceState(null, "", location.pathname.replace(/index\.html$/, "") + location.search);
    }
    } catch (e) {}

    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const id = link.dataset.target;

            if (id === "top") {
                window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
                return;
            }

            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
            }
        });
    });
    

    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const sections = ["about", "portfolio", "service"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((l) =>
                l.classList.toggle("active", l.dataset.target === entry.target.id)
            );
        });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach((s) => spy.observe(s));

    const revealMap = [
        [".short-detail",                      "fx-slide-left",  0],
        [".mytombol",                          "fx-slide-right", 0],
        [".creator-trackrecord h1",            "fx-fade",        0],
        [".yt-image, .tiktok-image",           "fx-pop",         0],
        [".service-subtitle",                  "fx-fade",        0],
        [".freelance-service h1",              "fx-fade",        0],
        [".plan-card",                         "fx-pop",         0.12],
    ];

    document.querySelectorAll(".yt-acv, .tiktok-acv, .professional-acv").forEach((group) => {
        group.querySelectorAll(":scope > div").forEach((card, i) => {
            card.classList.add("reveal", i % 2 === 0 ? "fx-slide-left" : "fx-slide-right");
            card.style.setProperty("--d", `${i * 0.1}s`);
        });
    });

    revealMap.forEach(([selector, effect, gap]) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add("reveal", effect);
            if (gap) el.style.setProperty("--d", `${i * gap}s`);
        });
    });

    if (reduceMotion) {
        document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    } else {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle("is-visible", entry.isIntersecting);
            });
        }, { threshold: 0.2, rootMargin: "0px 0px -12% 0px" });

        document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    }

    const profession = document.querySelector(".profession");

    if (profession && !reduceMotion) {
        const words = [profession.textContent.trim(), "Content Creator", "Video Editor"];
        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const type = () => {
            const word = words[wordIndex];
            charIndex += deleting ? -1 : 1;
            profession.textContent = word.slice(0, charIndex);

            let delay = deleting ? 45 : 90;

            if (!deleting && charIndex === word.length) {
                deleting = true;
                delay = 1600;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 400;
            }
            setTimeout(type, delay);
        };

        profession.textContent = "";
        setTimeout(type, 600);
    }

    document.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn || reduceMotion) return;

        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const dot = document.createElement("span");

        dot.className = "ripple";
        dot.style.width = dot.style.height = `${size}px`;
        dot.style.left = `${e.clientX - rect.left - size / 2}px`;
        dot.style.top = `${e.clientY - rect.top - size / 2}px`;

        btn.appendChild(dot);
        dot.addEventListener("animationend", () => dot.remove());
    });

    document.querySelectorAll("button[data-href]").forEach((btn) => {
        btn.addEventListener("click", () => {
            setTimeout(() => { window.location.href = btn.dataset.href; }, reduceMotion ? 0 : 180);
        });
    });
});

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".play-button");
    if (!btn) return;
    const video = btn.parentElement.querySelector("video");
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
});

const syncPlayButton = (e) => {
    const video = e.target;
    if (!(video instanceof HTMLVideoElement)) return;
    const btn = video.parentElement.querySelector(".play-button");
    if (!btn) return;
    const playing = !video.paused;
    btn.textContent = playing ? "\u23F8 Pause" : "\u25B6 Play";
    btn.classList.toggle("is-playing", playing);
};

["play", "pause", "ended"].forEach((type) => document.addEventListener(type, syncPlayButton, true));

document.addEventListener("play", (e) => {
    if (!(e.target instanceof HTMLVideoElement)) return;
    document.querySelectorAll(".video-frame video").forEach((v) => {
        if (v !== e.target) v.pause();
    });
}, true);