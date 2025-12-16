import { Target, Users, Award, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-dark-100 via-dark-50 to-dark-100 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-dark-900 mb-6">
            About <span className="text-primary-500">StudyNotion</span>
          </h1>
          <p className="text-xl text-dark-700 max-w-3xl mx-auto">
            We're on a mission to make quality education accessible to everyone,
            everywhere. Learn from industry experts and build skills that matter.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-dark-900 mb-6">
              Our <span className="text-primary-500">Mission</span>
            </h2>
            <p className="text-dark-700 text-lg leading-relaxed mb-4">
              At StudyNotion, we believe that education is the key to unlocking
              human potential. Our mission is to provide accessible, high-quality
              learning experiences that empower individuals to achieve their goals.
            </p>
            <p className="text-dark-700 text-lg leading-relaxed">
              We're building a platform where anyone can learn anything, from
              anywhere, at their own pace. Whether you're looking to start a new
              career, develop new skills, or simply explore your interests, we're
              here to support your journey.
            </p>
          </div>
          <div className="relative">
            <div className="bg-primary-500/10 rounded-lg p-8">
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-dark-100 border border-dark-200 rounded-lg p-4">
                    <div className="h-4 bg-primary-500/20 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-dark-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-dark-900 mb-12">
            Our <span className="text-primary-500">Values</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-dark-50 border border-dark-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">
                Excellence
              </h3>
              <p className="text-dark-700">
                We strive for excellence in everything we do, from course quality
                to student support.
              </p>
            </div>

            <div className="bg-dark-50 border border-dark-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">
                Community
              </h3>
              <p className="text-dark-700">
                We foster a supportive learning community where everyone can grow
                together.
              </p>
            </div>

            <div className="bg-dark-50 border border-dark-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">
                Quality
              </h3>
              <p className="text-dark-700">
                Every course is carefully curated to ensure the highest quality
                learning experience.
              </p>
            </div>

            <div className="bg-dark-50 border border-dark-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">
                Innovation
              </h3>
              <p className="text-dark-700">
                We continuously innovate to provide the best learning tools and
                experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-primary-500 mb-2">10K+</div>
            <div className="text-dark-700">Active Students</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary-500 mb-2">500+</div>
            <div className="text-dark-700">Courses</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary-500 mb-2">100+</div>
            <div className="text-dark-700">Expert Instructors</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary-500 mb-2">95%</div>
            <div className="text-dark-700">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
