// import { useState, useMemo } from 'react';
// import { 
//   FaTooth, 
//   FaUser, 
//   FaSpinner, 
//   FaWallet, 
//   FaGlasses, 
//   FaHospital, 
//   FaSyringe, 
//   FaBriefcaseMedical, 
//   FaHeartbeat, 
//   FaBed, 
//   FaUserNurse, 
//   FaChevronDown, 
//   FaChevronUp, 
//   FaEllipsisH 
// } from 'react-icons/fa';
// import EnrolleeHomePage from './EnrolleeHomePage';

// const BenefitsDashboard = ({ 
//   dentalBenefits, 
//   lensFrames,
//   surgery,
//   vaccines,
//   majorDisease,
//   annualHealthCheck,
//   telemedicine,
//   roomType,
//   additionalBenefits,
//   enrolleeInfo,
//   loading, 
//   onChangeId 
// }) => {
//   const [showVaccines, setShowVaccines] = useState(false);
//   const [showAnnualHealthChecks, setShowAnnualHealthChecks] = useState(false);
//   const [showAdditionalBenefits, setShowAdditionalBenefits] = useState(false);

//   const toggleVaccines = () => setShowVaccines(!showVaccines);
//   const toggleAnnualHealthChecks = () => setShowAnnualHealthChecks(!showAnnualHealthChecks);

//   const parseNumber = (value) => {
//     return typeof value === 'string' 
//       ? parseFloat(value.replace(/,/g, '')) 
//       : value;
//   };

//   const formatCurrency = (value) => {
//     if (value === 'None') return value;
//     const numValue = parseNumber(value);
//     if (isNaN(numValue)) return value;
//     return new Intl.NumberFormat('en-NG', {
//       style: 'currency',
//       currency: 'NGN'
//     }).format(numValue);
//   };

//   // Memoize the combined benefits to prevent unnecessary recalculations
//   const combinedBenefits = useMemo(() => {
//     const benefitsConfig = [
//       {
//         data: dentalBenefits?.result,
//         type: 'Dental',
//         icon: FaTooth,
//         color: 'text-blue-600 bg-blue-50',
//         key: 'dental'
//       },
//       {
//         data: lensFrames?.result,
//         type: 'Lens Frames',
//         icon: FaGlasses,
//         color: 'text-green-600 bg-green-50',
//         key: 'lensFrames'
//       },
//       {
//         data: surgery?.result,
//         type: 'Surgery',
//         icon: FaHospital,
//         color: 'text-red-600 bg-red-50',
//         key: 'surgery'
//       },
//       {
//         data: majorDisease?.result,
//         type: 'Major Disease',
//         icon: FaBriefcaseMedical,
//         color: 'text-yellow-600 bg-yellow-50',
//         key: 'majorDisease'
//       },
//       {
//         data: telemedicine?.result,
//         type: 'TeleMedicine',
//         icon: FaUserNurse,
//         color: 'text-blue-600 bg-rose-100',
//         key: 'telemedicine'
//       },
//       {
//         data: roomType?.result,
//         type: 'Room Type',
//         icon: FaBed,
//         color: 'text-rose-600 bg-rose-50',
//         key: 'roomType'
//       }
//     ];

//     return benefitsConfig
//       .filter(config => config.data && config.data.length > 0)
//       .map(config => ({
//         ...config.data[0],
//         type: config.type,
//         icon: config.icon,
//         color: config.color,
//         key: config.key
//       }));
//   }, [dentalBenefits, lensFrames, surgery, majorDisease, telemedicine, roomType]);

//   // Memoize and deduplicate additional benefits
//   const uniqueAdditionalBenefits = useMemo(() => {
//     if (!additionalBenefits?.result) return [];
    
//     // Create a Map using Benefit as the key to ensure uniqueness
//     const benefitsMap = new Map();
//     additionalBenefits.result.forEach(benefit => {
//       if (!benefitsMap.has(benefit.Benefit)) {
//         benefitsMap.set(benefit.Benefit, benefit);
//       }
//     });
    
//     return Array.from(benefitsMap.values());
//   }, [additionalBenefits]);

//   const memberInfo = enrolleeInfo?.result?.[0];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <EnrolleeHomePage />
//       <div className="fixed inset-0 -z-10">
//         <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-200 rounded-full blur-xl opacity-60 animate-pulse delay-1000"></div>
//       </div>

//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           {memberInfo && (
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">
//                 {memberInfo.Member_FirstName} {memberInfo.Member_Surname}
//               </h2>
//               <p className="text-sm font-bold text-gray-600 mt-1">
//                 Plan: {memberInfo.Member_Plan || 'Standard'}
//               </p>
//               <p className="text-sm font-bold text-gray-600 mt-1">
//                 Status: {memberInfo.Member_MemberStatus_Description || 'Deactivated'}
//               </p>
//               <p className="text-sm font-bold text-gray-600 mt-1">
//                 Mail: {memberInfo.Member_EmailAddress_One || 'None'}
//               </p>
//               <p className="text-sm font-bold text-gray-600 mt-1">
//                 Phone: {memberInfo.Member_Phone_One || 'None'}
//               </p>
//             </div>
//           )}
//           <button
//             onClick={onChangeId}
//             className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
//           >
//             <FaUser className="w-5 h-5 text-amber-600" />
//             <span className="text-gray-600">Logout</span>
//           </button>
//         </div>

//         {loading ? (
//           <div className="text-center py-8">
//             <FaSpinner className="w-12 h-12 animate-spin mx-auto text-blue-950 mb-4" />
//             <p className="text-gray-600">Loading benefits...</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
//               <table className="w-full">
//                 <thead className="bg-gray-100 border-b">
//                   <tr className="bg-red-600">
//                     <th className="p-4 text-left gap-4">
//                       <span className="flex items-center gap-4">
//                         <FaWallet className="w-6 h-6 text-amber-50" />
//                         Benefit Type
//                       </span>
//                     </th>
//                     <th className="p-12 text-left">Limit</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {combinedBenefits.map((benefit) => (
//                     <tr 
//                       key={benefit.key} 
//                       className="border-b hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="p-4">
//                         <div className="flex items-center gap-3">
//                           <benefit.icon 
//                             className={`w-8 h-8 ${benefit.color} p-1 rounded-full`} 
//                           />
//                           <span className="font-semibold text-gray-800">
//                             {benefit.type}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="p-4 text-left font-medium text-gray-700">
//                         {formatCurrency(benefit.Limit)}
//                       </td>
//                     </tr>
//                   ))}

//                   {/* Vaccines Dropdown */}
//                   {vaccines?.result?.length > 0 && (
//                     <tr 
//                       className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
//                       onClick={toggleVaccines}
//                     >
//                       <td className="p-4">
//                         <div className="flex items-center gap-3">
//                           <FaSyringe className="w-8 h-8 text-purple-600 bg-purple-50 p-1 rounded-full" />
//                           <span className="font-semibold text-gray-800">Vaccines</span>
//                         </div>
//                       </td>
//                       <td className="p-4 text-left font-medium text-gray-700">
//                         {showVaccines ? <FaChevronUp className="w-4 h-4 text-gray-500" /> : <FaChevronDown className="w-4 h-4 text-gray-500" />}
//                       </td>
//                     </tr>
//                   )}
//                   {showVaccines && vaccines?.result?.[0] && (
//                     <tr className="border-b bg-gray-100">
//                       <td colSpan={2} className="p-4 text-gray-800">{vaccines.result[0].Vaccines}</td>
//                     </tr>
//                   )}

//                   {/* Annual Health Checks Dropdown */}
//                   {annualHealthCheck?.result?.length > 0 && (
//                     <tr 
//                       className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
//                       onClick={toggleAnnualHealthChecks}
//                     >
//                       <td className="p-4">
//                         <div className="flex items-center gap-3">
//                           <FaHeartbeat className="w-8 h-8 text-emerald-600 bg-emerald-50 p-1 rounded-full" />
//                           <span className="font-semibold text-gray-800">Annual Health Checks</span>
//                         </div>
//                       </td>
//                       <td className="p-4 text-left font-medium text-gray-700">
//                         {showAnnualHealthChecks ? <FaChevronUp className="w-4 h-4 text-gray-500" /> : <FaChevronDown className="w-4 h-4 text-gray-500" />}
//                       </td>
//                     </tr>
//                   )}
//                   {showAnnualHealthChecks && annualHealthCheck?.result?.[0] && (
//                     <tr className="border-b bg-gray-100">
//                       <td colSpan={2} className="p-4 text-gray-800">{annualHealthCheck.result[0].AnnualHealthChecks}</td>
//                     </tr>
//                   )}

//                   {/* Additional Benefits Section */}
//                   {uniqueAdditionalBenefits.length > 0 && (
//                     <tr 
//                       onClick={() => setShowAdditionalBenefits(!showAdditionalBenefits)}
//                       className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
//                     >
//                       <td className="p-4">
//                         <div className="flex items-center gap-3">
//                           <FaEllipsisH 
//                             className="w-8 h-8 text-amber-600 bg-amber-50 p-1 rounded-full"
//                           />
//                           <span className="font-semibold text-gray-800 flex items-center gap-2">
//                             Other Benefits
//                             {showAdditionalBenefits ? 
//                               <FaChevronUp className="w-4 h-4 text-gray-500" /> : 
//                               <FaChevronDown className="w-4 h-4 text-gray-500" />
//                             }
//                           </span>
//                         </div>
//                       </td>
//                       <td className="p-4 text-left font-medium text-gray-700">
//                         {uniqueAdditionalBenefits.length} Additional Benefits
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Additional Benefits Expanded View */}
//             {showAdditionalBenefits && uniqueAdditionalBenefits.length > 0 && (
//               <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300">
//                 <table className="w-full">
//                   <thead className="bg-amber-50">
//                     <tr>
//                       <th className="p-4 text-left text-amber-900">Benefit</th>
//                       <th className="p-4 text-left text-amber-900">Limit</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {uniqueAdditionalBenefits.map((benefit, index) => (
//                       <tr 
//                         key={`${benefit.Benefit}-${index}`}
//                         className="border-b hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="p-4 text-gray-800">{benefit.Benefit}</td>
//                         <td className="p-4 font-medium text-gray-700">
//                           {formatCurrency(benefit.Limit)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BenefitsDashboard;


import { useState, useMemo } from 'react';
import { 
  FaTooth, 
  FaUser, 
  FaSpinner, 
  FaWallet, 
  FaGlasses, 
  FaHospital, 
  FaSyringe, 
  FaBriefcaseMedical, 
  FaHeartbeat, 
  FaBed, 
  FaUserNurse,
  FaEllipsisH,
  FaPlus,
  FaMinus
} from 'react-icons/fa';
import EnrolleeHomePage from './EnrolleeHomePage';

const BenefitsDashboard = ({ 
  dentalBenefits, 
  lensFrames,
  surgery,
  vaccines,
  majorDisease,
  annualHealthCheck,
  telemedicine,
  roomType,
  additionalBenefits,
  enrolleeInfo,
  loading, 
  onChangeId 
}) => {
  const [showVaccines, setShowVaccines] = useState(false);
  const [showAnnualHealthChecks, setShowAnnualHealthChecks] = useState(false);
  const [showAdditionalBenefits, setShowAdditionalBenefits] = useState(false);
  const [expandedBenefits, setExpandedBenefits] = useState({});
  const [expandedAdditionalBenefits, setExpandedAdditionalBenefits] = useState({});

  const toggleVaccines = () => setShowVaccines(!showVaccines);
  const toggleAnnualHealthChecks = () => setShowAnnualHealthChecks(!showAnnualHealthChecks);
  
  const toggleBenefitDetails = (key) => {
    setExpandedBenefits(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleAdditionalBenefitDetails = (index) => {
    setExpandedAdditionalBenefits(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const parseNumber = (value) => {
    return typeof value === 'string' 
      ? parseFloat(value.replace(/,/g, '')) 
      : value;
  };

  const formatCurrency = (value) => {
    if (value === 'None' || value === undefined || value === null) return 'N/A';
    const numValue = parseNumber(value);
    if (isNaN(numValue)) return value;
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(numValue);
  };

  // Memoize the combined benefits to prevent unnecessary recalculations
  const combinedBenefits = useMemo(() => {
    const benefitsConfig = [
      {
        data: dentalBenefits?.result,
        type: 'Dental',
        icon: FaTooth,
        color: 'text-blue-600 bg-blue-50',
        key: 'dental'
      },
      {
        data: lensFrames?.result,
        type: 'Lens Frames',
        icon: FaGlasses,
        color: 'text-green-600 bg-green-50',
        key: 'lensFrames'
      },
      {
        data: surgery?.result,
        type: 'Surgery',
        icon: FaHospital,
        color: 'text-red-600 bg-red-50',
        key: 'surgery'
      },
      {
        data: majorDisease?.result,
        type: 'Major Disease',
        icon: FaBriefcaseMedical,
        color: 'text-yellow-600 bg-yellow-50',
        key: 'majorDisease'
      },
      {
        data: telemedicine?.result,
        type: 'TeleMedicine',
        icon: FaUserNurse,
        color: 'text-blue-600 bg-rose-100',
        key: 'telemedicine'
      },
      {
        data: roomType?.result,
        type: 'Room Type',
        icon: FaBed,
        color: 'text-rose-600 bg-rose-50',
        key: 'roomType'
      }
    ];

    return benefitsConfig
      .filter(config => config.data && config.data.length > 0)
      .map(config => ({
        ...config.data[0],
        type: config.type,
        icon: config.icon,
        color: config.color,
        key: config.key
      }));
  }, [dentalBenefits, lensFrames, surgery, majorDisease, telemedicine, roomType]);

  // Memoize and deduplicate additional benefits
  const uniqueAdditionalBenefits = useMemo(() => {
    if (!additionalBenefits?.result) return [];
    
    // Create a Map using Benefit as the key to ensure uniqueness
    const benefitsMap = new Map();
    additionalBenefits.result.forEach(benefit => {
      if (!benefitsMap.has(benefit.Benefit)) {
        benefitsMap.set(benefit.Benefit, benefit);
      }
    });
    
    return Array.from(benefitsMap.values());
  }, [additionalBenefits]);

  const memberInfo = enrolleeInfo?.result?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3">
      <EnrolleeHomePage />
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-200 rounded-full blur-xl opacity-60 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          {memberInfo && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {memberInfo.Member_FirstName} {memberInfo.Member_Surname}
              </h2>
              <p className="text-sm font-bold text-gray-600">
                Mail: {memberInfo.Member_EnrolleeID || 'None'}
              </p>
              <p className="text-sm font-bold text-gray-600">
                Plan: {memberInfo.Member_Plan || 'Standard'}
              </p>
              <p className="text-sm font-bold text-gray-600">
                Status: {memberInfo.Member_MemberStatus_Description || 'Deactivated'}
              </p>
              <p className="text-sm font-bold text-gray-600">
                Mail: {memberInfo.Member_EmailAddress_One || 'None'}
              </p>
              <p className="text-sm font-bold text-gray-600">
                Phone: {memberInfo.Member_Phone_One || 'None'}
              </p>
            </div>
          )}
          <button
            onClick={onChangeId}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <FaUser className="w-5 h-5 text-amber-600" />
            <span className="text-gray-600">Logout</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <FaSpinner className="w-12 h-12 animate-spin mx-auto text-blue-950 mb-4" />
            <p className="text-gray-600">Loading benefits...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr className="bg-red-600">
                    <th className="p-4 text-left gap-4">
                      <span className="flex items-center gap-4">
                        <FaWallet className="w-6 h-6 text-amber-50" />
                        Benefit Type
                      </span>
                    </th>
                    <th className="p-12 text-left">Limit</th>
                  </tr>
                </thead>
                <tbody>
                  {combinedBenefits.map((benefit) => (
                    <>
                      <tr 
                        key={benefit.key} 
                        className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => toggleBenefitDetails(benefit.key)}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <benefit.icon 
                              className={`w-8 h-8 ${benefit.color} p-1 rounded-full`} 
                            />
                            <span className="font-semibold text-gray-800 flex items-center gap-2">
                              {benefit.type}
                              {expandedBenefits[benefit.key] ? 
                                <FaMinus className="w-3 h-3 text-gray-500" /> : 
                                <FaPlus className="w-3 h-3 text-gray-500" />
                              }
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-left font-medium text-gray-700">
                          {formatCurrency(benefit.Limit)}
                        </td>
                      </tr>
                      {expandedBenefits[benefit.key] && (
                        <tr className="border-b bg-gray-50">
                          <td colSpan={2} className="px-4 py-3">
                            <div className="grid grid-cols-2 gap-4 ml-11">
                              <div>
                                <p className="text-sm text-gray-500">Balance</p>
                                <p className="font-medium text-gray-800">{formatCurrency(benefit.Balance)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Used</p>
                                <p className="font-medium text-gray-800">{formatCurrency(benefit.Used)}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}

                  {/* Vaccines Dropdown */}
                  {vaccines?.result?.length > 0 && (
                    <tr 
                      className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={toggleVaccines}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <FaSyringe className="w-8 h-8 text-purple-600 bg-purple-50 p-1 rounded-full" />
                          <span className="font-semibold text-gray-800 flex items-center gap-2">
                            Vaccines
                            {showVaccines ? 
                              <FaMinus className="w-3 h-3 text-gray-500" /> : 
                              <FaPlus className="w-3 h-3 text-gray-500" />
                            }
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-left font-medium text-gray-700">
                        {vaccines.result[0].Limit ? formatCurrency(vaccines.result[0].Limit) : 'Available'}
                      </td>
                    </tr>
                  )}
                  {showVaccines && vaccines?.result?.[0] && (
                    <tr className="border-b bg-gray-50">
                      <td colSpan={2} className="px-4 py-3">
                        <div className="grid grid-cols-2 gap-4 ml-11">
                          <div>
                            <p className="text-sm text-gray-500">Details</p>
                            <p className="font-medium text-gray-800">{vaccines.result[0].Vaccines || 'No details available'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Balance</p>
                            <p className="font-medium text-gray-800">{formatCurrency(vaccines.result[0].Balance)}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* Annual Health Checks Dropdown */}
                  {annualHealthCheck?.result?.length > 0 && (
                    <tr 
                      className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={toggleAnnualHealthChecks}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <FaHeartbeat className="w-8 h-8 text-emerald-600 bg-emerald-50 p-1 rounded-full" />
                          <span className="font-semibold text-gray-800 flex items-center gap-2">
                            Annual Health Checks
                            {showAnnualHealthChecks ? 
                              <FaMinus className="w-3 h-3 text-gray-500" /> : 
                              <FaPlus className="w-3 h-3 text-gray-500" />
                            }
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-left font-medium text-gray-700">
                        {annualHealthCheck.result[0].Limit ? formatCurrency(annualHealthCheck.result[0].Limit) : 'Available'}
                      </td>
                    </tr>
                  )}
                  {showAnnualHealthChecks && annualHealthCheck?.result?.[0] && (
                    <tr className="border-b bg-gray-50">
                      <td colSpan={2} className="px-4 py-3">
                        <div className="grid grid-cols-2 gap-4 ml-11">
                          <div>
                            <p className="text-sm text-gray-500">Details</p>
                            <p className="font-medium text-gray-800">{annualHealthCheck.result[0].AnnualHealthChecks || 'No details available'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Balance</p>
                            <p className="font-medium text-gray-800">{formatCurrency(annualHealthCheck.result[0].Balance)}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* Additional Benefits Section */}
                  {uniqueAdditionalBenefits.length > 0 && (
                    <tr 
                      onClick={() => setShowAdditionalBenefits(!showAdditionalBenefits)}
                      className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <FaEllipsisH 
                            className="w-8 h-8 text-amber-600 bg-amber-50 p-1 rounded-full"
                          />
                          <span className="font-semibold text-gray-800 flex items-center gap-2">
                            Other Benefits
                            {showAdditionalBenefits ? 
                              <FaMinus className="w-3 h-3 text-gray-500" /> : 
                              <FaPlus className="w-3 h-3 text-gray-500" />
                            }
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-left font-medium text-gray-700">
                        {uniqueAdditionalBenefits.length} Additional Benefits
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Additional Benefits Expanded View */}
            {showAdditionalBenefits && uniqueAdditionalBenefits.length > 0 && (
              <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300">
                <table className="w-full">
                  <thead className="bg-amber-50">
                    <tr>
                      <th className="p-4 text-left text-amber-900">Benefit</th>
                      <th className="p-4 text-left text-amber-900">Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniqueAdditionalBenefits.map((benefit, index) => (
                      <>
                        <tr 
                          key={`${benefit.Benefit}-${index}`}
                          className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => toggleAdditionalBenefitDetails(index)}
                        >
                          <td className="p-4 text-gray-800">
                            <span className="flex items-center gap-2">
                              {benefit.Benefit}
                              {expandedAdditionalBenefits[index] ? 
                                <FaMinus className="w-3 h-3 text-gray-500" /> : 
                                <FaPlus className="w-3 h-3 text-gray-500" />
                              }
                            </span>
                          </td>
                          <td className="p-4 font-medium text-gray-700">
                            {formatCurrency(benefit.Limit)}
                          </td>
                        </tr>
                        {expandedAdditionalBenefits[index] && (
                          <tr className="border-b bg-gray-50">
                            <td colSpan={2} className="px-4 py-3">
                              <div className="grid grid-cols-2 gap-4 ml-6">
                                <div>
                                  <p className="text-sm text-gray-500">Balance</p>
                                  <p className="font-medium text-gray-800">{formatCurrency(benefit.Balance)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Used</p>
                                  <p className="font-medium text-gray-800">{formatCurrency(benefit.Used)}</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BenefitsDashboard;
