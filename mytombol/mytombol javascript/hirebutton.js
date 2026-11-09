setupFormWA({
    opening: "Halo Azmi, saya ingin merekrut kamu (Hire Me). Berikut detail saya:",
    closing: "Mohon balas jika tertarik. Terima kasih.",
    fields: [
        { name: "nama",       label: "Nama",                required: true },
        { name: "perusahaan", label: "Perusahaan/Instansi", required: true },
        { name: "posisi",     label: "Posisi yang dibuka",  required: true },
        { name: "kontak",     label: "Kontak (email/WA)",   required: true },
        { name: "pesan",      label: "Pesan tambahan",      required: false }
    ]
});
