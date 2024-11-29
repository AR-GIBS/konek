document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Mencegah reload halaman

  const input = document.getElementById("inputMember").value.toLowerCase().trim();
  const resultCard = document.getElementById("result");
  const memberName = document.getElementById("memberName");
  const memberNA = document.getElementById("memberNA");
  const principalSavings = document.getElementById("principalSavings");
  const mandatorySavings = document.getElementById("mandatorySavings");
  const totalSavings = document.getElementById("totalSavings");

  // Reset tampilan
  resultCard.classList.add("d-none");
  memberName.textContent = "";
  memberNA.textContent = "";
  principalSavings.textContent = "";
  mandatorySavings.textContent = "";
  totalSavings.textContent = "";

  try {
    // Fetch file CSV lokal
    const response = await fetch('./db_konek.csv');
    if (!response.ok) throw new Error("Gagal mengambil data dari file CSV");

    const data = await response.text();

    // Parse CSV menjadi array objek
    const rows = data.split("\n").map((row) => row.split(","));
    const headers = rows.shift(); // Ambil baris pertama sebagai header

    // Periksa apakah data CSV valid
    if (!headers || headers.length < 1) {
      throw new Error("Data CSV tidak valid");
    }

    const records = rows.map((row) => {
      const record = {};
      row.forEach((col, i) => {
        // Trim kolom dan pasangkan header dengan nilai yang sesuai
        record[headers[i].trim()] = col.trim();
      });
      return record;
    });

    // Cari anggota berdasarkan input (nama atau nomor anggota)
    const member = records.find(
      (record) =>
        record["Nama"]?.toLowerCase() === input || record["NA"]?.toLowerCase() === input
    );

    if (member) {
      // Tampilkan data anggota
      memberName.textContent = `Nama: ${member["Nama"]}`;
      memberNA.textContent = `Nomor Anggota (NA): ${member["NA"]}`;
      principalSavings.textContent = `Simpanan Pokok: ${member["Simpanan Pokok"]}`;
      mandatorySavings.textContent = `Simpanan Wajib: ${member["Simpanan Wajib"]}`;
      totalSavings.textContent = `Total Simpanan: ${member["Total Simpanan"]}`;
      resultCard.classList.remove("d-none");
    } else {
      alert("Anggota tidak ditemukan. Pastikan nama atau nomor anggota benar.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan. Periksa koneksi atau format data Anda.");
  }
});
