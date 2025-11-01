# 📖 Panduan Setup Lengkap - Dari Awal

Panduan ini akan membimbing Anda untuk setup website dari awal hingga bisa berjalan.

## 🎯 Prerequisites (Yang Harus Ada)

Sebelum mulai, pastikan Anda sudah install:

1. **Node.js** (v14 atau lebih baru)
   - Download: https://nodejs.org/
   - Install seperti biasa
   - Cek install: buka Command Prompt/PowerShell, ketik: `node -v`
   - Harus muncul versi Node.js (contoh: v18.17.0)

2. **MySQL/MariaDB**
   - Download MySQL: https://dev.mysql.com/downloads/mysql/
   - Atau MariaDB: https://mariadb.org/download/
   - Install seperti biasa
   - Pastikan MySQL service berjalan

3. **Text Editor** (opsional)
   - Visual Studio Code: https://code.visualstudio.com/
   - Atau Notepad++ atau editor lain

## 📝 Langkah-Langkah Setup

### **STEP 1: Cek Folder Project**

Pastikan Anda ada di folder yang benar:
```
C:\Users\USER\Desktop\CODING\TRY
```

Folder ini harus berisi:
- `index.html`
- `server.js`
- `package.json`
- `database.sql`
- Folder `images/`

### **STEP 2: Install Dependencies**

1. Buka **Command Prompt** atau **PowerShell**
2. Masuk ke folder project:
   ```bash
   cd C:\Users\USER\Desktop\CODING\TRY
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

   Ini akan menginstall:
   - express
   - mysql2
   - cors

4. Tunggu hingga selesai (biasanya 30 detik - 2 menit)

5. **Cek apakah berhasil**: Harus ada folder `node_modules` muncul

### **STEP 3: Setup Database MySQL**

#### **A. Buka MySQL**

1. Buka **Command Prompt** atau **MySQL Workbench** atau **phpMyAdmin**

2. Login ke MySQL:
   ```bash
   mysql -u root -p
   ```
   Masukkan password MySQL Anda (biasanya kosong atau password yang Anda set)

#### **B. Buat Database**

Jalankan perintah SQL berikut satu per satu:

```sql
-- Buat database
CREATE DATABASE IF NOT EXISTS class_website 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Pilih database
USE class_website;

-- Buat table
CREATE TABLE IF NOT EXISTS student_themes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL UNIQUE,
    theme VARCHAR(50) NOT NULL DEFAULT 'default',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    INDEX idx_student_name (student_name),
    INDEX idx_updated_at (updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**ATAU** gunakan cara lebih mudah:

1. Buka file `database.sql` di text editor
2. Copy semua isinya
3. Paste ke MySQL client (Workbench, phpMyAdmin, atau Command Prompt)
4. Execute/Run

#### **C. Verifikasi Database**

Cek apakah table sudah dibuat:

```sql
USE class_website;
SHOW TABLES;
SHOW COLUMNS FROM student_themes;
```

Harus muncul table `student_themes`.

### **STEP 4: Konfigurasi Database di Server**

1. Buka file `server.js` dengan text editor

2. Cari bagian database connection (sekitar baris 15-20):

```javascript
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',        // 👈 GANTI INI
    password: process.env.DB_PASSWORD || '',    // 👈 GANTI INI
    database: process.env.DB_NAME || 'class_website'
});
```

3. **Edit sesuai MySQL Anda**:
   - `user`: biasanya `'root'` (biarkan jika belum ubah)
   - `password`: masukkan password MySQL Anda (kosongkan jika tidak ada password)
   - `database`: `'class_website'` (biarkan)

   Contoh:
   ```javascript
   user: 'root',           // Jika username MySQL Anda adalah root
   password: '',           // Jika tidak ada password
   // atau
   password: 'mypassword', // Jika password MySQL Anda adalah mypassword
   ```

4. **Save file** (Ctrl+S)

### **STEP 5: Jalankan Server**

1. Pastikan masih di folder project di Command Prompt:
   ```bash
   cd C:\Users\USER\Desktop\CODING\TRY
   ```

2. Jalankan server:
   ```bash
   npm start
   ```

3. **Jika berhasil**, akan muncul:
   ```
   ✅ Database connected successfully!
   ✅ Database table ready
   🚀 Server running on http://localhost:3000
   📊 API endpoints available at http://localhost:3000/api
   ```

4. **Jangan tutup Command Prompt ini!** (Server harus tetap running)

### **STEP 6: Buka Website**

1. Buka browser (Chrome, Firefox, Edge, dll)

2. Ketik di address bar:
   ```
   http://localhost:3000
   ```

3. Website harus terbuka dan menampilkan halaman kelas

4. Test apakah API bekerja:
   - Buka: `http://localhost:3000/api/health`
   - Harus muncul JSON: `{"status":"healthy","database":"connected",...}`

### **STEP 7: Test Fitur Tema**

1. Scroll ke bagian "Anggota Kelas X PPLG 1"

2. Hover pada card siswa (bukan wali kelas atau Natan)

3. Akan muncul tombol **🎨** di pojok kanan atas card

4. Klik tombol **🎨**

5. Pilih tema (misalnya: Bloody, Halloween, dll)

6. Tema akan langsung terpasang pada card tersebut

7. **Cek database**: Buka MySQL dan jalankan:
   ```sql
   USE class_website;
   SELECT * FROM student_themes;
   ```
   Harus muncul data tema yang baru disimpan!

8. **Test di browser lain**: Buka `http://localhost:3000` di browser lain atau tab baru, tema harus terlihat sama!

## 🐛 Troubleshooting

### **Error: "Cannot find module 'express'"**
**Solusi**: Jalankan `npm install` lagi

### **Error: "Access denied for user 'root'@'localhost'"**
**Solusi**: 
- Cek username dan password di `server.js`
- Pastikan MySQL service berjalan
- Coba restart MySQL service

### **Error: "Unknown database 'class_website'"**
**Solusi**: 
- Pastikan database sudah dibuat (lihat STEP 3)
- Cek nama database di `server.js` harus sama

### **Website tidak terbuka di browser**
**Solusi**: 
- Pastikan server masih running (Command Prompt masih terbuka)
- Cek apakah ada error di Command Prompt
- Coba restart server: tekan `Ctrl+C`, lalu `npm start` lagi

### **Tema tidak tersimpan ke database**
**Solusi**: 
- Buka browser Console (F12)
- Cek apakah ada error merah
- Pastikan API endpoint bisa diakses: `http://localhost:3000/api/health`

### **Port 3000 sudah digunakan**
**Solusi**: 
- Ubah port di `server.js` (baris terakhir):
  ```javascript
  const PORT = process.env.PORT || 3001; // Ganti jadi 3001 atau angka lain
  ```
- Atau tutup aplikasi lain yang menggunakan port 3000

## ✅ Checklist Setup

Tandai setelah selesai:

- [ ] Node.js terinstall (`node -v` berhasil)
- [ ] MySQL terinstall dan running
- [ ] Dependencies terinstall (`npm install` berhasil)
- [ ] Database `class_website` dibuat
- [ ] Table `student_themes` dibuat
- [ ] Konfigurasi database di `server.js` sudah benar
- [ ] Server berjalan (`npm start` berhasil)
- [ ] Website terbuka di `http://localhost:3000`
- [ ] API health check berhasil (`/api/health`)
- [ ] Fitur tema bisa digunakan
- [ ] Tema tersimpan ke database

## 🎉 Selesai!

Jika semua checklist terisi, website Anda sudah siap digunakan!

**Tips**:
- Server harus tetap running saat menggunakan website
- Jika ada error, cek Console browser (F12) dan Command Prompt
- Semua perubahan tema tersimpan otomatis ke database
- Tema akan terlihat sama untuk semua pengunjung

## 📞 Butuh Bantuan?

Jika masih ada masalah, cek:
1. **Console Browser** (F12) - untuk error JavaScript
2. **Command Prompt** - untuk error server/database
3. **MySQL** - untuk masalah database

---

**Happy Coding! 🚀**

