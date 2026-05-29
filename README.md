# Clothing Shop System - Backend

This is the backend for the Clothing Shop System built with Node.js, Express, and PostgreSQL.

## Features
- User Authentication (JWT)
- Role-based Access Control (Admin, Cashier, Customer)
- Product Management (CRUD)
- Order Management
- Payment Processing
- Sales and Inventory Reports
- Security (Helmet, Rate Limiting)
- Image Uploads (Multer)

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Aiven)
- **Authentication:** JWT, bcryptjs
- **Middleware:** Helmet, CORS, Multer

## Getting Started

### Prerequisites
- Node.js installed
- PostgreSQL database (Aiven or local)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your credentials:
   ```env
   PORT=5000
   DB_USER=your_user
   DB_HOST=your_host
   DB_NAME=your_db
   DB_PASSWORD=your_password
   DB_PORT=5432
   JWT_SECRET=your_secret
   ```
4. Initialize the database using `database.sql`.

### Running the Server
- Development mode:
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Products
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (Admin only)
- `PUT /api/products/:id` (Admin only)
- `DELETE /api/products/:id` (Admin only)

### Orders
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id/status` (Admin/Cashier only)

### Payments
- `POST /api/payments`
- `GET /api/payments` (Admin/Cashier only)

### Reports
- `GET /api/reports/sales` (Admin only)
- `GET /api/reports/inventory` (Admin only)
- `GET /api/reports/best-sellers` (Admin only)
