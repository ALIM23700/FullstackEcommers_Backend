# Fullstack E-Commerce Backend

Express.js + MongoDB backend for the Fullstack E-Commerce application.  
Handles user authentication, product management, cart, checkout, and admin operations.

## ⚡ Base URL & Frontend Link

- **Backend Base URL:**  
https://fullstackecommers-backend-uerv.onrender.com

Frontend repo link: [FullstackEcommers_Frontend](https://github.com/ALIM23700/FullstackEcommers_Frontend)

## 🛠 Tech Stack

- Node.js & Express.js
- MongoDB (Atlas / Cloud)
- Mongoose for database modeling
- JWT (JSON Web Tokens) for authentication
- Bcrypt for password hashing
- CORS for cross-origin requests
- Dotenv for environment variables

---

## ✨ Features

- User authentication (signup, login, logout)
- Role-based access control (user/admin)
- Product CRUD (Create, Read, Update, Delete) for admin
- Product listing & filtering for users
- Shopping cart system & order management
- Payment gateway integration (dummy/test)
- Admin order tracking & status updates

## ⚙️ Setup Instructions

```bash
# 1. Clone the backend repo
git clone https://github.com/ALIM23700/FullstackEcommers_Backend.git

# 2. Navigate into the project folder
cd FullstackEcommers_Backend

# 3. Install dependencies
npm install

# 4. Create a .env file with the following variables
# Example:
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=4000

# 5. Run the server locally
npm start

# 6. Server will run at:
http://localhost:4000

📁 Project Structure
FullstackEcommers_Backend/
├── controllers/       → Handles request logic
├── models/            → MongoDB schemas
├── routes/            → API routes
├── middleware/        → Authentication & error handling
├── utils/             → Helper functions
├── .env               → Environment variables
├── server.js          → Entry point
└── package.json

## 🚀 Future Improvements

- Add unit and integration tests
- Enhance error handling and logging
- Implement product image upload (Cloudinary or AWS S3)
- Improve performance & query optimization
- Add email notifications for orders

---

## 📄 License

MIT License  
You are free to use, modify, and distribute this project.
