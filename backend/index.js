import express from "express";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import Book from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import 'dotenv/config';



const app = express();

// ✅ Middleware to parse JSON
app.use(express.json());

app.use(cors());
// app.use(
//   cors({
//     origin: 'http://localhost:3000/',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );


// ✅ Health check route
app.get("/", (req, res) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  return res.status(200).json({ message: "Welcome to MERN Stack Tutorial" });
});

// ✅ Create new book
app.post("/books", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);

    return res.status(201).json(book);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

// ✅ Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

// ✅ Get book by ID
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});



// ✅ Update book by ID
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { new: true } // return updated doc
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

// ✅ Delete book by ID
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

app.use('/books',booksRoute);

// ✅ MongoDB connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

