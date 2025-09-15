import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="group relative bg-primary border-2 border-border rounded-lg p-5 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-accent/20 cursor-pointer overflow-hidden"
    >
      {/* Accent border on top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
      

      <div className='mt-4 flex flex-col gap-3'>
        {/* Book ID */}
        <div className='flex items-center gap-2'>
          <span className='font-semibold text-xs text-text-secondary'>Id:</span>
          <span className='text-xs text-accent break-all'>{book._id}</span>
        </div>
        {/* Title */}
        <div className='flex items-center gap-2'>
          <span className='font-semibold text-sm text-text-secondary'>Title:</span>
          <span className='text-lg font-bold text-white'>{book.title}</span>
        </div>
        {/* Author */}
        <div className='flex items-center gap-2'>
          <span className='font-semibold text-sm text-text-secondary'>Author:</span>
          <span className='text-base text-text-secondary'>{book.author}</span>
        </div>
        {/* Publish Year */}
        <div className='flex items-center gap-2'>
          <span className='font-semibold text-sm text-text-secondary'>Publish Year:</span>
          <span className='text-base text-success'>{book.publishYear}</span>
        </div>
        {/* Created At */}
        {book.createdAt && (
          <div className='flex items-center gap-2'>
            <span className='font-semibold text-sm text-text-secondary'>Create Time:</span>
            <span className='text-xs text-text-secondary'>{new Date(book.createdAt).toString().slice(0, 33)}</span>
          </div>
        )}
        {/* Updated At */}
        {book.updatedAt && (
          <div className='flex items-center gap-2'>
            <span className='font-semibold text-sm text-text-secondary'>Last Update Time:</span>
            <span className='text-xs text-text-secondary'>{new Date(book.updatedAt).toString().slice(0, 33)}</span>
          </div>
        )}
      </div>

      {/* Action icons that appear on hover */}
      <div className="absolute top-5 right-5 flex flex-col items-center gap-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <BiShow
          title="Quick View"
          className="text-2xl text-text-secondary hover:text-accent cursor-pointer"
          onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
        />
        <Link to={`/books/edit/${book._id}`} onClick={(e) => e.stopPropagation()} title="Edit Book">
          <AiOutlineEdit className='text-2xl text-text-secondary hover:text-accent' />
        </Link>
        <Link to={`/books/delete/${book._id}`} onClick={(e) => e.stopPropagation()} title="Delete Book">
          <MdOutlineDelete className='text-2xl text-text-secondary hover:text-danger' />
        </Link>
      </div>

      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;