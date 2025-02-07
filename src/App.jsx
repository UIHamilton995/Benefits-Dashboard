// import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import EnrolleeModal from './components/EnrolleeModal';
// import BenefitsDashboard from './components/BenefitsDashboard';

// // Custom hook to fetch benefits with progressive loading
// const useBenefits = (id) => {
//   const [dentalBenefits, setDentalBenefits] = useState(null);
//   const [opticalBenefits, setOpticalBenefits] = useState(null);
//   const [lensFrames, setLensFrames] = useState(null);
//   const [surgery, setSurgery] = useState(null);
//   const [vaccines, setVaccines] = useState(null);
//   const [majorDisease, setMajorDisease] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Separate async fetch functions for each benefit type
//   const fetchDentalBenefits = useCallback(async (cifNo) => {
//     try {
//       const response = await axios.get(
//         `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_Dental?cifno=${cifNo}`
//       );
//       setDentalBenefits(response.data);
//     } catch (err) {
//       console.error('Dental Benefits Fetch Error:', err);
//       // Optionally set a partial error for dental benefits
//       setError(prevError => ({
//         ...prevError,
//         dental: err
//       }));
//     }
//   }, []);

//   const fetchOpticalBenefits = useCallback(async (cifNo) => {
//     try {
//       const response = await axios.get(
//         `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_LensFrames?cifno=${cifNo}`
//       );
//       setOpticalBenefits(response.data);
//     } catch (err) {
//       console.error('Optical Benefits Fetch Error:', err);
//       // Optionally set a partial error for optical benefits
//       setError(prevError => ({
//         ...prevError,
//         optical: err
//       }));
//     }
//   }, []);

//   const fetchLensFrames = useCallback(async (cifNo) => {
//     try {
//       const response = await axios.get(
//         `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_LensFrames?cifno=${cifNo}`
//       );
//       setLensFrames(response.data);
//     } catch (err) {
//       console.error('Lens Frames Fetch Error:', err);
//       // Partial error for lens frames
//       setError(prevError => ({
//         ...prevError,
//         lensFrames: err
//       }));
//     }
//   }, []);

//   const fetchSurgery = useCallback(async (cifNo) => {
//     try {
//       const response = await axios.get(
//         `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_Surgery?cifno=${cifNo}`
//       );
//       setSurgery(response.data);
//     } catch (err) {
//       console.error('Surgery Fetch Error:', err);
//       // Partial error for lens frames
//       setError(prevError => ({
//         ...prevError,
//         surgery: err
//       }));
//     }
//   }, []);

//   const fetchVaccines = useCallback(async (cifNo) => {
//     try {
//       const response = await axios.get(
//         `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_Vaccines?cifno=${cifNo}`
//       );
//       setVaccines(response.data);
//     } catch (err) {
//       console.error('Vaccines Fetch Error:', err);
//       // Partial error for lens frames
//       setError(prevError => ({
//         ...prevError,
//         vaccines: err
//       }));
//     }
//   }, []);

//   const fetchMajorDisease = useCallback(async (cifNo) => {
//     try {
//       const response = await axios.get(
//         `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_MajorDisease?cifno=${cifNo}`
//       );
//       setMajorDisease(response.data);
//     } catch (err) {
//       console.error('MajorDisease Fetch Error:', err);
//       // Partial error for lens frames
//       setError(prevError => ({
//         ...prevError,
//         majorDisease: err
//       }));
//     }
//   }, []);

//   // Main effect to trigger fetching
//   useEffect(() => {
//     // Reset state when ID changes
//     setDentalBenefits(null);
//     setOpticalBenefits(null);
//     setLensFrames(null);
//     setSurgery(null);
//     setVaccines(null);
//     setMajorDisease(null);
//     setError(null);
//     setLoading(true);

//     if (!id) {
//       setLoading(false);
//       return;
//     }

//     // Fetch benefits independently
//     const fetchBenefits = async () => {
//       const fetchPromises = [
//         fetchOpticalBenefits(id),
//         fetchDentalBenefits(id),
//         fetchLensFrames(id),
//         fetchSurgery(id),
//         fetchVaccines(id),
//         fetchMajorDisease(id),
//       ];

//       try {
//         // Wait for both to complete, but they can resolve at different times
//         await Promise.allSettled(fetchPromises);
//       } catch (err) {
//         console.error('Benefits Fetch Error:', err);
//       } finally {
//         // Set loading to false once both attempts have completed
//         setLoading(false);
//       }
//     };

//     fetchBenefits();
//   }, [id, fetchDentalBenefits, fetchOpticalBenefits, fetchLensFrames, fetchSurgery, fetchVaccines, fetchMajorDisease]);

//   // Determine overall loading state
//   const isLoading = loading || (
//     !dentalBenefits
//     && !opticalBenefits
//     && lensFrames
//     && surgery
//     && vaccines
//     && majorDisease
//   );

//   return { 
//     dentalBenefits, 
//     opticalBenefits,
//     lensFrames,
//     surgery,
//     vaccines,
//     majorDisease,
//     loading: isLoading, 
//     error 
//   };
// };

// // Benefits Component
// const Benefits = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { 
//     dentalBenefits, 
//     opticalBenefits,
//     lensFrames,
//     surgery,
//     vaccines,
//     majorDisease,
//     loading, 
//     error 
//   } = useBenefits(id);

//   // Error handling component
//   const ErrorDisplay = () => {
//     if (!error) return null;
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//         {error.optical && (
//           <div>
//             <strong className="font-bold">Optical Benefits Error: </strong>
//             <span className="block sm:inline">
//               {error.optical.message || 'Failed to load optical benefits'}
//             </span>
//           </div>
//         )}
//         {error.dental && (
//           <div>
//             <strong className="font-bold">Dental Benefits Error: </strong>
//             <span className="block sm:inline">
//               {error.dental.message || 'Failed to load dental benefits'}
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <>
//       {error && <ErrorDisplay />}
//       <BenefitsDashboard
//         dentalBenefits={dentalBenefits}
//         opticalBenefits={opticalBenefits}
//         lensFrames={lensFrames}
//         surgery={surgery}
//         vaccines={vaccines}
//         majorDisease={majorDisease}
//         loading={loading}
//         onChangeId={() => navigate('/')}
//       />
//     </>
//   );
// };

// // App Component
// const App = () => (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<EnrolleeModal />} />
//       <Route path="/enrollee-benefits/:id" element={<Benefits />} />
//     </Routes>
//   </BrowserRouter>
// );

// export default App;


import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import EnrolleeModal from './components/EnrolleeModal';
import BenefitsDashboard from './components/BenefitsDashboard';

// Custom hook to fetch benefits with progressive loading
const useBenefits = (id) => {
  const [dentalBenefits, setDentalBenefits] = useState(null);
  const [opticalBenefits, setOpticalBenefits] = useState(null);
  const [lensFrames, setLensFrames] = useState(null);
  const [surgery, setSurgery] = useState(null);
  const [vaccines, setVaccines] = useState(null);
  const [majorDisease, setMajorDisease] = useState(null);
  
  // New state for additional benefits
  const [fertility, setFertility] = useState(null);
  const [spa, setSpa] = useState(null);
  const [gym, setGym] = useState(null);
  const [annualHealthCheck, setAnnualHealthCheck] = useState(null);
  const [physiotherapy, setPhysiotherapy] = useState(null);
  const [wardType, setWardType] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Existing fetch functions...
  const fetchDentalBenefits = useCallback(async (cifNo) => {
    try {
      const response = await axios.get(
        `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_Dental?cifno=${cifNo}`
      );
      setDentalBenefits(response.data);
    } catch (err) {
      console.error('Dental Benefits Fetch Error:', err);
      setError(prevError => ({
        ...prevError,
        dental: err
      }));
    }
  }, []);

  const fetchOpticalBenefits = useCallback(async (cifNo) => {
    try {
      const response = await axios.get(
        `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_LensFrames?cifno=${cifNo}`
      );
      setOpticalBenefits(response.data);
    } catch (err) {
      console.error('Optical Benefits Fetch Error:', err);
      // Optionally set a partial error for optical benefits
      setError(prevError => ({
        ...prevError,
        optical: err
      }));
    }
  }, []);

  const fetchLensFrames = useCallback(async (cifNo) => {
    try {
      const response = await axios.get(
        `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_LensFrames?cifno=${cifNo}`
      );
      setLensFrames(response.data);
    } catch (err) {
      console.error('Lens Frames Fetch Error:', err);
      // Partial error for lens frames
      setError(prevError => ({
        ...prevError,
        lensFrames: err
      }));
    }
  }, []);

  const fetchSurgery = useCallback(async (cifNo) => {
    try {
      const response = await axios.get(
        `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_Surgery?cifno=${cifNo}`
      );
      setSurgery(response.data);
    } catch (err) {
      console.error('Surgery Fetch Error:', err);
      // Partial error for lens frames
      setError(prevError => ({
        ...prevError,
        surgery: err
      }));
    }
  }, []);

  const fetchVaccines = useCallback(async (cifNo) => {
    try {
      const response = await axios.get(
        `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_Vaccines?cifno=${cifNo}`
      );
      setVaccines(response.data);
    } catch (err) {
      console.error('Vaccines Fetch Error:', err);
      // Partial error for lens frames
      setError(prevError => ({
        ...prevError,
        vaccines: err
      }));
    }
  }, []);

  const fetchMajorDisease = useCallback(async (cifNo) => {
    try {
      const response = await axios.get(
        `https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_MajorDisease?cifno=${cifNo}`
      );
      setMajorDisease(response.data);
    } catch (err) {
      console.error('MajorDisease Fetch Error:', err);
      // Partial error for lens frames
      setError(prevError => ({
        ...prevError,
        majorDisease: err
      }));
    }
  }, []);

  // New fetch functions for additional benefits
  const fetchFertility = useCallback(async (cifNo) => {
    try {
      // Placeholder API or mock data
      const mockResponse = {
        result: [{
          Limit: '0',
          Used: '0',
          Balance: '0'
        }]
      };
      setFertility(mockResponse);
    } catch (err) {
      console.error('Fertility Benefits Fetch Error:', err);
      setError(prevError => ({
        ...prevError,
        fertility: err
      }));
    }
  }, []);

  const fetchSpa = useCallback(async (cifNo) => {
    try {
      // Placeholder API or mock data
      const mockResponse = {
        result: [{
          Limit: '0',
          Used: '0',
          Balance: '0'
        }]
      };
      setSpa(mockResponse);
    } catch (err) {
      console.error('Spa Benefits Fetch Error:', err);
      setError(prevError => ({
        ...prevError,
        spa: err
      }));
    }
  }, []);

  const fetchGym = useCallback(async (cifNo) => {
    try {
      // Placeholder API or mock data
      const mockResponse = {
        result: [{
          Limit: '0',
          Used: '0',
          Balance: '0'
        }]
      };
      setGym(mockResponse);
    } catch (err) {
      console.error('Gym Benefits Fetch Error:', err);
      setError(prevError => ({
        ...prevError,
        gym: err
      }));
    }
  }, []);

  const fetchAnnualHealthCheck = useCallback(async (cifNo) => {
    try {
      // Placeholder API or mock data
      const mockResponse = {
        result: [{
          Limit: '0',
          Used: '0',
          Balance: '0'
        }]
      };
      setAnnualHealthCheck(mockResponse);
    } catch (err) {
      console.error('Annual Health Check Fetch Error:', err);
      setError(prevError => ({
        ...prevError,
        annualHealthCheck: err
      }));
    }
  }, []);

  const fetchPhysiotherapy = useCallback(async (cifNo) => {
    try {
      // Placeholder API or mock data
      const mockResponse = {
        result: [{
          Limit: '0',
          Used: '0',
          Balance: '0'
        }]
      };
      setPhysiotherapy(mockResponse);
    } catch (err) {
      console.error('Physiotherapy Fetch Error:', err);
      setError(prevError => ({
        ...prevError,
        physiotherapy: err
      }));
    }
  }, []);

  const fetchWardType = useCallback(async (cifNo) => {
    try {
      // Placeholder API or mock data
      const mockResponse = {
        result: [{
          Limit: '0',
          Used: '0',
          Balance: '0'
        }]
      };
      setWardType(mockResponse);
    } catch (err) {
      console.error('Ward Type Fetch Error:', err);
      setError(prevError => ({
        ...prevError,
        wardType: err
      }));
    }
  }, []);

  // Main effect to trigger fetching
  useEffect(() => {
    // Reset state when ID changes
    setDentalBenefits(null);
    setOpticalBenefits(null);
    setLensFrames(null);
    setSurgery(null);
    setVaccines(null);
    setMajorDisease(null);
    
    // Reset new benefits
    setFertility(null);
    setSpa(null);
    setGym(null);
    setAnnualHealthCheck(null);
    setPhysiotherapy(null);
    setWardType(null);

    setError(null);
    setLoading(true);

    if (!id) {
      setLoading(false);
      return;
    }

    // Fetch benefits independently
    const fetchBenefits = async () => {
      const fetchPromises = [
        fetchOpticalBenefits(id),
        fetchDentalBenefits(id),
        fetchLensFrames(id),
        fetchSurgery(id),
        fetchVaccines(id),
        fetchMajorDisease(id),
        
        // New fetch promises
        fetchFertility(id),
        fetchSpa(id),
        fetchGym(id),
        fetchAnnualHealthCheck(id),
        fetchPhysiotherapy(id),
        fetchWardType(id)
      ];

      try {
        // Wait for all to complete, but they can resolve at different times
        await Promise.allSettled(fetchPromises);
      } catch (err) {
        console.error('Benefits Fetch Error:', err);
      } finally {
        // Set loading to false once all attempts have completed
        setLoading(false);
      }
    };

    fetchBenefits();
  }, [
    id, 
    fetchDentalBenefits, 
    fetchOpticalBenefits, 
    fetchLensFrames, 
    fetchSurgery, 
    fetchVaccines, 
    fetchMajorDisease,
    fetchFertility,
    fetchSpa,
    fetchGym,
    fetchAnnualHealthCheck,
    fetchPhysiotherapy,
    fetchWardType
  ]);

  // Determine overall loading state
  const isLoading = loading || (
    !dentalBenefits
    && !opticalBenefits
    && !lensFrames
    && !surgery
    && !vaccines
    && !majorDisease
    && !fertility
    && !spa
    && !gym
    && !annualHealthCheck
    && !physiotherapy
    && !wardType
  );

  return { 
    dentalBenefits, 
    opticalBenefits,
    lensFrames,
    surgery,
    vaccines,
    majorDisease,
    fertility,
    spa,
    gym,
    annualHealthCheck,
    physiotherapy,
    wardType,
    loading: isLoading, 
    error 
  };
};

// Benefits Component
const Benefits = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    dentalBenefits, 
    opticalBenefits,
    lensFrames,
    surgery,
    vaccines,
    majorDisease,
    fertility,
    spa,
    gym,
    annualHealthCheck,
    physiotherapy,
    wardType,
    loading, 
    error 
  } = useBenefits(id);

  // Error handling component
  const ErrorDisplay = () => {
    if (!error) return null;
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        {Object.entries(error).map(([key, value]) => (
          <div key={key}>
            <strong className="font-bold">{key.charAt(0).toUpperCase() + key.slice(1)} Benefits Error: </strong>
            <span className="block sm:inline">
              {value.message || `Failed to load ${key} benefits`}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {error && <ErrorDisplay />}
      <BenefitsDashboard
        dentalBenefits={dentalBenefits}
        opticalBenefits={opticalBenefits}
        lensFrames={lensFrames}
        surgery={surgery}
        vaccines={vaccines}
        majorDisease={majorDisease}
        fertility={fertility}
        spa={spa}
        gym={gym}
        annualHealthCheck={annualHealthCheck}
        physiotherapy={physiotherapy}
        wardType={wardType}
        loading={loading}
        onChangeId={() => navigate('/')}
      />
    </>
  );
};

// App Component
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<EnrolleeModal />} />
      <Route path="/enrollee-benefits/:id" element={<Benefits />} />
    </Routes>
  </BrowserRouter>
);

export default App;