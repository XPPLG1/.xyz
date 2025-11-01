# 🔧 Perbaiki Koneksi Database

## ❌ Masalah: Database Disconnected

Jika Anda melihat `{"status":"unhealthy", "database":"disconnected"}` di `/api/health`, berarti database belum terhubung.

## ✅ Solusi Step-by-Step:

### **STEP 1: Pastikan MySQL Service Berjalan**

#### **A. Cek Service MySQL**

1. Tekan **Windows + R**
2. Ketik: `services.msc`
3. Tekan Enter
4. Cari **MySQL** atau **MySQL80** atau **MySQL57** (tergantung versi)
5. **Pastikan status = "Running"**
6. Jika **"Stopped"**, klik kanan → **Start**

#### **B. Cek via Command Prompt**

```cmd
sc query MySQL80
```

Atau:
```cmd
sc query MySQL57
```

Jika tidak running, jalankan:
```cmd
net start MySQL80
```

---

### **STEP 2: Setup Database MySQL**

#### **A. Buka MySQL Command Line**

1. Buka **Command Prompt** (CMD)
2. Jalankan:
   ```cmd
   mysql -u root -p
   ```
3. Masukkan **password MySQL** Anda
   - Jika tidak ada password, tekan Enter saja
   - Jika ada password, ketik password lalu Enter

#### **B. Buat Database**

Setelah masuk ke MySQL, jalankan perintah ini **satu per satu**:

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

-- Verifikasi
SHOW TABLES;
```

Jika berhasil, akan muncul:
```
+------------------------+
| Tables_in_class_website|
+------------------------+
| student_themes          |
+------------------------+
```

#### **C. Keluar dari MySQL**

```sql
exit;
```

---

### **STEP 3: Konfigurasi Database di server.js**

1. Buka file **`server.js`** dengan text editor

2. Cari bagian ini (sekitar baris 15-20):
   ```javascript
   const db = mysql.createConnection({
       host: process.env.DB_HOST || 'localhost',
       user: process.env.DB_USER || 'root',
       password: process.env.DB_PASSWORD || '',
       database: process.env.DB_NAME || 'class_website'
   });
   ```

3. **Edit sesuai MySQL Anda**:

   **Jika TIDAK ada password**:
   ```javascript
   user: 'root',
   password: '',          // Kosong
   ```

   **Jika ADA password**:
   ```javascript
   user: 'root',          // Ganti jika username berbeda
   password: 'password123', // Ganti dengan password MySQL Anda
   ```

   **Jika username berbeda**:
   ```javascript
   user: 'username_anda',  // Ganti dengan username MySQL Anda
   password: 'password_anda', // Ganti dengan password MySQL Anda
   ```

4. **Save file** (Ctrl+S)

---

### **STEP 4: Test Koneksi Database**

#### **A. Test Manual di MySQL**

Buka MySQL dan jalankan:
```sql
USE class_website;
SELECT * FROM student_themes;
```

Jika muncul table kosong (tanpa error), database OK!

#### **B. Test via Server**

1. **Restart server** (jika sudah running):
   - Di Command Prompt yang menjalankan server, tekan **Ctrl+C**
   - Jalankan lagi: `npm start`

2. **Cek di browser**:
   - Buka: `http://localhost:3000/api/health`
   - Harus muncul: `{"status":"healthy", "database":"connected", ...}`

---

### **STEP 5: Jika Masih Error**

#### **Error: "Access denied for user"**

**Solusi 1**: Cek username/password di `server.js`

**Solusi 2**: Buat user baru di MySQL:
```sql
CREATE USER 'class_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON class_website.* TO 'class_user'@'localhost';
FLUSH PRIVILEGES;
```

Lalu update `server.js`:
```javascript
user: 'class_user',
password: 'password123',
```

#### **Error: "Unknown database"**

**Solusi**: Database belum dibuat
- Ikuti **STEP 2** untuk buat database
- Pastikan nama database di `server.js` sama: `class_website`

#### **Error: "Can't connect to MySQL server"**

**Solusi 1**: MySQL service tidak running
- Ikuti **STEP 1** untuk start MySQL service

**Solusi 2**: Port MySQL berbeda
- Default: port 3306
- Cek di MySQL configuration atau edit `server.js`:
  ```javascript
  host: 'localhost',
  port: 3306,  // Tambahkan jika port berbeda
  ```

#### **Error: "ECONNREFUSED"**

**Solusi**: MySQL tidak mendengarkan di localhost
- Cek MySQL configuration
- Pastikan MySQL service running

---

## ✅ Checklist Perbaikan

Tandai setelah selesai:

- [ ] MySQL service running (cek di services.msc)
- [ ] Database `class_website` sudah dibuat
- [ ] Table `student_themes` sudah dibuat
- [ ] Konfigurasi di `server.js` sudah benar (username/password)
- [ ] Server sudah di-restart setelah edit `server.js`
- [ ] Test `/api/health` menunjukkan `"database":"connected"`

---

## 🎯 Quick Fix Command

**Jika ingin cepat, jalankan semua ini di Command Prompt**:

```cmd
REM 1. Start MySQL service
net start MySQL80

REM 2. Masuk ke MySQL dan setup database
mysql -u root -p < database.sql
```

Atau jika tidak ada password:
```cmd
mysql -u root < database.sql
```

---

## 📞 Masih Ada Masalah?

Jika masih error setelah semua langkah:

1. **Cek error di Command Prompt** saat server start
   - Pastikan pesan error lengkap
   - Screenshot error jika perlu

2. **Cek MySQL logs** (opsional):
   - Lokasi: `C:\ProgramData\MySQL\MySQL Server X.X\Data\*.err`

3. **Test koneksi manual**:
   ```cmd
   mysql -u root -p
   ```
   Jika bisa masuk, berarti MySQL OK, tinggal konfigurasi di `server.js`

---

**Setelah database terhubung, API akan menunjukkan `"database":"connected"`! 🎉**

