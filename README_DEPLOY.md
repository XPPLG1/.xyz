# 🚀 Quick Deploy Guide

## Platform yang Recommended

### 1. Railway.app (Paling Mudah) ⭐

**Setup cepat:**
1. Login ke https://railway.app (pakai GitHub)
2. New Project → Deploy from GitHub
3. Add MySQL Database
4. Set environment variables dari tab MySQL
5. Done! Website langsung live

**Environment Variables:**
```
DB_HOST=<dari Railway MySQL tab>
DB_USER=<dari Railway MySQL tab>
DB_PASSWORD=<dari Railway MySQL tab>
DB_NAME=railway
PORT=3000
```

---

### 2. Render.com

**Setup:**
1. Login ke https://render.com
2. New Web Service → Connect GitHub
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add PostgreSQL/MySQL database
6. Set environment variables

---

### 3. Heroku

**Setup:**
```bash
heroku login
heroku create nama-app
heroku addons:create cleardb:ignite
heroku config:set NODE_ENV=production
git push heroku main
```

---

## ⚠️ Penting!

1. **Jangan commit `.env`** - sudah ada di `.gitignore`
2. **Upload folder `images/`** - semua foto harus ada
3. **Set environment variables** - database credentials
4. **Test API health:** `https://your-domain.com/api/health`

---

## 📋 Checklist

- [ ] Code sudah di GitHub
- [ ] Database sudah dibuat
- [ ] Environment variables sudah di-set
- [ ] Images folder sudah di-upload
- [ ] Test health check endpoint

---

**Lihat `CARA_PUBLISH.md` untuk detail lengkap!**

