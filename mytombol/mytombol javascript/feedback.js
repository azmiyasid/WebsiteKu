setupFormWA({
    opening: "Halo Azmi, saya", name: "nama", opening: "ingin memberikan feedback tentang website Anda. Berikut detail saya:",
    closing: "Terima kasih atas masukan Anda.",
    fields: [
        { name: "masalah", label: "Problem", required: true },
        { name: "jenis", label: "Buttons or elements causing problems", required: true },
        { name: "priority", label: "Priority level", required: true },
        { name: "detail", label: "Feedback details", required: false }
    ]
});
