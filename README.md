# Full-Stack Learning Management System (LMS)

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss)
![Razorpay](https://img.shields.io/badge/Payments-Razorpay-02042B?style=for-the-badge&logo=razorpay)
![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?style=for-the-badge&logo=cloudinary)

A robust, production-ready Learning Management System built using the MERN stack (MongoDB, Express, React, Node.js). This platform allows instructors to create, upload, and sell courses, while students can browse, purchase, and track their learning progress seamlessly.

## ✨ Features

### 🎓 For Students
* **Course Catalog**: Browse courses by category with advanced filtering and pagination.
* **Secure Payments**: Instant checkout via Razorpay integration.
* **Progress Tracking**: Automatic tracking of video watch-time, saving progress locally and syncing with the database.
* **Interactive Player**: Custom video streaming player for lesson consumption.
* **Reviews & Ratings**: Leave 1-5 star reviews on completed courses (protected against duplicate spam).

### 👨‍🏫 For Instructors
* **Course Creation**: Build rich courses with descriptions, pricing, and categorized modules.
* **Video Management**: Direct upload of heavy video files and thumbnails to Cloudinary.
* **Dashboard Analytics**: Track enrolled students and revenue metrics.
* **Drafting System**: Toggle courses between "Published" and "Draft" modes.

### 🛡️ Security & Architecture
* **Rate Limiting**: Brute-force protection on authentication endpoints.
* **NoSQL Injection Prevention**: Active payload sanitization via `express-mongo-sanitize`.
* **Orphan Data Management**: Surgical deletion of cloud storage (Cloudinary) and relational database records when a course is deleted.
* **Cryptographic Signatures**: Razorpay webhook validation via `crypto.createHmac`.
* **JWT Authentication**: Secure login and role-based access control (Student vs. Instructor).

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- TailwindCSS
- React Router DOM
- Axios

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcrypt
- Cloudinary (Media Storage)
- Razorpay (Payment Gateway)
- Multer (File Uploads)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [MongoDB](https://www.mongodb.com/) (Local or Atlas URL)
* A [Cloudinary](https://cloudinary.com/) Account
* A [Razorpay](https://razorpay.com/) Test Account

### 1. Clone the repository
```bash
git clone https://github.com/umar-abdullah-pro/lms-project.git
cd lms-project
```

### 2. Install Dependencies

**For Backend:**
```bash
cd Backend
npm install
```

**For Frontend:**
```bash
cd Frontend
npm install
```

### 3. Environment Variables
Create a `.env` file in the `Backend` directory and add the following keys:

```env
PORT=3000
DB_PATH=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay
RAZORPAY_API_KEY=your_razorpay_key_id
RAZORPAY_API_SECRET=your_razorpay_key_secret
```

### 4. Run the Application

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd Backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd Frontend
npm run dev
```

The application will be running at `http://localhost:5173`.

---

## 💡 Acknowledgements
Built as an internship submission, demonstrating full-stack engineering capabilities, secure data-handling, and third-party API integration.
