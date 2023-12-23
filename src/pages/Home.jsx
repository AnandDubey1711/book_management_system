import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://book-manager-15rb.onrender.com/books")
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
    <div className="p-4 min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200">
      <div className="flex justify-center items-center gap-x-4 my-4">
        <button
          className={`bg-gradient-to-r from-sky-400 via-sky-550 to-sky-600 hover:to-sky-700 px-4 py-1 rounded-lg ${showType === 'table' ? 'text-white bg-sky-600' : ''}`}
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className={`bg-gradient-to-r from-sky-300 via-sky-400 to-sky-600 hover:to-sky-700 px-4 py-1 rounded-lg ${showType === 'card' ? 'text-white bg-sky-600' : ''}`}
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold my-8 text-sky-800">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
