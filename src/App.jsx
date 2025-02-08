import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import EnrolleeModal from './components/EnrolleeModal';
import BenefitsDashboard from './components/BenefitsDashboard';

// Decoding function (matching the encoding in EnrolleeModal)
const decodeId = (encodedId) => {
  try {
    // Add back padding if needed
    const paddedEncodedId = encodedId + '==='.slice((encodedId.length + 3) % 4);
    return atob(paddedEncodedId);
  } catch (error) {
    console.error('Decoding error:', error);
    return null;
  }
};

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

  // Fetch functions for first six benefits
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
      setError(prevError => ({
        ...prevError,
        majorDisease: err
      }));
    }
  }, []);

  // Mock fetch functions for additional benefits
  const fetchFertility = useCallback(async () => {
    try {
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

  const fetchSpa = useCallback(async () => {
    try {
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

  const fetchGym = useCallback(async () => {
    try {
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

  const fetchAnnualHealthCheck = useCallback(async () => {
    try {
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

  const fetchPhysiotherapy = useCallback(async () => {
    try {
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

  const fetchWardType = useCallback(async () => {
    try {
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
        
        // Mock fetch promises
        fetchFertility(),
        fetchSpa(),
        fetchGym(),
        fetchAnnualHealthCheck(),
        fetchPhysiotherapy(),
        fetchWardType()
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
  const { encodedEnrolleeId, encodedMemberUniqueID } = useParams();
  const navigate = useNavigate();

  // Decode the IDs
  const originalEnrolleeId = decodeId(encodedEnrolleeId);
  const memberUniqueID = decodeId(encodedMemberUniqueID);

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
  } = useBenefits(memberUniqueID);

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

  // Redirect if decoding fails
  useEffect(() => {
    if (!originalEnrolleeId || !memberUniqueID) {
      navigate('/');
    }
  }, [originalEnrolleeId, memberUniqueID, navigate]);

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
      <Route path="/enrollee-benefits/:encodedEnrolleeId/:encodedMemberUniqueID" element={<Benefits />} />
    </Routes>
  </BrowserRouter>
);

export default App;