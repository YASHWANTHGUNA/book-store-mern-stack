import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-lg p-6 bg-primary shadow-xl'>
          <div className='mb-6'>
            <span className='block text-xs text-accent font-semibold mb-1'>Id</span>
            <span className='block text-base text-white break-all'>{book._id}</span>
          </div>
          <div className='mb-6'>
            <span className='block text-sm text-text-secondary font-semibold mb-1'>Title</span>
            <span className='block text-lg text-accent font-bold'>{book.title}</span>
          </div>
          <div className='mb-6'>
            <span className='block text-sm text-text-secondary font-semibold mb-1'>Author</span>
            <span className='block text-base text-text-secondary'>{book.author}</span>
          </div>
          <div className='mb-6'>
            <span className='block text-sm text-text-secondary font-semibold mb-1'>Publish Year</span>
            <span className='block text-base text-success'>{book.publishYear}</span>
          </div>
          <div className='mb-6'>
            <span className='block text-sm text-text-secondary font-semibold mb-1'>Create Time</span>
            <span className='block text-xs text-text-secondary'>{book.createdAt ? new Date(book.createdAt).toString().slice(0, 33) : ''}</span>
          </div>
          <div className='mb-2'>
            <span className='block text-sm text-text-secondary font-semibold mb-1'>Last Update Time</span>
            <span className='block text-xs text-text-secondary'>{book.updatedAt ? new Date(book.updatedAt).toString().slice(0, 33) : ''}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
