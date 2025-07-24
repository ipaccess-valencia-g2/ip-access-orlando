# ConnectOrlando

**Digitally transforming Community Centers of Orlando's device loan program.**
A full-stack web and mobile platform built in partnership with the City of Orlando to make borrowing tech devices from community centers simple, transparent, and efficient.

---

## 📌 About the Project

ConnectOrlando is a digital solution developed to modernize the outdated paper-based tablet rental system used by City of Orlando community centers. With both web and mobile access, it allows residents to reserve devices in advance, track usage, and return tablets—all while providing staff and city administrators with powerful tools to manage operations and view real-time analytics.

> 💡 _This platform was created by students at Valencia College as part of their senior Software Development Capstone (CEN-4910C), in partnership with the City of Orlando’s Digital Inclusion Program._

---

## 🎯 Our Mission

ConnectOrlando aims to increase digital access for underserved communities by:

- Replacing outdated manual processes with an intuitive reservation system
- Enabling fair and trackable device loan distribution
- Providing the City with meaningful insights to shape future tech access initiatives

---

## 👥 Who It's For

- **Orlando residents** who need access to technology for work, school, or personal needs
- **Community center staff** who manage device loans
- **City administrators** tracking usage data and overseeing digital inclusion efforts

Participating locations include:

> Callahan, Hankins Park, Northwest, Rosemont, Smith, Citrus Square, Engelwood, Jackson, L Claudia Allen, Grand Avenue, Ivey Lane, Langford Park, Rock Lake, Wadeview, Dover Shores, RISE, and HOL Assistance.

---

## 🧩 Features

### ✅ Resident Features

- Account registration and login (w/ address and age validation)
- Tablet reservation by center and date
- Reservation history and check-in feedback
- Map view to locate nearby centers

### 👨‍💼 Staff & Admin Features

- Manual checkout for walk-in reservations
- User management (edit, promote, remove)
- Tablet check-in workflow (track damage/status)
- Analytics dashboard with usage trends

### 🔐 Security

- JWT auth with HttpOnly cookies (web) or SecureStore (mobile)
- Role-based access controls

---

## 🧰 Tech Stack

| Layer           | Technology                       |
| --------------- | -------------------------------- |
| Web Frontend    | React.js (Vite, React Router)    |
| Mobile Frontend | React Native (Expo)              |
| Backend         | Node.js + Express.js REST API    |
| Database        | MySQL (Local Dev + AWS RDS)      |
| Hosting         | AWS EC2 + Nginx + PM2            |
| Tools           | GitHub, Postman, MySQL Workbench |

---

## 📂 File Structure

```
.
├── backend      # Express.js server, API routes, tests
├── frontend     # React web client
└── mobile       # React Native app (Expo)
```

---

## 💻 Local Setup

### Prerequisites

- Node.js (v16+)
- MySQL (8+)
- Git
- Expo CLI (`npm install -g expo-cli`)

### Web Setup

```bash
git clone https://github.com/ipaccess-valencia-g2/ip-access-orlando.git
cd ip-access-orlando/frontend
npm install
# Create .env (see below)
npm run dev
```

### Mobile Setup

```bash
cd ip-access-orlando/mobile
npm install
# Create .env (see below)
expo start
```

### Environment Variables

**Web `.env`**

```
VITE_API_BASE_URL=http://localhost:5000/api
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=connect_orlando
```

**Mobile `.env`**

```
API_BASE_URL=http://localhost:5000/api
```

---

## 🧪 API & Backend Highlights

- Modular RESTful routes: `/login`, `/register`, `/reserve`, `/admin/users`, etc.
- JWT-based session handling (2-min expiry)
- Device reservation lifecycle: search → reserve → update → cancel → check-in
- Role-based admin controls for staff actions

---

## 🗃️ Database Schema

- `users`: Account info & roles (admin/staff/user)
- `devices`: Inventory tracking & condition
- `centers`: Pickup locations
- `reservations`: Device bookings
- `device_check`: Tracks check-ins/outs and status

---

## ☁️ Deployment

- **Frontend** hosted via Nginx on AWS EC2
- **Backend** managed by PM2 on same instance
- **Database** hosted on AWS RDS (MySQL 8)

### CI with Update Script

A shell script (`update.sh`) automates pulling new code, installing dependencies, and restarting the stack on EC2.

---

## 🔍 Testing

- Postman test collections included in `/backend/tests`
- Use `/login` to fetch JWT token
- Attach token as `Bearer <token>` for protected endpoints

---

## 🎓 Built By

Capstone team at Valencia College, Summer 2025
Course: Software Development Project (CEN-4910C)
**Advisor**: Mary Walauskis

### 👨‍💻 Developers

- [LaVonne Patoir](https://www.linkedin.com/in/dangelo-t) _(Co-Lead)_
- [D’Angelo Torres](https://github.com/d-angelotorres) _(Co-Lead)_
- [Adam Abukhdair](https://github.com/AAbukhdair)
- [Braeden Carlise](https://github.com/Braeden03)
- [Carlos Campos](http://github.com/ceccontreras)
- [Colin Passno](https://github.com/cPassno)
- [Hammad Udin](https://github.com/uddinhammad1)
- [Jackson Martzahn](https://github.com/Rustly)
- [Kevin Bonifacio](https://github.com/kevinBonifacio)
- [McKenna Pasquale](https://mpasquale.com)
- [Ryan Williams](https://github.com/RyanH3)

---

## 📍 Map View

Easily locate a participating center:
[🗺️ Google Map](https://www.google.com/maps/d/u/0/embed?mid=1JvP_hYiEtf_Y0KSGCZwYFBpvvdvhwR4&ehbc=2E312F)

---

## 🎥 Demo

Coming soon!

---

## 📜 License

This project is for educational use and in partnership with the City of Orlando. Licensing terms may follow Valencia College or city partner policies.

---
