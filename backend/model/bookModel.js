const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookTitle: String,
    authorName: String,
    isbn: {
        type: String,
        unique: true, 
        required: true, 
    },
    
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
