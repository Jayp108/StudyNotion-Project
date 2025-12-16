import { Link } from "react-router-dom";
import { Play, Users, BookOpen, Award } from "lucide-react";
import LandingPage from "../../../pages/Landingpage";

const HeroSection = () => {
  return (<>
    <section className="relative min-h-screen bg-gradient-to-br from-dark-100 via-dark-50 to-dark-100 pt-24 pb-16 overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-300/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-500 text-sm font-medium">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              Trusted by 50,000+ Students
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-dark-900">
              Learn Skills That
              <span className="block bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                Shape Your Future
              </span>
            </h1>

            <p className="text-lg text-dark-700 max-w-xl">
              Access world-class courses from industry experts. Build real-world
              skills, earn certificates, and advance your career.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/courses"
                className="px-8 py-4 rounded-xl bg-primary-500 text-white font-semibold text-center hover:bg-primary-600 transition shadow-lg"
              >
                Explore Courses
              </Link>

              <button className="px-8 py-4 rounded-xl border border-primary-500 text-primary-500 font-semibold flex items-center justify-center gap-2 hover:bg-primary-500/10 transition">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-dark-200">
              <div>
                <div className="flex items-center gap-2 text-primary-500">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-2xl font-bold">500+</span>
                </div>
                <p className="text-sm text-dark-600">Courses</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-primary-500">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-bold">50K+</span>
                </div>
                <p className="text-sm text-dark-600">Students</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-primary-500">
                  <Award className="w-5 h-5" />
                  <span className="text-2xl font-bold">200+</span>
                </div>
                <p className="text-sm text-dark-600">Instructors</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="bg-dark-100 rounded-3xl shadow-xl overflow-hidden border border-dark-200">
              <div className="aspect-video bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:scale-110 transition cursor-pointer">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-700" />
                  <div>
                    <p className="font-semibold text-dark-900">Sarah Johnson</p>
                    <p className="text-sm text-dark-600">
                      Senior Developer at Google
                    </p>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-dark-900">
                  Complete Web Development Bootcamp
                </h3>

                <div className="flex items-center gap-4 text-sm text-dark-600">
                  <span>42 hours</span>
                  <span>•</span>
                  <span>156 lessons</span>
                  <span>•</span>
                  <span className="text-primary-500 font-semibold">4.9 ★</span>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-dark-100 rounded-2xl p-4 shadow-lg border border-dark-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p className="font-semibold text-dark-900">Certificate</p>
                  <p className="text-xs text-dark-600">Upon completion</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-dark-100 rounded-2xl p-4 shadow-lg border border-dark-200">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary-600" />
                  <div className="w-8 h-8 rounded-full bg-primary-400" />
                  <div className="w-8 h-8 rounded-full bg-primary-200" />
                </div>
                <p className="text-sm font-medium text-dark-900">+2.5k enrolled</p>
              </div>
            </div>
            

          </div>
          
        </div>
        
      </div>
      
    </section>
    <LandingPage/>
    </>
    
  );
};

export default HeroSection;

