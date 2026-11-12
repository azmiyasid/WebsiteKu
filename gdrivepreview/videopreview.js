(() => {
    const ID_RE = /^[\w-]+$/;
    const folderView = (id) => `https://drive.google.com/embeddedfolderview?id=${encodeURIComponent(id)}#grid`;
    const filePreview = (id) => `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;
    const folderPage = (id) => `https://drive.google.com/drive/folders/${encodeURIComponent(id)}`;

    const init = () => {
        const cards = document.querySelectorAll("[data-folder]");
        if (!cards.length || typeof HTMLDialogElement === "undefined") return;

        const dialog = document.createElement("dialog");
        dialog.className = "video-modal";
        dialog.setAttribute("aria-labelledby", "video-modal-title");
        dialog.innerHTML = `
            <div class="video-modal__bar">
                <h2 class="video-modal__title" id="video-modal-title"></h2>
                <a class="video-modal__open" target="_blank" rel="noopener">Open in Google Drive</a>
                <button type="button" class="video-modal__close" aria-label="Close preview">&times;</button>
            </div>
            <div class="video-modal__tabs" hidden></div>
            <iframe class="video-modal__frame" title="Google Drive preview" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
        document.body.appendChild(dialog);

        const title = dialog.querySelector(".video-modal__title");
        const openLink = dialog.querySelector(".video-modal__open");
        const closeBtn = dialog.querySelector(".video-modal__close");
        const tabs = dialog.querySelector(".video-modal__tabs");
        const frame = dialog.querySelector(".video-modal__frame");
        let lastTrigger = null;

        const showVideo = (id, activeBtn) => {
            tabs.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === activeBtn)));
            frame.src = filePreview(id);
        };

        const openPreview = (card) => {
            const folder = card.dataset.folder;
            if (!ID_RE.test(folder || "")) return;
            const videos = (card.dataset.videos || "").split(",").map((s) => s.trim()).filter((s) => ID_RE.test(s));

            title.textContent = (card.querySelector("h2") || card).textContent.trim();
            openLink.href = folderPage(folder);
            tabs.replaceChildren();

            if (videos.length) {
                tabs.hidden = false;
                videos.forEach((id, i) => {
                    const btn = document.createElement("button");
                    btn.type = "button";
                    btn.textContent = `Video ${i + 1}`;
                    btn.addEventListener("click", () => showVideo(id, btn));
                    tabs.appendChild(btn);
                });
                showVideo(videos[0], tabs.firstElementChild);
            } else {
                tabs.hidden = true;
                frame.src = folderView(folder);
            }

            lastTrigger = card;
            document.documentElement.classList.add("modal-open");
            dialog.showModal();
        };

        cards.forEach((card) => {
            card.setAttribute("role", "button");
            card.tabIndex = 0;
            card.addEventListener("click", () => openPreview(card));
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPreview(card); }
            });
        });

        closeBtn.addEventListener("click", () => dialog.close());
        dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
        dialog.addEventListener("close", () => {
            if (dialog.open) return;
            frame.src = "about:blank";
            document.documentElement.classList.remove("modal-open");
            if (lastTrigger) lastTrigger.focus();
        });
    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
