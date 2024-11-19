const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let books = [
    { id: 1, title: "Book A", author: "Author A", year: 1, isAvailable: true },
    { id: 2, title: "Book B", author: "Author B", year: 2, isAvailable: true },
    { id: 3, title: "Book C", author: "Author C", year: 3, isAvailable: true },
];

app.post("/books", (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    res.send(newBook);
});

app.get("/books", (req, res) => {
    res.send(books);
});

app.post("/books/borrow", (req, res) => {
    const { title } = req.body;
    const book = books.find(book => book.title === title && book.isAvailable);
    if (book) {
        book.isAvailable = false;
        res.send(`Borrowed "${book.title}"`);
    } else {
        res.send(`"${title}" not available`);
    }
});

app.post("/books/return", (req, res) => {
    const { title } = req.body;
    const book = books.find(book => book.title === title && !book.isAvailable);
    if (book) {
        book.isAvailable = true;
        res.send(`Returned "${book.title}"`);
    } else {
        res.send(`"${title}" not borrowed`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});