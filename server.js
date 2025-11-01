const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// Database connection configuration
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Silabanban25',
    database: process.env.DB_NAME || 'class_website'
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        // Continue even if database connection fails (for development)
        console.log('⚠️  Running without database connection');
    } else {
        console.log('✅ Database connected successfully!');
    }
});

// API: Get all themes
app.get('/api/themes', (req, res) => {
    db.query('SELECT student_name, theme FROM student_themes', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error', message: err.message });
        }
        
        // Convert array to object for easier access
        const themes = {};
        results.forEach(row => {
            themes[row.student_name] = row.theme;
        });
        
        res.json(themes);
    });
});

// API: Get theme for specific student
app.get('/api/themes/:studentName', (req, res) => {
    const studentName = decodeURIComponent(req.params.studentName);
    
    db.query('SELECT theme FROM student_themes WHERE student_name = ?', [studentName], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error', message: err.message });
        }
        
        if (results.length === 0) {
            return res.json({ theme: 'default' });
        }
        
        res.json({ theme: results[0].theme });
    });
});

// API: Save/Update theme
app.post('/api/themes', (req, res) => {
    const { student_name, theme } = req.body;
    
    if (!student_name || !theme) {
        return res.status(400).json({ 
            error: 'Missing required fields',
            message: 'student_name and theme are required'
        });
    }

    // Validate theme name
    const validThemes = ['default', 'bloody', 'halloween', 'christmas', 'lightning', 
                         'ocean', 'sunset', 'dark', 'neon'];
    if (!validThemes.includes(theme)) {
        return res.status(400).json({ 
            error: 'Invalid theme',
            message: `Theme must be one of: ${validThemes.join(', ')}`
        });
    }

    const query = `INSERT INTO student_themes (student_name, theme, updated_at) 
                   VALUES (?, ?, NOW())
                   ON DUPLICATE KEY UPDATE theme = ?, updated_at = NOW()`;
    
    db.query(query, [student_name, theme, theme], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                error: 'Database error', 
                message: err.message 
            });
        }
        
        res.json({ 
            success: true, 
            message: 'Theme saved successfully',
            student_name,
            theme
        });
    });
});

// API: Get recent theme changes (for real-time updates)
app.get('/api/themes/recent', (req, res) => {
    const minutes = parseInt(req.query.minutes) || 5;
    
    const query = `SELECT student_name, theme, updated_at 
                   FROM student_themes 
                   WHERE updated_at > DATE_SUB(NOW(), INTERVAL ? MINUTE)
                   ORDER BY updated_at DESC`;
    
    db.query(query, [minutes], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                error: 'Database error', 
                message: err.message 
            });
        }
        
        res.json(results);
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    db.ping((err) => {
        if (err) {
            return res.status(503).json({ 
                status: 'unhealthy', 
                database: 'disconnected' 
            });
        }
        res.json({ 
            status: 'healthy', 
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    });
});

// Create tables if they don't exist
function initDatabase() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS student_themes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            student_name VARCHAR(255) NOT NULL UNIQUE,
            theme VARCHAR(50) NOT NULL DEFAULT 'default',
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            updated_by VARCHAR(255),
            INDEX idx_student_name (student_name),
            INDEX idx_updated_at (updated_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('✅ Database table ready');
        }
    });
}

// Initialize database on startup
if (db.state !== 'disconnected') {
    initDatabase();
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});

