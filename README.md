# 💰 VaultX

A modern **Personal Finance Management System** built with **Next.js 16, React 19, TypeScript, MongoDB, and Tailwind CSS**. VaultX helps users manage bank accounts, track transactions, analyze spending, and monitor budgets through a clean and responsive dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwind-css)

---

## ✨ Features

### 🔐 Authentication
- Secure JWT Authentication
- Login & Signup
- Protected Routes
- Logout
- Profile Management
- Change Password

### 📊 Dashboard
- Financial Overview
- Account Summary
- Income vs Expense Statistics
- Quick Actions
- Recent Transactions

### 🏦 Account Management
- Add Account
- View Account
- Delete Account
- Search Accounts

### 💸 Transaction Management
- Add Transactions
- View Transaction Details
- Search & Filter
- Export Transactions to CSV

### 📈 Analytics
- Income vs Expense Charts
- Category-wise Expense Analysis
- Monthly Financial Summary
- Financial Statistics

### 🎯 Budget Management
- Create Budgets
- Budget Overview

### 🔔 Notifications
- Notification Center

### ⚙️ Settings
- Update Profile
- Change Password
- Theme Toggle

### 🎨 User Experience
- Responsive Design
- Toast Notifications
- Confirmation Dialogs
- Empty States
- Error Pages (404 & Error)

---

## 🛠 Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI (Base UI)
- Sonner

### Backend
- Next.js API Routes
- JWT Authentication
- MongoDB
- Mongoose

### Development Tools
- React Hook Form
- Zod Validation
- Lucide React Icons

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── login/
│   ├── signup/
│   └── settings/
│
├── components/
│   ├── accounts/
│   ├── analytics/
│   ├── auth/
│   ├── budgets/
│   ├── dashboard/
│   ├── notifications/
│   ├── transactions/
│   └── ui/
│
├── hooks/
├── lib/
├── models/
└── middleware.ts
```

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/your-username/vaultx.git
```

Navigate to the project

```bash
cd vaultx
```

Install dependencies

```bash
npm install
```

Create `.env.local`

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

---

## 📸 Screenshots

### Login

![Login](screenshots/login.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Accounts

![Accounts](screenshots/accounts.png)

### Transactions

![Transactions](screenshots/transactions.png)

### Analytics

![Analytics](screenshots/analytics.png)

### Budgets

![Budgets](screenshots/budgets.png)

### Settings

![Settings](screenshots/settings.png)

---

## 🌐 Deployment

Deploy easily using **Vercel**.

Build Status

```bash
npm run build
```

✔ Production Build Successful

---

## 👨‍💻 Author

**Astitva Mhatre**

GitHub: https://github.com/Astitvaa27

LinkedIn: https://linkedin.com/in/astitva-mhatre

---

## 📜 License

This project is intended for educational and portfolio purposes.
