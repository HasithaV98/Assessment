const { response } = require('express');
const book = require('../model/bookModel');


const store = (req, res, next) => {
    let newBook = new book({
        bookTitle: req.body.bookTitle,
        authorName: req.body.authorName,
        isbn: req.body.isbn,
    });

    newBook.save()
        .then(response => {
            res.json({ message: 'Book details added successfully' });
        })
        .catch(error => {
            res.json({ message: 'Error while saving book details' });
        });
};

const index = (req, res, next) => {
    book.find({})
        .then(books => {
            res.json({ status: 'ok', data: books });
        })
        .catch(error => {
            res.json({ message: 'Error finding books' });
        });
};

const remove = (req, res, next) => {
    const isbn = req.params.isbn; 

    book.findOneAndDelete({ isbn: isbn })
        .then((deletedBook) => {
            if (deletedBook) {
                res.json({ message: 'Book removed successfully' });
            } else {
                res.status(404).json({ message: 'Book not found.' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error while removing book' });
        });
};

module.exports = {
    store,
    index,
    remove,
};
