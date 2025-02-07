import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaSpinner } from 'react-icons/fa';

const EnrolleeModal = ({ isLoading }) => {
  const [enrolleeId, setEnrolleeId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enrolleeId.trim()) {
      navigate(`/enrollee-benefits/${enrolleeId}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md transform transition-all">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
            <FaUserAlt className="h-8 w-8 text-amber-600" />
          </div>
          
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to Leadway Health
          </h2>
          <p className="mt-2 text-gray-600">
            Please enter your enrollee ID to view your benefits
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="text"
            required
            value={enrolleeId}
            onChange={(e) => setEnrolleeId(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring focus:ring-amber-400 transition-all outline-none"
            placeholder="Enrollee ID"
          />

          <button
            type="submit"
            disabled={isLoading || !enrolleeId.trim()}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl text-white bg-amber-600 hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin h-5 w-5" />
            ) : (
              'View Benefits'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrolleeModal;