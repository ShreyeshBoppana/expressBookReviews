const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Check if the username already exists
  if (users.hasOwnProperty(username)) {
    return res.status(409).json({ message: "Username already exists. Choose a different username." });
  }

  // Save the new user's information (in a real-world scenario, you would hash the password)
  users[username] = { username, password };

  return res.status(201).json({ message: "User registered successfully." });
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(books);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbnToSearch = req.params.isbn;

  // Check if the provided ISBN exists in the books data
  if (books.hasOwnProperty(isbnToSearch)) {
    const bookDetails = books[isbnToSearch];
    return res.status(200).json({ book: bookDetails });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const authorToSearch = req.params.author;
  const matchingBooks = [];

  // Iterate through each book and check if the author matches
  for (const isbn in books) {
    if (books[isbn].author.toLowerCase() === authorToSearch.toLowerCase()) {
      matchingBooks.push({ isbn, ...books[isbn] });
    }
  }

  // Check if any books were found for the given author
  if (matchingBooks.length > 0) {
    return res.status(200).json({ books: matchingBooks });
  } else {
    return res.status(404).json({ message: "Books by the author not found" });
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const titleToSearch = req.params.title;
  const matchingBooks = [];

  // Iterate through each book and check if the author matches
  for (const isbn in books) {
    if (books[isbn].title.toLowerCase() === titleToSearch.toLowerCase()) {
      matchingBooks.push({ isbn, ...books[isbn] });
    }
  }

  // Check if any books were found for the given author
  if (matchingBooks.length > 0) {
    return res.status(200).json({ books: matchingBooks });
  } else {
    return res.status(404).json({ message: "Books by the author not found" });
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbnToSearch = req.params.isbn;

  // Check if the provided ISBN exists in the books data
  if (books.hasOwnProperty(isbnToSearch)) {
    const bookReviews = books[isbnToSearch].reviews;

    // Check if the book has any reviews
    if (Object.keys(bookReviews).length >=0) {
      return res.status(200).json({ reviews: bookReviews });
    } else {
      return res.status(404).json({ message: "No reviews found for the book with ISBN " + isbnToSearch });
    }
  } else {
    return res.status(404).json({ message: "Book not found with ISBN " + isbnToSearch });
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

public_users.get('/books', async (req, res) => {
    try {
      // Simulate an asynchronous operation (e.g., fetching data from a database)
      const fetchedBooks = await fetchBooks();
  
      // Send the fetched books as the response
      res.send(fetchedBooks);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Simulated asynchronous function
  function fetchBooks() {
    return new Promise((resolve) => {
      // Simulate a delay (e.g., fetching data from a database)
      setTimeout(() => {
        resolve(books);
      }, 1000); // 1 second delay
    });
  }

  public_users.get('/isbn/:isbn', (req, res) => {
  findBookByISBN(req.params.isbn)
    .then((bookDetails) => {
      res.status(200).json({ book: bookDetails });
    })
    .catch((error) => {
      console.error(error);
      res.status(404).json({ message: 'Book not found' });
    });
});

// Simulated asynchronous function using a Promise
function findBookByISBN(isbn) {
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous operation (e.g., fetching data from a database)
    setTimeout(() => {
      if (books.hasOwnProperty(isbn)) {
        resolve(books[isbn]);
      } else {
        reject(new Error('Book not found'));
      }
    }, 1000); // 1 second delay
  });
}

public_users.get('/author1/:author', (req, res) => {
    findBooksByAuthor(req.params.author)
      .then((matchingBooks) => {
        if (matchingBooks.length > 0) {
          res.status(200).json({ books: matchingBooks });
        } else {
          res.status(404).json({ message: 'Books by the author not found' });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });
  
  // Simulated asynchronous function using a Promise
  function findBooksByAuthor(author) {
    return new Promise((resolve, reject) => {
      // Simulate an asynchronous operation (e.g., fetching data from a database)
      setTimeout(() => {
        const matchingBooks = [];
  
        for (const isbn in books) {
          if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
            matchingBooks.push({ isbn, ...books[isbn] });
          }
        }
  
        resolve(matchingBooks);
      }, 1000); // 1 second delay
    });
  }

  public_users.get('/title1/:title', (req, res) => {
    findBooksByTitle(req.params.title)
      .then((matchingBooks) => {
        if (matchingBooks.length > 0) {
          res.status(200).json({ books: matchingBooks });
        } else {
          res.status(404).json({ message: 'Books by the title not found' });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });
  
  // Simulated asynchronous function using a Promise
  function findBooksByTitle(title) {
    return new Promise((resolve, reject) => {
      // Simulate an asynchronous operation (e.g., fetching data from a database)
      setTimeout(() => {
        const matchingBooks = [];
  
        for (const isbn in books) {
          if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
            matchingBooks.push({ isbn, ...books[isbn] });
          }
        }
  
        resolve(matchingBooks);
      }, 1000); // 1 second delay
    });
  }


  
module.exports.general = public_users;
