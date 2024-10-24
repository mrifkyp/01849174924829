const express = require('express');
const app = express();

// Fungsi untuk menghitung waktu dalam format detik (00.00 Seconds)
function formatTimeTaken(startTime) {
    const timeTakenMs = Date.now() - startTime;
    const timeTakenSec = (timeTakenMs / 1000).toFixed(2); // Ubah ms ke detik dengan 2 angka desimal
    return `${timeTakenSec} Seconds`;
}

// Endpoint untuk mendekode parameter 'r' secara langsung
app.get('/decode', (req, res) => {
    const startTime = Date.now(); // Mulai menghitung waktu
    const rParam = req.query.r;

    if (!rParam) {
        const timeTaken = formatTimeTaken(startTime);
        return res.status(400).json({
            error: "Parameter 'r' tidak ditemukan dalam URL.",
            status: "Failed",
            time_taken: timeTaken
        });
    }

    try {
        // Dekode Base64
        const decoded = Buffer.from(rParam, 'base64').toString('utf-8');
        const timeTaken = formatTimeTaken(startTime);

        return res.json({
            decoded_url: decoded,
            status: "Success",
            time_taken: timeTaken
        });
    } catch (error) {
        const timeTaken = formatTimeTaken(startTime);
        return res.status(500).json({
            error: "Bypass Failed",
            status: "Failed",
            time_taken: timeTaken
        });
    }
});

// Port untuk pengembangan lokal
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
