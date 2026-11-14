(() => {
    const cards = [...document.querySelectorAll(".cv-card")];
    if (!cards.length || typeof HTMLDialogElement === "undefined") return;

    const slug = (text) => text.trim().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");

    const dialog = document.createElement("dialog");
    dialog.className = "cv-modal";
    dialog.setAttribute("aria-labelledby", "cv-modal-title");
    dialog.innerHTML = `
        <div class="cv-modal__bar">
            <p class="cv-modal__count"></p>
            <button type="button" class="cv-modal__close" aria-label="Close">&times;</button>
        </div>
        <div class="cv-modal__body">
            <h2 class="cv-modal__title" id="cv-modal-title"></h2>
            <p class="cv-modal__intro"></p>
        </div>
        <div class="cv-modal__footer">
            <div class="cv-modal__nav">
                <button type="button" class="cv-modal__prev" aria-label="Previous CV">&larr;</button>
                <button type="button" class="cv-modal__next" aria-label="Next CV">&rarr;</button>
            </div>
            <a class="cv-modal__download">Download CV</a>
        </div>`;
    document.body.appendChild(dialog);

    const count = dialog.querySelector(".cv-modal__count");
    const title = dialog.querySelector(".cv-modal__title");
    const intro = dialog.querySelector(".cv-modal__intro");
    const download = dialog.querySelector(".cv-modal__download");
    let current = 0;
    let lastTrigger = null;

    const setAvailable = (available, file, name) => {
        download.classList.toggle("is-disabled", !available);
        if (available) {
            download.href = file;
            download.setAttribute("download", name);
            download.removeAttribute("aria-disabled");
            download.textContent = "Download CV";
        } else {
            download.removeAttribute("href");
            download.removeAttribute("download");
            download.setAttribute("aria-disabled", "true");
            download.textContent = "Coming soon";
        }
    };

    const show = (index) => {
        current = (index + cards.length) % cards.length;
        const card = cards[current];
        const role = card.dataset.cvTitle;
        const file = card.dataset.cvFile;
        const name = `CV-Azmi-Yasid-Alfarisi-${slug(role)}.pdf`;
        const token = current;

        count.textContent = `${current + 1} / ${cards.length}`;
        title.textContent = `${role} CV`;
        intro.textContent = card.dataset.cvIntro;
        setAvailable(true, file, name);

        fetch(file, { method: "HEAD", cache: "no-store" })
            .then((res) => { if (token === current && !res.ok) setAvailable(false); })
            .catch(() => {  });
    };

    cards.forEach((card, i) => {
        card.addEventListener("click", () => {
            lastTrigger = card;
            show(i);
            document.documentElement.classList.add("cv-open");
            dialog.showModal();
        });
    });

    dialog.querySelector(".cv-modal__prev").addEventListener("click", () => show(current - 1));
    dialog.querySelector(".cv-modal__next").addEventListener("click", () => show(current + 1));
    dialog.querySelector(".cv-modal__close").addEventListener("click", () => dialog.close());
    download.addEventListener("click", (e) => { if (download.classList.contains("is-disabled")) e.preventDefault(); });
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") show(current - 1);
        if (e.key === "ArrowRight") show(current + 1);
    });
    dialog.addEventListener("close", () => {
        document.documentElement.classList.remove("cv-open");
        if (lastTrigger) lastTrigger.focus();
    });
})();
