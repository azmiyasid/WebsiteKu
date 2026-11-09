const PAKET = {
    free: "Free Edit (Rp 0)",
    pro: "Pro Edit (Rp 100.000)",
    perfect: "Perfect Edit (Rp 135.000)"
};

const paketDipilih = PAKET[new URLSearchParams(window.location.search).get("paket")];
if (paketDipilih) {
    document.getElementById("paket").value = paketDipilih;
}

setupFormWA({
    opening: "Halo Azmi, saya ingin memesan jasa edit video (Freelance). Berikut detail saya:",
    closing: "Mohon info ketersediaan dan estimasi pengerjaan. Terima kasih.",
    fields: [
        { name: "nama",     label: "Nama",                 required: true },
        { name: "paket",    label: "Paket",                required: true },
        { name: "durasi",   label: "Durasi video (menit)", required: true },
        { name: "kontak",   label: "Kontak (email/WA)",    required: true },
        { name: "brief",    label: "Link bahan/brief",     required: false }
    ]
});
