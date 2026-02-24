/**
 * Express Server Entry Point
 * Initializes database, API routes, and WebSocket
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const http = require('http');
const { WebSocketServer } = require('ws');
const path = require('path');

// Initialize database (auto-creates tables + seeds MITRE data)
const db = require('./db');

// Initialize Express
const app = express();
const server = http.createServer(app);

// Initialize WebSocket
const wss = new WebSocketServer({ server, path: '/ws' });
const StreamManager = require('../websocket/streamManager');
const streamManager = new StreamManager(wss);

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
    message: { error: 'Too many requests, please try again later' },
});
app.use('/api/', limiter);

// API Routes
const logRoutes = require('./routes/logs')(db, streamManager);
app.use('/api/logs', logRoutes);

// Stream control endpoints
app.post('/api/stream/start', (req, res) => {
    streamManager.startSimulation();
    res.json({ status: 'started' });
});

app.post('/api/stream/stop', (req, res) => {
    streamManager.stopSimulation();
    res.json({ status: 'stopped' });
});

app.get('/api/stream/status', (req, res) => {
    res.json({
        isSimulating: streamManager.isSimulating,
        connectedClients: streamManager.clients.size,
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: 'File too large. Maximum size is 10MB.' });
    }
    res.status(500).json({ error: err.message || 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║       🛡️  CYBER LOG ANALYZER — Server Active        ║');
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log(`║  🌐 API:       http://localhost:${PORT}                ║`);
    console.log(`║  📡 WebSocket: ws://localhost:${PORT}/ws               ║`);
    console.log(`║  📊 Health:    http://localhost:${PORT}/api/health      ║`);
    console.log('║  💾 Database:  SQLite (database/logs.db)             ║');
    console.log('╚══════════════════════════════════════════════════════╝');
    console.log('');
});

module.exports = { app, server };
