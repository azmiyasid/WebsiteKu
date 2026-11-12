setupFormWA({
    opening: "Halo Azmi, saya ingin merekrut kamu (Hire Me). Berikut detail saya:",
    closing: "Mohon balas jika tertarik. Terima kasih.",
    fields: [
        { name: "nama",             label: "Name",                  required: true },
        { name: "perusahaan",       label: "Company/Organisation",  required: true },
        { name: "company-loc",      label: "Company Location",      required: true },
        { name: "company-sosmed",   label: "Company Social Media",  required: true },
        { name: "posisi",           label: "Open Position",         required: true },
        { name: "work-type",        label: "Work Type",             required: true },
        { name: "work-policy",      label: "Work Policy",           required: true },
        { name: "salary",           label: "Salary",                required: true },
        { name: "kontak",           label: "Contact (email/WA)",    required: true },
        { name: "pesan",            label: "Additional Message",    required: false }
    ]
});
