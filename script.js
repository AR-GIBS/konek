document.getElementById("searchButton").addEventListener("click", function () {
    const nameInput = document.getElementById("nameInput").value.trim().toLowerCase();
    const resultDiv = document.getElementById("result");

    if (!nameInput) {
        resultDiv.textContent = "Masukkan nama terlebih dahulu!";
        return;
    }

    fetch("db_konek.xlsx")
        .then((response) => response.arrayBuffer())
        .then((data) => {
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            const match = jsonData.find(
                (row) => row.Nama && row.Nama.toLowerCase() === nameInput
            );

            if (match) {
                resultDiv.innerHTML = `
                    <p>Nama: ${match.Nama}</p>
                    <p>Simpanan Pokok: ${match["Simpanan Pokok"]}</p>
                    <p>Simpanan Wajib: ${match["Simpanan Wajib"]}</p>
                    <p>Total Simpanan: ${match["Total Simpanan"]}</p>
                `;
            } else {
                resultDiv.textContent = "Nama tidak ditemukan!";
            }
        })
        .catch((error) => {
            console.error("Error loading Excel file:", error);
            resultDiv.textContent = "Terjadi kesalahan saat membaca file.";
        });
});
