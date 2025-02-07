import { 
  FaTooth, 
  FaEye,
  FaUser,
  FaSpinner,
  FaWallet,
  FaGlasses,
  FaHospital,
  FaSyringe,
  FaBriefcaseMedical,
  FaBaby,
  FaSwimmer,
  FaDumbbell,
  FaHeartbeat,
  FaMedkit,
  FaBed
} from 'react-icons/fa';
import EnrolleeHomePage from './EnrolleeHomePage';

const BenefitsDashboard = ({ 
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
  onChangeId 
}) => {
  // Helper function to parse numbers with commas
  const parseNumber = (value) => {
    return typeof value === 'string' 
      ? parseFloat(value.replace(/,/g, '')) 
      : value;
  };

  const formatCurrency = (value) => {
    // Ensure we're working with a number by using parseNumber
    const numValue = parseNumber(value);
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(numValue);
  };

  // Combine benefits into a single array
  const combinedBenefits = [
    ...(dentalBenefits?.result || []).map(benefit => ({
      ...benefit,
      type: 'Dental',
      icon: FaTooth,
      color: 'text-blue-600 bg-blue-50'
    })),
    ...(opticalBenefits?.result || []).map(benefit => ({
      ...benefit,
      type: 'Optical',
      icon: FaEye,
      color: 'text-indigo-600 bg-indigo-50'
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
    ...(vaccines?.result || []).map(benefit => ({
      ...benefit,
      type: 'Vaccines',
      icon: FaSyringe,
      color: 'text-purple-600 bg-purple-50'
    })),
    ...(majorDisease?.result || []).map(benefit => ({
      ...benefit,
      type: 'Major Disease',
      icon: FaBriefcaseMedical,
      color: 'text-yellow-600 bg-yellow-50'
    })),
    ...(fertility?.result || []).map(benefit => ({
      ...benefit,
      type: 'Fertility',
      icon: FaBaby,
      color: 'text-pink-600 bg-pink-50'
    })),
    ...(spa?.result || []).map(benefit => ({
      ...benefit,
      type: 'Spa',
      icon: FaSwimmer,
      color: 'text-teal-600 bg-teal-50'
    })),
    ...(gym?.result || []).map(benefit => ({
      ...benefit,
      type: 'Gym',
      icon: FaDumbbell,
      color: 'text-orange-600 bg-orange-50'
    })),
    ...(annualHealthCheck?.result || []).map(benefit => ({
      ...benefit,
      type: 'Annual Health Check',
      icon: FaHeartbeat,
      color: 'text-emerald-600 bg-emerald-50'
    })),
    ...(physiotherapy?.result || []).map(benefit => ({
      ...benefit,
      type: 'Physiotherapy',
      icon: FaMedkit,
      color: 'text-cyan-600 bg-cyan-50'
    })),
    ...(wardType?.result || []).map(benefit => ({
      ...benefit,
      type: 'Ward Type',
      icon: FaBed,
      color: 'text-rose-600 bg-rose-50'
    }))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <EnrolleeHomePage />
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-200 rounded-full blur-xl opacity-60 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800"></h1>
          <button
            onClick={onChangeId}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <FaUser className="w-5 h-5 text-amber-600" />
            <span className="text-gray-600">Change ID</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <FaSpinner className="w-12 h-12 animate-spin mx-auto text-blue-500 mb-4" />
            <p className="text-gray-600">Loading benefits...</p>
          </div>
        ) : (
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
                  {/* <th className="p-4 text-right">Used</th>
                  <th className="p-4 text-right">Balance</th> */}
                </tr>
              </thead>
              <tbody>
                {combinedBenefits.length > 0 ? (
                  combinedBenefits.map((benefit, index) => (
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
                      {/* <td className="p-4 text-right font-medium text-gray-700">
                        {formatCurrency(benefit.Used)}
                      </td>
                      <td className="p-4 text-right font-medium text-gray-700">
                        {formatCurrency(benefit.Balance)}
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No benefits found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BenefitsDashboard;