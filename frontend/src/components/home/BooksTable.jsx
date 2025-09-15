import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto bg-primary border border-border rounded-lg shadow-md">
      <table className='w-full border-collapse table-fixed'>
        <thead className='bg-background'>
          <tr>
            <th className='p-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-16'>No</th>
            <th className='p-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider'>Title</th>
            <th className='p-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider max-md:hidden'>Author</th>
            <th className='p-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-32 max-md:hidden'>Publish Year</th>
            <th className='p-4 text-center text-xs font-semibold text-text-secondary uppercase tracking-wider w-40'>Operations</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-border'>
          {books.map((book, index) => (
            <tr key={book._id} className='hover:bg-background transition-colors group'>
              <td className='p-4 text-text-secondary'>{index + 1}</td>
              <td className='p-4 text-white font-medium truncate'>{book.title}</td>
              <td className='p-4 text-text-secondary max-md:hidden truncate'>{book.author}</td>
              <td className='p-4 text-text-secondary max-md:hidden'>{book.publishYear}</td>
              <td className='p-4'>
                <div className='flex justify-center items-center gap-x-6'>
                  <Link to={`/books/details/${book._id}`} title="View Details">
                    <BsInfoCircle className='text-2xl text-success hover:text-opacity-80 transition-opacity' />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} title="Edit Book">
                    <AiOutlineEdit className='text-2xl text-accent hover:text-accent-hover transition-colors' />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} title="Delete Book">
                    <MdOutlineDelete className='text-2xl text-danger hover:text-opacity-80 transition-opacity' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;