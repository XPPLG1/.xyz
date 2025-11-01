# 🚀 Cara Mempublish Website Kelas X PPLG 1

Website ini adalah **Full-Stack Application** (Node.js + Express + MySQL), jadi cara publishnya berbeda dari static website biasa.

## ⚠️ Yang Diperlukan

1. **Hosting yang support Node.js** (bukan static hosting seperti Netlify/Vercel)
2. **Database MySQL/MariaDB** (atau database cloud)
3. **File upload** (untuk images)

---

## 📌 Opsi 1: Railway.app (Paling Mudah & Gratis)

Railway menyediakan hosting Node.js + MySQL gratis dengan setup mudah.

### **Langkah-langkah:**

#### **A. Persiapan**

1. **Buat akun Railway:**
   - Buka https://railway.app
   - Daftar dengan GitHub (paling mudah)

2. **Buat Repository GitHub:**
   - Upload semua file ke GitHub
   - Buat file `.gitignore` (jika belum ada):
     ```
     node_modules/
     .env
     *.log
     ```

#### **B. Deploy ke Railway**

1. **Login ke Railway Dashboard**

2. **New Project → Deploy from GitHub repo**
   - Pilih repository Anda

3. **Add MySQL Database:**
   - Klik **"+ New"** → **"Database"** → **"Add MySQL"**
   - Railway akan membuat database otomatis

4. **Setup Environment Variables:**
   - Di tab **Variables**, tambahkan:
     ```
     DB_HOST=containers-us-west-xxx.railway.app
     DB_USER=root
     DB_PASSWORD=password_dari_railway
     DB_NAME=railway
     PORT=3000
     ```
   - Semua info ini ada di tab **MySQL** Railway

5. **Deploy:**
   - Railway akan otomatis detect `package.json` dan install dependencies
   - Website akan live dalam 1-2 menit!

#### **Keuntungan:**
- ✅ Gratis $5 credit per bulan
- ✅ MySQL database gratis
- ✅ SSL otomatis (HTTPS)
- ✅ Auto-deploy dari GitHub
- ✅ Domain gratis (.railway.app)

---

## 📌 Opsi 2: Render.com (Gratis & Mudah)

Render juga menyediakan hosting Node.js + PostgreSQL/MySQL gratis.

### **Langkah-langkah:**

#### **A. Deploy Web Service**

1. **Buat akun:** https://render.com

2. **New → Web Service**
   - Connect GitHub repository
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=3000
   ```

#### **B. Setup Database**

1. **New → PostgreSQL** (atau MySQL jika tersedia)
   - Render akan buat database otomatis

2. **Ambil connection info:**
   - Database URL akan diberikan
   - Update environment variables di Web Service:
     ```
     DB_HOST=xxxxx
     DB_USER=xxxxx
     DB_PASSWORD=xxxxx
     DB_NAME=xxxxx
     ```

#### **Keuntungan:**
- ✅ Free tier cukup untuk personal use
- ✅ SSL otomatis
- ✅ Auto-deploy dari GitHub
- ✅ Domain gratis (.onrender.com)

---

## 📌 Opsi 3: Heroku (Classic & Terpercaya)

Heroku adalah platform PaaS yang sudah lama dan terpercaya.

### **Langkah-langkah:**

#### **A. Install Heroku CLI**

1. Download: https://devcenter.heroku.com/articles/heroku-cli
2. Install seperti biasa

#### **B. Setup Project**

1. **Login Heroku:**
   ```bash
   heroku login
   ```

2. **Buat aplikasi:**
   ```bash
   cd C:\Users\USER\Desktop\CODING\TRY
   heroku create nama-aplikasi-anda
   ```

3. **Add MySQL Database:**
   ```bash
   heroku addons:create cleardb:ignite
   ```
   (ClearDB adalah MySQL gratis untuk Heroku)

4. **Setup Environment Variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set PORT=3000
   ```
   
   Untuk database, ambil connection info:
   ```bash
   heroku config:get CLEARDB_DATABASE_URL
   ```
   
   Parse URL tersebut dan set:
   ```bash
   heroku config:set DB_HOST=xxxxx
   heroku config:set DB_USER=xxxxx
   heroku config:set DB_PASSWORD=xxxxx
   heroku config:set DB_NAME=xxxxx
   ```

5. **Deploy:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

#### **Keuntungan:**
- ✅ Terpercaya dan stabil
- ✅ Add-ons database mudah
- ✅ Free tier tersedia (dengan batasan)

---

## 📌 Opsi 4: DigitalOcean App Platform

DigitalOcean menyediakan platform deploy yang modern.

### **Langkah-langkah:**

1. **Buat akun:** https://www.digitalocean.com

2. **Create App → GitHub**
   - Connect repository
   - Auto-detect Node.js

3. **Add Database:**
   - Klik **"Resources"** → **"Add Resource"** → **"Database"**
   - Pilih MySQL

4. **Setup Environment Variables:**
   - Masukkan database credentials yang diberikan

5. **Deploy:**
   - DigitalOcean akan otomatis build dan deploy

#### **Keuntungan:**
- ✅ Modern platform
- ✅ Auto-scaling
- ✅ Database terintegrasi

---

## 📌 Opsi 5: VPS/Cloud Server (Lebih Fleksibel)

Jika Anda punya VPS (misalnya DigitalOcean Droplet, AWS EC2, dll):

### **Langkah-langkah:**

#### **A. Setup Server**

1. **SSH ke server:**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js & MySQL:**
   ```bash
   # Install Node.js (via nvm)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 18
   nvm use 18
   
   # Install MySQL
   sudo apt update
   sudo apt install mysql-server
   ```

3. **Setup Database:**
   ```bash
   sudo mysql
   CREATE DATABASE class_website;
   CREATE USER 'webuser'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON class_website.* TO 'webuser'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

#### **B. Deploy Code**

1. **Clone atau upload code:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   npm install
   ```

2. **Setup Environment Variables:**
   ```bash
   nano .env
   ```
   Tambahkan:
   ```
   DB_HOST=localhost
   DB_USER=webuser
   DB_PASSWORD=your_password
   DB_NAME=class_website
   PORT=3000
   NODE_ENV=production
   ```

3. **Install PM2 (Process Manager):**
   ```bash
   npm install -g pm2
   pm2 start server.js --name class-website
   pm2 save
   pm2 startup
   ```

4. **Setup Nginx (Reverse Proxy):**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Tambahkan:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Restart Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **Setup SSL (Let's Encrypt):**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

#### **Keuntungan:**
- ✅ Kontrol penuh
- ✅ Lebih murah untuk jangka panjang
- ✅ Fleksibel

---

## 🔧 Konfigurasi Environment Variables

Di semua platform, Anda perlu set environment variables:

```env
# Database Configuration
DB_HOST=localhost          # atau host database
DB_USER=root              # atau username database
DB_PASSWORD=your_password # password database
DB_NAME=class_website     # nama database

# Server Configuration
PORT=3000                 # port server
NODE_ENV=production        # environment mode
```

**⚠️ Penting:** Jangan commit file `.env` ke GitHub! Pastikan ada di `.gitignore`.

---

## 📝 Persiapan Sebelum Deploy

### **1. Update `server.js` untuk Production**

Pastikan `server.js` menggunakan environment variables:

```javascript
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'class_website'
});
```

✅ Sudah benar di file Anda!

### **2. Buat File `.env.example`**

Buat file `.env.example` di root folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=class_website
PORT=3000
NODE_ENV=development
```

### **3. Update `.gitignore`**

Pastikan `.gitignore` berisi:

```
node_modules/
.env
*.log
.DS_Store
.vscode/
```

### **4. Test Database Connection**

Sebelum deploy, test dulu koneksi database di local:
```bash
npm start
```

Buka: `http://localhost:3000/api/health`
Harus muncul: `{"status":"healthy","database":"connected"}`

---

## 🌐 Upload Images

Website menggunakan folder `images/` yang harus di-upload juga. Pastikan:

1. **Upload semua file di folder `images/`**
2. **Structure folder tetap sama:**
   ```
   project-root/
   ├── index.html
   ├── server.js
   ├── package.json
   └── images/
       ├── XPPLG1.jpg
       ├── Natan.jpg
       └── ...
   ```

---

## ✅ Checklist Sebelum Deploy

- [ ] Semua file di-commit ke GitHub
- [ ] `.env` tidak di-commit (ada di `.gitignore`)
- [ ] Database sudah dibuat di hosting
- [ ] Environment variables sudah di-set
- [ ] Folder `images/` sudah di-upload
- [ ] Test API health check (`/api/health`)

---

## 🎯 Rekomendasi

**Untuk Pemula:** Gunakan **Railway** atau **Render** - paling mudah setup

**Untuk Production:** Gunakan **VPS** atau **DigitalOcean App Platform** - lebih stabil dan fleksibel

---

## 🐛 Troubleshooting

### **Error: "Cannot connect to database"**
- Cek environment variables sudah benar
- Cek database sudah dibuat
- Cek firewall/security group allow koneksi

### **Error: "Port already in use"**
- Set environment variable `PORT` ke angka lain
- Atau update start command

### **Website tidak bisa akses images**
- Pastikan folder `images/` sudah di-upload
- Cek path relatif di HTML benar
- Cek permission folder

### **API tidak bekerja**
- Cek server log di hosting dashboard
- Test endpoint: `https://your-domain.com/api/health`
- Cek CORS settings jika perlu

---

## 📞 Bantuan Lebih Lanjut

- **Railway Docs:** https://docs.railway.app
- **Render Docs:** https://render.com/docs
- **Heroku Docs:** https://devcenter.heroku.com
- **DigitalOcean Docs:** https://docs.digitalocean.com

---

**Selamat Deploy! 🚀**

