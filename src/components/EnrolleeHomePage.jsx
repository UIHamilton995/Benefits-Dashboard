import logo from '../assets/Leadway Health Logo.svg'

const EnrolleeHomePage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-2">
        <img src={logo} alt="Leadway Health Logo" />
        <h1 className="text-3xl font-bold text-gray-800">Benefits Dashboard</h1>
        <p className="text-gray-600">Explore your entitlements as an enrolee</p>
      </div>
    </div>
  )
}

export default EnrolleeHomePage;