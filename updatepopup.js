(() => {
    const POPUP_IMAGE = "picture/popupdate.png";
    const POPUP_ALT = "Latest updates and announcements";
    const STORAGE_KEY = "popupHiddenOnDate";

    const todayString = () => {
        const d = new Date();
        const pad = (n) => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    };

    const isHiddenToday = () => {
        try { return localStorage.getItem(STORAGE_KEY) === todayString(); }
        catch (e) { return false; }
    };

    const hideForToday = () => {
        try { localStorage.setItem(STORAGE_KEY, todayString()); }
        catch (e) {  }
    };

    const showPopup = (img) => {
        const dialog = document.createElement("dialog");
        dialog.className = "update-popup";
        dialog.setAttribute("aria-label", "Updates and announcements");
        dialog.innerHTML = `
            <div class="update-popup__media"></div>
            <div class="update-popup__actions">
                <button type="button" class="update-popup__btn" data-action="today">CLOSE TODAY</button>
                <button type="button" class="update-popup__btn update-popup__btn--primary" data-action="once" autofocus>CLOSE THIS TIME</button>
            </div>`;
        dialog.querySelector(".update-popup__media").appendChild(img);
        document.body.appendChild(dialog);

        dialog.addEventListener("click", (e) => {
            const action = e.target.dataset && e.target.dataset.action;
            if (action === "today") hideForToday();
            if (action === "today" || action === "once" || e.target === dialog) dialog.close();
        });

        dialog.addEventListener("close", () => {
            document.documentElement.classList.remove("update-open");
            dialog.remove();
        });

        document.documentElement.classList.add("update-open");
        dialog.showModal();
    };

    const init = () => {
        if (typeof HTMLDialogElement === "undefined" || isHiddenToday()) return;
        const img = new Image();
        img.className = "update-popup__image";
        img.alt = POPUP_ALT;
        img.onload = () => showPopup(img);
        img.src = POPUP_IMAGE;
    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
