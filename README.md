# 🛡️ CyberGuard — AI Log Analyzer & SIEM Dashboard

> **Production-grade Blue-Team Log Analyzer** with real-time log streaming, AI anomaly detection, MITRE ATT&CK mapping, and a stunning cyber SOC dashboard.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CYBERGUARD SIEM                       │
├──────────────────────┬──────────────────────────────────┤
│   React Dashboard    │         Node.js Backend          │
│   (Vite + Tailwind)  │      (Express + WebSocket)       │
│                      │                                  │
│  ┌───────────────┐   │   ┌──────────────────────────┐   │
│  │  Dashboard    │   │   │  REST API Routes         │   │
│  │  Upload       │◄──┼──►│  /api/logs/*             │   │
│  │  Live Stream  │   │   │  /api/stream/*           │   │
│  │  AI Analysis  │   │   └──────────┬───────────────┘   │
│  │  MITRE ATT&CK │   │              │                   │
│  └───────────────┘   │   ┌──────────▼───────────────┐   │
│                      │   │  Detection Engine         │   │
│  ┌───────────────┐   │   │  ├─ Brute Force          │   │
│  │  WebSocket    │◄──┼──►│  ├─ DDoS Detection       │   │
│  │  Client       │   │   │  ├─ Exploit Attempts     │   │
│  └───────────────┘   │   │  ├─ Port Scanning        │   │
│                      │   │  └─ AI Anomaly Analysis   │   │
├──────────────────────┤   └──────────┬───────────────┘   │
│                      │              │                   │
│                      │   ┌──────────▼───────────────┐   │
│                      │   │  SQLite Database          │   │
│                      │   │  (database/logs.db)       │   │
│                      │   └──────────────────────────┘   │
└──────────────────────┴──────────────────────────────────┘
```

## ✨ Features

### Core Functionality
- **📤 Smart Log Upload** — Drag & drop `.log`, `.txt`, `.json`, `.csv` files with preview
- **📡 Real-Time Streaming** — WebSocket-based SIEM-style live log feed with terminal UI
- **🧠 AI Anomaly Detection** — Rule + heuristic hybrid engine with natural-language summaries
- **🛡️ MITRE ATT&CK Mapping** — Auto-map threats to framework techniques with visual badges
- **📊 Interactive Analytics** — Recharts-powered dashboards with pie, bar, and line charts

### Detection Engine (Blue-Team Logic)
| Threat Type | Description | MITRE ID |
|---|---|---|
| Brute Force Attack | >5 failed logins from same IP in 60s | T1110 |
| DDoS Pattern | >100 requests/min from single IP | T1498 |
| Exploit Attempt | SQL injection, XSS, path traversal | T1190 |
| Reconnaissance | Directory/service scanning | T1046 |
| Unauthorized Access | Repeated admin panel probing | T1133 |
| Suspicious Tool | Known scanner user-agents (Nikto, sqlmap, Nmap) | T1595 |
| Auth Failures | Clusters of 401/403 responses | T1078 |

### UI/UX
- 🌑 Futuristic cyber-dark theme (#0A0F1F)
- ✨ Neon glow accents (cyan, purple, blue)
- 🔲 Glassmorphism cards with backdrop blur
- 🎬 Framer Motion animations throughout
- 📟 Terminal-style live log viewer
- 📱 Fully responsive design

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation & Run

```bash
# 1. Clone the repository
git clone <repo-url>
cd cyber-log-analyzer

# 2. Install all dependencies (root + server + client)
npm install

# 3. Start both server and client
npm run dev
```

That's it! The app will open at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **WebSocket**: ws://localhost:3001/ws

### Test with Sample Data
A sample log file is included at `database/sample.log` — upload it through the dashboard to see threats detected immediately.

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 + Vite | Fast development & build |
| Styling | Tailwind CSS | Utility-first cyber theme |
| Animations | Framer Motion | Smooth micro-interactions |
| Charts | Recharts | Interactive data visualization |
| Icons | Lucide React | Consistent icon system |
| Backend | Node.js + Express | REST API server |
| Real-time | WebSocket (ws) | Live log streaming |
| Database | SQLite (better-sqlite3) | Zero-config portable DB |
| Security | Helmet + Rate Limiter | API hardening |

---

## 📂 Project Structure

```
cyber-log-analyzer/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/        # Layout, Sidebar, ThreatBar
│   │   ├── pages/             # Dashboard, Upload, LogStream, Analysis, MitreAttack
│   │   ├── hooks/             # useWebSocket custom hook
│   │   ├── utils/             # Axios API client
│   │   ├── App.jsx            # Router + routes
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles + cyber theme
│   ├── tailwind.config.js     # Custom theme config
│   ├── vite.config.js         # Vite + proxy config
│   └── package.json
├── server/                    # Express Backend
│   ├── routes/
│   │   └── logs.js            # API endpoints
│   ├── db.js                  # SQLite setup + MITRE seeding
│   ├── index.js               # Server entry point
│   └── package.json
├── parser/                    # Detection Engine
│   ├── logParser.js           # Multi-format log parser
│   ├── detectionEngine.js     # 7 threat detection rules
│   └── aiAnalyzer.js          # AI analysis + risk scoring
├── websocket/
│   └── streamManager.js       # WebSocket + simulated stream
├── database/
│   ├── schema.sql             # Reference SQL schema
│   ├── sample.log             # Test log file
│   └── logs.db                # Auto-generated SQLite DB
├── .env.example               # Environment template
├── .gitignore
├── package.json               # Root scripts
└── README.md
```

---

## 💾 Database (SQLite)

This project uses **SQLite** for maximum portability:
- **Zero configuration** — no database server to install
- **Single file** — `database/logs.db` is auto-created on first run
- **Cross-platform** — works identically on Windows, macOS, and Linux
- **Git-friendly** — `.db` file is gitignored; schema is version-controlled

### Tables
- `analysis_sessions` — Upload/analysis metadata and AI summaries
- `log_entries` — Parsed log lines with structured fields
- `threats` — Detected threats with MITRE mappings
- `mitre_techniques` — Reference MITRE ATT&CK data (auto-seeded)

---

## 🔐 Security & Performance

- **File validation** before upload (type + size)
- **Rate limiting** on API endpoints (200 req/15min)
- **Helmet** security headers
- **CORS** configured for frontend origin
- **WAL mode** SQLite for concurrent read performance
- **Async-friendly** — non-blocking architecture
- **Message buffering** — WebSocket limits to 500 most recent events

---

## 🎓 Blue-Team Learning Outcomes

By studying this project, you'll learn:

1. **Log Parsing** — How to normalize diverse log formats into structured data
2. **Threat Detection** — Rule-based pattern matching for common attack vectors
3. **MITRE ATT&CK** — Mapping real threats to industry-standard technique IDs
4. **SIEM Concepts** — Real-time event streaming, correlation, and alerting
5. **Risk Scoring** — Combining multiple signals into actionable risk assessments
6. **IP Reputation** — Behavioral scoring of network entities
7. **SOC Dashboard Design** — Building operator-friendly security interfaces

---

## 🔮 Future Enhancements

- [ ] OpenAI/LLM integration for advanced threat summarization
- [ ] Automated PCAP and Windows Event Log parsing
- [ ] User authentication and role-based access control
- [ ] Threat intelligence feed integration (AbuseIPDB, VirusTotal)
- [ ] Alert notification system (email, Slack, webhook)
- [ ] Log export (PDF reports, CSV)
- [ ] Docker containerization
- [ ] Custom detection rule editor

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<p align="center">
  Built with 🛡️ by <strong>CyberGuard</strong> — Blue Team Intelligence Platform
</p>
