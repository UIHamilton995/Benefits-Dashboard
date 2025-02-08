// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// // Helper function to validate Enrollee ID format
// const validateEnrolleeId = (id) => /^\d{8}\/\d+$/.test(id);

// const useBenefits = (enrolleeId) => {
//   const [uniqueId, setUniqueId] = useState(null);
//   const [benefits, setBenefits] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch Unique ID using Enrollee ID
//   const fetchUniqueId = useCallback(async () => {
//     if (!validateEnrolleeId(enrolleeId)) {
//       setError("Invalid Enrollee ID format (e.g., 99000999/0).");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const response = await axios.get(
//         `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBioDataByEnrolleeID?enrolleeid=${enrolleeId}`
//       );

//       if (!response.data?.result?.length) {
//         throw new Error("No Unique ID found for this Enrollee ID.");
//       }

//       setUniqueId(response.data.result[0].Member_MemberUniqueID);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [enrolleeId]);

//   // Fetch Benefits after getting the Unique ID
//   useEffect(() => {
//     if (!uniqueId) return;

//     const fetchBenefits = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_Dental?cifno=${uniqueId}`
//         );
//         setBenefits(response.data);
//       } catch (err) {
//         setError("Failed to fetch benefits.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBenefits();
//   }, [uniqueId]);

//   return { benefits, fetchUniqueId, loading, error };
// };

// export default useBenefits;

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Helper function to validate Enrollee ID format (e.g., 99000999/0)
const validateEnrolleeId = (id) => /^\d{8}\/\d+$/.test(id);

const UseBenefits = (enrolleeId) => {
  const [uniqueId, setUniqueId] = useState(null);
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Unique ID using Enrollee ID
  const fetchUniqueId = useCallback(async () => {
    if (!validateEnrolleeId(enrolleeId)) {
      setError("Invalid Enrollee ID format (e.g., 99000999/0).");
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBioDataByEnrolleeID?enrolleeid=${enrolleeId}`
      );

      if (!response.data?.result?.length) {
        throw new Error("No Unique ID found for this Enrollee ID.");
      }

      const uniqueId = response.data.result[0].Member_MemberUniqueID;
      setUniqueId(uniqueId);
      return uniqueId;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [enrolleeId]);

  // Fetch Benefits using Unique ID
  const fetchBenefits = useCallback(async (cifNo) => {
    setLoading(true);
    setError(null);
    setBenefits([]);

    const endpoints = {
      'Dental': `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_Dental?cifno=${cifNo}`,
      'Optical': `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_LensFrames?cifno=${cifNo}`,
      'Lens Frames': `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_LensFrames?cifno=${cifNo}`,
      'Surgery': `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_Surgery?cifno=${cifNo}`,
      'Vaccines': `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_Vaccines?cifno=${cifNo}`,
      'Major Disease': `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_MajorDisease?cifno=${cifNo}`,
    };

    // Mock API responses for missing benefit categories
    const mockResponse = {
      result: [{ Limit: '0', Used: '0', Balance: '0' }]
    };

    const benefitRequests = Object.entries(endpoints).map(([type, url]) =>
      axios.get(url).then(res => ({
        type,
        data: res.data
      })).catch(() => ({
        type,
        data: mockResponse
      }))
    );

    try {
      const results = await Promise.allSettled(benefitRequests);

      const formattedBenefits = results
        .filter(res => res.status === 'fulfilled')
        .map(res => ({
          BenefitType: res.value.type,
          ...res.value.data.result[0] 
        }));

      setBenefits(formattedBenefits);
    } catch (err) {
      setError("Failed to fetch benefits.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect to fetch Unique ID and then fetch Benefits
  useEffect(() => {
    const processBenefits = async () => {
      const id = await fetchUniqueId();
      if (id) fetchBenefits(id);
    };

    if (enrolleeId) processBenefits();
  }, [enrolleeId, fetchUniqueId, fetchBenefits]);

  return { benefits, fetchUniqueId, loading, error };
};

export default UseBenefits;
