setupFormWA({
    opening: "Halo Azmi, saya ingin memberikan feedback tentang website Anda. Berikut detailnya:",
    closing: "Terima kasih atas masukan Anda.",
    fields: [
        { name: "nama",             label: "Name",                                          required: true },
        { name: "masalah",          label: "Problem",                                       required: true },
        { name: "jenis",            label: "Buttons or elements causing problems",          required: true },
        { name: "priority",         label: "Priority level",                                required: true },
        { name: "detail",           label: "Feedback details",                              required: false }
    ]
});
