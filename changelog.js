(() => {
    const STORAGE_KEY = "changelog_seen_version";
    const AUTO_OPEN_DELAY = 800;

    const init = () => {
        const modal = document.getElementById("changelogModal");
        if (!modal) return;

        const CURRENT_VERSION = modal.dataset.version || "v4.1.0";
        const openBtn = document.getElementById("openChangelogBtn");
        const closeIcon = document.getElementById("closeModalIcon");
        const confirmBtn = document.getElementById("confirmReadBtn");
        const unreadDot = document.getElementById("unreadDot");
        let lastFocus = null;

        const readSeen = () => {
            try { return localStorage.getItem(STORAGE_KEY); }
            catch (e) { return null; }
        };

        const saveSeen = () => {
            try { localStorage.setItem(STORAGE_KEY, CURRENT_VERSION); }
            catch (e) {  }
        };

        const hideDot = () => { if (unreadDot) unreadDot.style.display = "none"; };

        const openModal = () => {
            lastFocus = document.activeElement;
            modal.classList.add("active");
            document.documentElement.classList.add("changelog-open");
            setTimeout(() => { (confirmBtn || closeIcon || modal).focus(); }, 60);
        };

        const closeModal = () => {
            if (!modal.classList.contains("active")) return;
            modal.classList.remove("active");
            document.documentElement.classList.remove("changelog-open");
            saveSeen();
            hideDot();
            if (lastFocus && lastFocus !== document.body && document.contains(lastFocus)) lastFocus.focus();
        };

        if (readSeen() !== CURRENT_VERSION) setTimeout(openModal, AUTO_OPEN_DELAY);
        else hideDot();

        if (openBtn) openBtn.addEventListener("click", openModal);
        if (closeIcon) closeIcon.addEventListener("click", closeModal);
        if (confirmBtn) confirmBtn.addEventListener("click", closeModal);

        modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

        document.addEventListener("keydown", (e) => {
            if (!modal.classList.contains("active")) return;
            if (e.key === "Escape") { closeModal(); return; }
            if (e.key !== "Tab") return;

            const items = [...modal.querySelectorAll("button, a[href]")].filter((el) => !el.disabled && el.offsetParent !== null);
            if (!items.length) return;
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });
    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();