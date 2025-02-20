import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EnrolleeModal from './components/EnrolleeModal';
import BenefitsDashboard from './components/BenefitsDashboard';

const decodeId = (encodedId) => {
  try {
    const paddedEncodedId = encodedId + '==='.slice((encodedId.length + 3) % 4);
    return atob(paddedEncodedId);
  } catch (error) {
    console.error('Decoding error:', error);
    return null;
  }
};

const Benefits = () => {
  const { encodedEnrolleeId, encodedMemberUniqueID } = useParams();
  const [loading, setLoading] = useState(true);
  const [benefits, setBenefits] = useState({});
  const [enrolleeInfo, setEnrolleeInfo] = useState(null);
  const [additionalBenefits, setAdditionalBenefits] = useState(null);
  const navigate = useNavigate();

  const originalEnrolleeId = decodeId(encodedEnrolleeId);
  const memberUniqueID = decodeId(encodedMemberUniqueID);

  useEffect(() => {
    if (!originalEnrolleeId || !memberUniqueID) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          bioData, 
          dentalData, 
          lensData, 
          surgeryData, 
          vaccinesData, 
          majorDiseaseData,
          annualHealthChecksData,
          adminDrivenBenefitsData
        ] = await Promise.all([
          axios.get(`https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBioDataByEnrolleeID?enrolleeid=${originalEnrolleeId}`),
          axios.get(`https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_Dental?cifno=${memberUniqueID}`),
          axios.get(`https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_LensFrames?cifno=${memberUniqueID}`),
          axios.get(`https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsB yCif_Surgery?cifno=${memberUniqueID}`),
          axios.get(`https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_Vaccines?cifno=${memberUniqueID}`),
          axios.get(`https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_MajorDisease?cifno=${memberUniqueID}`),
          axios.get(`https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeBenefitsByCif_AnnualHealthChecks?cifno=${memberUniqueID}`),
          axios.get(`https://prognosis-api.leadwayhealth.com/api/EnrolleeProfile/GetEnrolleeServiceBenefitsByCif_AdminDriven?cifno=${memberUniqueID}`)
        ]);

        // Process annual health checks data
        const processedAnnualHealthChecks = {
          ...annualHealthChecksData.data,
          result: annualHealthChecksData.data.result.map(item => ({
            ...item,
            Limit: item.Limit === "0" ? "Covered" : item.Limit
          }))
        };

        // Process vaccines data to handle text content
        const processedVaccines = {
          ...vaccinesData.data,
          result: vaccinesData.data.result.map(item => ({
            ...item,
            Limit: item.Limit === "0" ? "Covered" : item.Limit
          }))
        };

        const roomTypeBenefit = {
          result: [{
            Limit: bioData.data.result[0].RoomTypeCode || 'Standard',
          }]
        };

        // Static telemedicine benefit
        const telemedicineBenefit = {
          result: [{
            Limit: 'Covered',
          }]
        };

        // Process admin driven benefits
        const processedAdminBenefits = {
          ...adminDrivenBenefitsData.data,
          result: adminDrivenBenefitsData.data.result.map(item => ({
            ...item,
            Limit: item.Limit === "0" ? "Covered" : item.Limit
          }))
        };

        setBenefits({
          dentalBenefits: dentalData.data,
          lensFrames: lensData.data,
          surgery: surgeryData.data,
          vaccines: processedVaccines,
          majorDisease: majorDiseaseData.data,
          annualHealthCheck: processedAnnualHealthChecks,
          roomType: roomTypeBenefit,
          telemedicine: telemedicineBenefit
        });
        setAdditionalBenefits(processedAdminBenefits);
        setEnrolleeInfo(bioData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [originalEnrolleeId, memberUniqueID, navigate]);

  return (
    <BenefitsDashboard
      {...benefits}
      additionalBenefits={additionalBenefits}
      enrolleeInfo={enrolleeInfo}
      loading={loading}
      onChangeId={() => navigate('/')}
    />
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<EnrolleeModal />} />
      <Route path="/enrollee-benefits/:encodedEnrolleeId/:encodedMemberUniqueID" element={<Benefits />} />
    </Routes>
  </BrowserRouter>
);

export default App;