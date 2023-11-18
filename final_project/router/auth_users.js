const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }
  
    // Check if the user exists in the registered users data
    const registeredUser = users[username];
  
    if (registeredUser && registeredUser.password === password) {
      return res.status(200).json({ message: "Login successful." });
    } else {
      return res.status(401).json({ message: "User doesn't exist" });
    }
  });

// Add a book review
regd_users.put("/auth/review/:isbn", (req,res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const {reviews}=req.body;
  // Check if the book with the given ISBN exists
  if (books.hasOwnProperty(isbn)) {
    books[isbn].reviews=reviews;

    // Check if the book has any reviews
    return res.status(200).json({ message: "The book of isbn " + isbn+" is updated" });
  }
  else
  {
    return res.status(401).json({ message: "Updation failed"});
  }
  return res.status(401).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/reviewdelete/:isbn", (req,res) => {
    //Write your code here
    const isbn = req.params.isbn;
    const {reviews}=req.body;
    // Check if the book with the given ISBN exists
    if (books.hasOwnProperty(isbn)) {
      books[isbn].reviews={};
  
      // Check if the book has any reviews
      return res.status(200).json({ message: "The book of isbn " + isbn+" is deleted" });
    }
    else
    {
      return res.status(401).json({ message: "Deletion failed"});
    }
    return res.status(401).json({message: "Yet to be implemented"});
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
