import React, { useState } from 'react';
import axios from 'axios';

export default function BookDetailsForm() {
    const [formData, setFormData] = useState({
        bookTitle: '',
        authorName: '',
        isbn: '',
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8022/books/saveing', formData)
            .then((response) => {
                console.log('Book details saved successfully:', response.data);
                
                setFormData({
                    bookTitle: '',
                    authorName: '',
                    isbn: '',
                });
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    };

    return (
        <div className='flex justify-end items-center h-screen bg-gradient-to-b from-pink-500 to-blue-800 lg:flex-row'>
            <h1 className='text-4xl text-white font-semibold  mb-[30%] uppercase  absolute mr-[50%]'>
                welcome to book store
            </h1>
            <img
                src='/book.png' 
                alt='Book Image'
                className='w-[15%] h-auto object-cover mr-[25%] text-white'
            />
            
            <div className='bg-white p-8 shadow-lg w-[50%] h-auto mr-10 rounded-l-[50%]'>
                <h1 className='text-2xl font-semibold text-black text-center mb-4'>
                  ADD  BOOK DETAILS
                </h1>
                <form onSubmit={handleFormSubmit}>
                    <div className='mb-4'>
                        <input
                            type='text'
                            required
                            name='bookTitle'
                            id='bookTitle'
                            placeholder='Book Title'
                            className='p-2 border bg-white text-black w-[70%]  rounded-xl ml-[30%]'
                            value={formData.bookTitle}
                            onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
                        />
                    </div>
                    <div className='mb-4'>
                        <input
                            type='text'
                            required
                            name='authorName'
                            id='authorName'
                            placeholder='Author Name'
                            className='p-2 border bg-white text-black w-[70%] rounded-xl ml-[30%] '
                            value={formData.authorName}
                            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                        />
                    </div>
                    <div className='mb-4'>
                        <input
                            type='text'
                            required
                            name='isbn'
                            id='isbn'
                            placeholder='ISBN'
                            className='p-2 border bg-white text-black w-[70%] rounded-xl ml-[30%]'
                            value={formData.isbn}
                            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        />
                    </div>
                    <div>
                        <button
                            type='submit'
                            value='SUBMIT'
                            className='bg-teal-500 text-white p-2 w-[70%] hover:bg-teal-700 ml-[30%] rounded-lg'
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}
