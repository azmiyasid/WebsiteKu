const NOMOR_WA = "6285815461002";

function setupFormWA(config) {
    const form = document.getElementById("form-wa");
    const sendBtn = document.getElementById("send-btn");
    const status = document.getElementById("form-status");
    let sent = false;

    const clearErrors = () => {
        form.querySelectorAll(".field.error").forEach((f) => f.classList.remove("error"));
    };

    const clean = (v) => v.trim().replace(/[ \t]+/g, " ");

    const buildMessage = (data) => {
        const lines = [config.opening, ""];
        config.fields.forEach((f) => {
            lines.push(`${f.label}: ${data[f.name] || "-"}`);
        });
        lines.push("", config.closing);
        return lines.join("\n");
    };

    form.addEventListener("input", (e) => {
        const wrap = e.target.closest(".field");
        if (wrap) wrap.classList.remove("error");
        status.textContent = "";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (sent) return;
        clearErrors();

        const data = {};
        let firstInvalid = null;

        config.fields.forEach((f) => {
            const el = form.elements[f.name];
            const value = clean(el.value);
            data[f.name] = value;

            let invalid = f.required && !value;
            if (!invalid && f.name === "kontak" && value && value.length < 5) invalid = true;

            if (invalid) {
                el.closest(".field").classList.add("error");
                if (!firstInvalid) firstInvalid = el;
            }
        });

        if (firstInvalid) {
            status.textContent = "Please complete the fields marked in red.";
            status.className = "form-status is-error";
            firstInvalid.focus();
            return;
        }

        sent = true;
        sendBtn.disabled = true;
        sendBtn.textContent = "Sent!";
        sendBtn.classList.add("is-sent");
        form.querySelectorAll("input, textarea").forEach((el) => (el.readOnly = true));
        form.querySelectorAll("select").forEach((el) => (el.disabled = true));

        status.textContent = "Redirecting to WhatsApp. Press send there to finish.";
        status.className = "form-status is-ok";

        const url = `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(buildMessage(data))}`;
        const win = window.open(url, "_blank", "noopener");
        if (!win) window.location.href = url;
    });
}
