# Class Website - Theme Management System

Website profil kelas dengan sistem pengelolaan tema card yang tersimpan di database, sehingga perubahan tema terlihat oleh semua pengunjung.

## 🚀 Quick Start (Panduan Cepat)

**Baru pertama kali setup?** → Baca file **`SETUP_GUIDE.md`** untuk panduan lengkap step-by-step!

**Sudah setup sebelumnya?** → Langsung jalankan:
```bash
npm start
```
Kemudian buka: `http://localhost:3000`

## 🚀 Fitur

- ✅ Multiple tema card (Default, Bloody, Halloween, Christmas, Lightning, Ocean, Sunset, Dark, Neon)
- ✅ Tema tersimpan di database MySQL
- ✅ Real-time updates (polling setiap 5 detik)
- ✅ Fallback ke localStorage jika offline
- ✅ Admin card khusus untuk Natan dengan efek premium
- ✅ Responsive design

## 📋 Requirements

- **Node.js** (v14 atau lebih baru)
- **MySQL/MariaDB** (v5.7 atau lebih baru)
- **NPM** (Node Package Manager)

## 🔧 Setup Instructions

### 1. Install Dependencies

Buka terminal/command prompt di folder project dan jalankan:

```bash
npm install
```

Ini akan menginstall:
- express
- mysql2
- cors

### 2. Setup Database

#### Option A: Menggunakan MySQL langsung

1. Login ke MySQL:
```bash
mysql -u root -p
```

2. Buat database:
```sql
CREATE DATABASE class_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE class_website;
```

3. Import schema:
```bash
mysql -u root -p class_website < database.sql
```

Atau copy-paste isi file `database.sql` ke MySQL client.

#### Option B: Menggunakan phpMyAdmin atau tools lainnya

- Buat database baru dengan nama `class_website`
- Import file `database.sql` atau copy-paste query di dalamnya

### 3. Konfigurasi Database

Edit file `server.js` pada bagian database connection (baris 15-20):

```javascript
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',        // Ganti dengan username MySQL Anda
    password: process.env.DB_PASSWORD || '',     // Ganti dengan password MySQL Anda
    database: process.env.DB_NAME || 'class_website'
});
```

**ATAU** gunakan environment variables (lebih aman):

Buat file `.env` di folder project:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=class_website
PORT=3000
```

Dan install `dotenv` package:
```bash
npm install dotenv
```

Lalu tambahkan di awal `server.js`:
```javascript
require('dotenv').config();
```

### 4. Jalankan Server

```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

### 5. Akses Website

Buka browser dan kunjungi:
- **Website**: `http://localhost:3000`
- **API Health Check**: `http://localhost:3000/api/health`
- **API Get Themes**: `http://localhost:3000/api/themes`

## 📡 API Endpoints

### GET `/api/themes`
Mendapatkan semua tema siswa
```json
{
  "Alvano Darmansyah": "bloody",
  "Arthur Elshaddai Prasetyo": "lightning",
  ...
}
```

### GET `/api/themes/:studentName`
Mendapatkan tema untuk siswa tertentu
```json
{
  "theme": "bloody"
}
```

### POST `/api/themes`
Menyimpan/mengupdate tema
```json
{
  "student_name": "Alvano Darmansyah",
  "theme": "bloody"
}
```

Response:
```json
{
  "success": true,
  "message": "Theme saved successfully",
  "student_name": "Alvano Darmansyah",
  "theme": "bloody"
}
```

### GET `/api/themes/recent?minutes=5`
Mendapatkan perubahan tema dalam X menit terakhir (untuk polling)
```json
[
  {
    "student_name": "Alvano Darmansyah",
    "theme": "bloody",
    "updated_at": "2025-01-XX XX:XX:XX"
  }
]
```

### GET `/api/health`
Health check endpoint
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-01-XX..."
}
```

## 🌐 Deploy ke Production

### Option 1: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Add MySQL addon: `heroku addons:create cleardb:ignite`
5. Deploy: `git push heroku main`

### Option 2: Railway / Render

1. Connect GitHub repository
2. Add MySQL database
3. Set environment variables
4. Deploy automatically

### Option 3: VPS (Ubuntu/Debian)

1. Install Node.js dan MySQL
2. Clone project
3. Setup Nginx reverse proxy
4. Use PM2 untuk process manager:
```bash
npm install -g pm2
pm2 start server.js --name class-website
pm2 startup
pm2 save
```

### Update API URL di Frontend

Setelah deploy, update `API_BASE_URL` di `index.html` (baris ~3355):

```javascript
const API_BASE_URL = 'https://your-domain.com/api';
```

## 🎨 Tema yang Tersedia

1. **Default** - Tema standar
2. **Bloody** - Tema merah berdarah dengan efek tetesan
3. **Halloween** - Tema ungu-orange dengan hantu
4. **Christmas** - Tema hijau-merah dengan pohon natal
5. **Lightning** - Tema petir dengan efek kilat
6. **Ocean** - Tema biru lautan
7. **Sunset** - Tema merah-jingga-kuning
8. **Dark** - Tema gelap
9. **Neon** - Tema neon dengan efek glow

## 🔒 Security Notes

- Jangan commit file `.env` ke Git
- Gunakan environment variables untuk credentials
- Enable HTTPS di production
- Pertimbangkan rate limiting untuk API
- Validasi input di backend (sudah ada basic validation)

## 🐛 Troubleshooting

### Database connection error
- Pastikan MySQL service berjalan
- Check username/password
- Pastikan database sudah dibuat

### Themes tidak ter-load
- Check browser console untuk error
- Pastikan server berjalan
- Check CORS settings

### Real-time updates tidak bekerja
- Check polling interval (default 5 detik)
- Check network connection
- Check API endpoint `/api/themes/recent`

## 📝 License

ISC

## 👨‍💻 Support

Jika ada masalah, check:
1. Console browser (F12)
2. Server logs
3. Database connection

---

**Happy Coding! 🚀**

