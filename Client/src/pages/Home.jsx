import HeroSection from '../components/core/HomePage/HeroSection';

const Home = () => {
  return (
    <div className="bg-dark-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Why Choose <span className="text-primary-500">StudyNotion</span>
        </h2>
        <p className="text-center text-dark-500 mb-12 max-w-2xl mx-auto">
          Transform your career with our comprehensive learning platform
        </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-dark-100 p-8 rounded-xl border-2 border-dark-200 hover:border-primary-500 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300">
          <div className="w-16 h-16 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
            <span className="text-primary-500 text-3xl">📚</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            Comprehensive Courses
          </h3>
          <p className="text-dark-500 leading-relaxed">
            Access a wide range of courses from beginner to advanced levels in various programming languages.
          </p>
        </div>

        <div className="bg-dark-100 p-8 rounded-xl border-2 border-dark-200 hover:border-primary-500 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300">
          <div className="w-16 h-16 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
            <span className="text-primary-500 text-3xl">👨‍🏫</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            Expert Instructors
          </h3>
          <p className="text-dark-500 leading-relaxed">
            Learn from industry professionals with years of experience in software development and teaching.
          </p>
        </div>

        <div className="bg-dark-100 p-8 rounded-xl border-2 border-dark-200 hover:border-primary-500 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300">
          <div className="w-16 h-16 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
            <span className="text-primary-500 text-3xl">🎓</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            Certification
          </h3>
          <p className="text-dark-500 leading-relaxed">
            Earn certificates upon completion to showcase your skills and boost your career prospects.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-dark-100 border border-dark-200 rounded-2xl p-12 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-primary-500 mb-2">10K+</div>
            <div className="text-dark-500 font-medium">Active Students</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary-500 mb-2">500+</div>
            <div className="text-dark-500 font-medium">Courses</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary-500 mb-2">100+</div>
            <div className="text-dark-500 font-medium">Expert Mentors</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary-500 mb-2">95%</div>
            <div className="text-dark-500 font-medium">Success Rate</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
// export default Home;
