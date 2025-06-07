# 📚 Book Review API

A RESTful API built using **Node.js**, **Express**, and **MongoDB** for managing books and user reviews. Features JWT authentication, input validation, and clean API design.

---

## 🔧 Project Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/book-review-api.git
   cd book-review-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following:
   ```env
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   PORT=8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

---

## ▶️ How to Run Locally

- Make sure MongoDB is running locally or provide a remote MongoDB URI.
- Run the server:
  ```bash
  npm run dev
  ```
- API base URL:
  ```
  http://localhost:8000/api
  ```

---

## 🧪 Example API Requests

### Auth

#### Signup
```bash
curl -X POST http://localhost:8000/api/auth/signup -H "Content-Type: application/json" -d '{
  "fullName": "John Doe",
  "userName": "johndoe",
  "password": "123456",
  "confirmPassword": "123456"
}'
```

#### Login
```bash
curl -X POST http://localhost:8000/api/auth/login -H "Content-Type: application/json" -d '{
  "userName": "johndoe",
  "password": "123456"
}'
```

---

### Books

#### Add a Book (Authenticated)
```bash
curl -X POST http://localhost:8000/api/books -H "Content-Type: application/json" --cookie "jwt=your_token_here" -d '{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic"
}'
```

#### Get All Books
```bash
curl "http://localhost:8000/api/books?page=1&limit=5&author=fitzgerald"
```

#### Get Book by ID
```bash
curl http://localhost:8000/api/books/<bookId>
```

---

### Reviews

#### Add a Review (Authenticated)
```bash
curl -X POST http://localhost:8000/api/books/<bookId>/reviews -H "Content-Type: application/json" --cookie "jwt=your_token_here" -d '{
  "rating": 4,
  "comment": "Amazing read!"
}'
```

#### Update Review
```bash
curl -X PUT http://localhost:8000/api/reviews/<reviewId> -H "Content-Type: application/json" --cookie "jwt=your_token_here" -d '{
  "rating": 5,
  "comment": "Changed my mind—masterpiece."
}'
```

#### Delete Review
```bash
curl -X DELETE http://localhost:8000/api/reviews/<reviewId> --cookie "jwt=your_token_here"
```

---

### Search

#### Search Books by Title or Author
```bash
curl "http://localhost:8000/api/search?q=gatsby"
```

---

## 📐 Design Decisions & Assumptions

- **JWT via Cookies:** JWT is stored in `httpOnly` cookies for better security.
- **One Review per Book per User:** Each user can post only one review per book.
- **Validation:** All critical routes use `express-validator` for input sanitization.
- **Pagination Support:** Available for listing books and reviews.
- **Separation of Concerns:** Routes, controllers, middleware, models, and utils are separated cleanly.

---
