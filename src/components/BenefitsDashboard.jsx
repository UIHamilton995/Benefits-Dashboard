import { useState } from 'react';
import { FaTooth, FaUser, FaSpinner, FaWallet, FaGlasses, FaHospital, FaSyringe, FaBriefcaseMedical, FaHeartbeat, FaBed, FaUserNurse, FaChevronDown, FaChevronUp, FaEllipsisH } from 'react-icons/fa';
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


  const toggleVaccines = () => {
    setShowVaccines(!showVaccines);
  };

  const toggleAnnualHealthChecks = () => {
    setShowAnnualHealthChecks(!showAnnualHealthChecks);
  };

  const parseNumber = (value) => {
    return typeof value === 'string' 
      ? parseFloat(value.replace(/,/g, '')) 
      : value;
  };

  const formatCurrency = (value) => {
    if (value === 'None') return value;
    const numValue = parseNumber(value);
    if (isNaN(numValue)) return value;
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(numValue);
  };

  const combinedBenefits = [
    ...(dentalBenefits?.result || []).map(benefit => ({
      ...benefit,
      type: 'Dental',
      icon: FaTooth,
      color: 'text-blue-600 bg-blue-50'
    })),
    ...(lensFrames?.result || []).map(benefit => ({
      ...benefit,
      type: 'Lens Frames',
      icon: FaGlasses,
      color: 'text-green-600 bg-green-50'
    })),
    ...(surgery?.result || []).map(benefit => ({
      ...benefit,
      type: 'Surgery',
      icon: FaHospital,
      color: 'text-red-600 bg-red-50'
    })),
    ...(majorDisease?.result || []).map(benefit => ({
      ...benefit,
      type: 'Major Disease',
      icon: FaBriefcaseMedical,
      color: 'text-yellow-600 bg-yellow-50'
    })),
    ...(telemedicine?.result || []).map(benefit => ({
      ...benefit,
      type: 'TeleMedicine',
      icon: FaUserNurse,
      color: 'text-blue-600 bg-rose-100'
    })),
    ...(roomType?.result || []).map(benefit => ({
      ...benefit,
      type: 'Room Type',
      icon: FaBed,
      color: 'text-rose-600 bg-rose-50'
    })),
  ];

  const memberInfo = enrolleeInfo?.result?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <EnrolleeHomePage />
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-200 rounded-full blur-xl opacity-60 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          {memberInfo && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {memberInfo.Member_FirstName} {memberInfo.Member_Surname}
              </h2>
              <p className="text-sm font-bold text-gray-600 mt-1">
                Plan: {memberInfo.Member_Plan || 'Standard'}
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
                  {combinedBenefits.map((benefit, index) => (
                    <tr 
                      key={index} 
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <benefit.icon 
                            className={`w-8 h-8 ${benefit.color} p-1 rounded-full`} 
                          />
                          <span className="font-semibold text-gray-800">
                            {benefit.type}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-left font-medium text-gray-700">
                        {formatCurrency(benefit.Limit)}
                      </td>
                    </tr>
                  ))}

                  {/* Vaccines Dropdown */}
                  {vaccines?.result?.length > 0 && (
                    <tr className="border-b hover:bg-gray-50 transition-colors cursor-pointer">
                      <td
                        onClick={toggleVaccines}
                        className="p-4"
                      >
                        <div className="flex items-center gap-3">
                          <FaSyringe className="w-8 h-8 text-purple-600 bg-purple-50 p-1 rounded-full" />
                          <span className="font-semibold text-gray-800">Vaccines</span>
                        </div>
                      </td>
                      <td className="p-4 text-left font-medium text-gray-700">
                        {showVaccines ? <FaChevronUp className="w-4 h-4 text-gray-500" /> : <FaChevronDown className="w-4 h-4 text-gray-500" />}
                      </td>
                    </tr>
                  )}
                  {showVaccines && vaccines.result && (
                    <tr className="border-b bg-gray-100">
                      <td colSpan={2} className="p-4 text-gray-800">{vaccines.result[0].Vaccines}</td>
                    </tr>
                  )}

                  {/* Annual Health Checks Dropdown */}
                  {annualHealthCheck?.result?.length > 0 && (
                    <tr className="border-b hover:bg-gray-50 transition-colors cursor-pointer">
                      <td
                        onClick={toggleAnnualHealthChecks}
                        className="p-4"
                      >
                        <div className="flex items-center gap-3">
                          <FaHeartbeat className="w-8 h-8 text-emerald-600 bg-emerald-50 p-1 rounded-full" />
                          <span className="font-semibold text-gray-800">Annual Health Checks</span>
                        </div>
                      </td>
                      <td className="p-4 text-left font-medium text-gray-700">
                        {showAnnualHealthChecks ? <FaChevronUp className="w-4 h-4 text-gray-500" /> : <FaChevronDown className="w-4 h-4 text-gray-500" />}
                      </td>
                    </tr>
                  )}
                  {showAnnualHealthChecks && annualHealthCheck.result && (
                    <tr className="border-b bg-gray-100">
                      <td colSpan={2} className="p-4 text-gray-800">{annualHealthCheck.result[0].AnnualHealthChecks}</td>
                    </tr>
                  )}

                  {additionalBenefits?.result?.length > 0 && (
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
                              <FaChevronUp className="w-4 h-4 text-gray-500" /> : 
                              <FaChevronDown className="w-4 h-4 text-gray-500" />
                            }
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-left font-medium text-gray-700">
                        {additionalBenefits.result.length} Additional Benefits
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Additional Benefits Expanded View */}
            {showAdditionalBenefits && additionalBenefits?.result?.length > 0 && (
              <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300">
                <table className="w-full">
                  <thead className="bg-amber-50">
                    <tr>
                      <th className="p-4 text-left text-amber-900">Benefit</th>
                      <th className="p-4 text-left text-amber-900">Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {additionalBenefits.result.map((benefit, index) => (
                      <tr 
                        key={index}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4 text-gray-800">{benefit.Benefit}</td>
                        <td className="p-4 font-medium text-gray-700">
                          {formatCurrency(benefit.Limit)}
                        </td>
                      </tr>
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
