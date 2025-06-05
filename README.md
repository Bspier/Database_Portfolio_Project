# Repair Shop Database – Group 121

A full-stack CRUD web application built as part of CS 340 at Oregon State University. This project models a fictional repair shop database and allows management of customers, vehicles, employees, repairs, transactions, and more.

## 🔧 Project Description

**YouTube Certified** is a small one-location repair shop that needed a database system to streamline repair operations, track service history, and manage transactions. This project includes:

- A MySQL relational database with 7 interconnected tables.
- Full CRUD operations for most entities.
- A Node.js + Express backend.
- Handlebars for frontend templating.
- Docker for containerized deployment.

## 📁 Project Structure

```
Group121_step6_FINAL_source/
├── app/
│   ├── app.js                 # Express backend logic
│   ├── views/                 # Handlebars templates
├── public/
│   ├── js/                    # Client-side JS for add, delete, update
├── database/
│   ├── ddl.sql                # Database schema
│   ├── dml_queries.sql       # Seed data
├── docker-compose.yml        # Docker configuration
└── README.md                 # This file
```

## 📦 Setup & Run Locally

### Requirements
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

### Quick Start

1. Clone the repo:
   ```bash
   git clone https://github.com/Bspier/Database_Portfolio_Project.git
   cd Database_Portfolio_Project
   ```

2. Start the app:
   ```bash
   docker compose up
   ```

3. Visit `http://localhost:3000` in your browser.

⚠️ If port 3000 is taken, update it in `app.js` and docker config.

---

## 📊 ER Diagram

> The database includes 7 tables:
- Employees
- Customers
- Vehicles
- Customer_Vehicle (M:M junction)
- Repairs
- Transactions
- Transaction_Details (M:M junction)

Refer to `/database/ddl.sql` and project PDF for full schema and sample data.

---

## 🛠 Features

| Entity              | Create | Read | Update | Delete |
|---------------------|--------|------|--------|--------|
| Employees           | ✅     | ✅   | ✅     | ✅     |
| Customers           | ✅     | ✅   | ✅     | ✅     |
| Vehicles            | ✅     | ✅   | ✅     | ✅     |
| Repairs             | ✅     | ✅   | ✅     | ✅     |
| Transactions        | ✅     | ✅   | ❌     | ❌     |
| Customer_Vehicle    | ✅     | ✅   | ❌     | ❌     |
| Transaction_Details | ✅     | ✅   | ❌     | ❌     |

---

## 👨‍💻 Authors

- Brian Spier  
- Shannon Bell

---

## 📝 Notes

- The database intentionally preserves **Transactions** for audit/logging. Deleting linked Employees or Vehicles with existing Transactions is restricted via foreign key constraints.
- Frontend was migrated from React to Handlebars for faster development during the final steps.

---

## 📜 License

This project is for academic use under OSU CS 340. No commercial license.
