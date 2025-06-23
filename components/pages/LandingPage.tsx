interface LandingPageProps {
  onShowLoginModal: () => void;
  onShowSignupModal: () => void;
}

const LandingPage = ({
  onShowLoginModal,
  onShowSignupModal,
}: LandingPageProps) => (
  <div className="min-h-screen bg-white">
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">in</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-blue-700">
              NetworX
            </span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={onShowLoginModal}
              className="cursor-pointer text-gray-700 hover:text-gray-900 font-medium text-sm md:text-base"
            >
              Sign in
            </button>
            <button
              onClick={onShowSignupModal}
              className="cursor-pointer bg-transparent border-2 border-blue-700 text-blue-700 px-3 py-1 md:px-6 md:py-2 rounded-full font-medium hover:bg-blue-50 transition-colors text-sm md:text-base"
            >
              Join now
            </button>
          </div>
        </div>
      </div>
    </header>

    <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 md:mb-6 leading-tight">
            Welcome to your
            <br />
            professional community
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
            Connect with professionals, discover opportunities, and build your
            career with NetworX.
          </p>
          <button
            onClick={onShowSignupModal}
            className="cursor-pointer bg-blue-700 text-white px-6 py-3 md:px-8 md:py-3 rounded-full text-base md:text-lg font-medium hover:bg-blue-800 transition-colors w-full sm:w-auto"
          >
            Join NetworX
          </button>
          <div className="mt-6 md:mt-8 text-sm text-gray-500 text-center sm:text-left">
            Already have an account?
            <button
              onClick={onShowLoginModal}
              className="cursor-pointer text-blue-700 hover:underline ml-1"
            >
              Sign in
            </button>
          </div>
        </div>
        <div className="relative order-1 lg:order-2">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Professional networking"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    </main>
  </div>
);

export default LandingPage;
