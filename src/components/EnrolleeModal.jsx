import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

// Simple encoding function
const encodeId = (originalId) => {
  // Basic encoding to make it less readable
  return btoa(originalId).replace(/=/g, '');
};

const EnrolleeModal = () => {
  const [enrolleeId, setEnrolleeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate ID format
    const idPattern = /^\d+\/\d$/;
    if (!idPattern.test(enrolleeId.trim())) {
      setError('Invalid ID format. Use format like 99999999/0');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBioDataByEnrolleeID?enrolleeid=${enrolleeId}`
      );

      // Check if result exists and has data
      if (response.data?.result?.length > 0) {
        const memberUniqueID = response.data.result[0].Member_MemberUniqueID;
        
        // Encode both the original enrollee ID and memberUniqueID
        const encodedEnrolleeId = encodeId(enrolleeId);
        const encodedMemberUniqueID = encodeId(memberUniqueID.toString());
        
        // Navigate with encoded IDs
        navigate(`/enrollee-benefits/${encodedEnrolleeId}/${encodedMemberUniqueID}`);
      } else {
        setError('No enrollee found with this ID');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('Error verifying enrollee ID. Please try again.');
    } finally {
      setIsLoading(false);
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

        {error && (
          <div className="mt-4 text-center text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="text"
            required
            value={enrolleeId}
            onChange={(e) => setEnrolleeId(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring focus:ring-amber-400 transition-all outline-none"
            placeholder="Enrollee ID (e.g., 99999999/0)"
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