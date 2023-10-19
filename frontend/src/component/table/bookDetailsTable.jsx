import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const BookDetailsTable = () => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = () => {
    axios.get('http://localhost:8022/books/getAllBooks')
      .then(response => {
        setBookData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  };

  useEffect(() => {
    fetchBookData();

    const pollingInterval = 1000;

    const intervalId = setInterval(() => {
      fetchBookData();
    }, pollingInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleDelete = (isbn) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this book?');
    if (shouldDelete) {
      axios.delete(`http://localhost:8022/books/delete/${isbn}`)
        .then(response => {
          console.log('Book deleted successfully');
          fetchBookData();
        })
        .catch(error => {
          console.error('Error deleting book:', error);
        });
    }
  };

  return (
    <div className='flex flex-col items-center  bg-gradient-to-b from-blue-800 to-pink-800'>
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">BOOK DETAILS</h2>
      {Array.isArray(bookData) && bookData.length > 0 ? (
        <table className="w-[70%] bg-white rounded-lg   shadow-xl mb-10">
          <thead>
            <tr className='bg-gradient-to-b from-teal-600 to-teal-300'>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Book Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Author Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">ISBN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookData.map((book, index) => (
              <tr key={book._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                <td className="px-3 py-2 whitespace-nowrap">{book.bookTitle}</td>
                <td className="px-3 py-2 whitespace-nowrap">{book.authorName}</td>
                <td className="px-3 py-2 whitespace-nowrap">{book.isbn}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <button onClick={() => handleDelete(book.isbn)} className="text-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No book data available.</p>
      )}
    </div>
  );
};

export default BookDetailsTable;
