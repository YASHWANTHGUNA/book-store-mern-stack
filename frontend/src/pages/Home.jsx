import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4 max-w-7xl mx-auto'>
      {/* Header Section */}
      <header className='flex justify-between items-center my-8'>
        <h1 className='text-3xl font-bold text-white'>Book Shelf</h1>

        <div className='flex items-center gap-x-4'>
           {/* View Toggle */}
          <div className='bg-primary border border-border p-1 rounded-lg flex items-center gap-x-1'>
            <button
              className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${showType === 'table' ? 'bg-accent text-white' : 'text-text-secondary hover:bg-border'}`}
              onClick={() => setShowType('table')}
            >
              Table
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${showType === 'card' ? 'bg-accent text-white' : 'text-text-secondary hover:bg-border'}`}
              onClick={() => setShowType('card')}
            >
              Card
            </button>
          </div>
          
          {/* Add Book Button */}
          <Link to='/books/create' className='flex items-center gap-x-2 bg-success text-white font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all'>
            <AiOutlinePlus size={20} />
            Add Book
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {loading ? <Spinner /> : <>{showType === 'table' ? <BooksTable books={books} /> : <BooksCard books={books} />}</>}
      </main>
    </div>
  );
};

export default Home;