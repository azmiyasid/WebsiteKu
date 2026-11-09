setupFormWA({
    opening: "Halo Azmi, saya ingin mengajak kerja sama (Partnership). Berikut detail saya:",
    closing: "Mohon balas jika tertarik. Terima kasih.",
    fields: [
        { name: "nama",   label: "Nama",              required: true },
        { name: "brand",  label: "Brand/Perusahaan",  required: true },
        { name: "jenis",  label: "Jenis kerja sama",  required: true },
        { name: "kontak", label: "Kontak (email/WA)", required: true },
        { name: "detail", label: "Detail kerja sama", required: false }
    ]
});
