import { Link } from "react-router-dom";
import {
  Play,
  Users,
  BookOpen,
  Award,
  UserPlus,
  PlayCircle,
  Quote
} from "lucide-react";

const LandingPage = () => {
  const faqs = [
    {
      q: "Are the courses beginner friendly?",
      a: "Yes, our courses start from basics and gradually move to advanced topics."
    },
    {
      q: "Do I get a certificate?",
      a: "Yes, you receive a verified certificate after course completion."
    },
    {
      q: "Is lifetime access available?",
      a: "Absolutely! Once enrolled, you get lifetime access to the course."
    },
    {
      q: "Can I learn at my own pace?",
      a: "Yes, all courses are self-paced with flexible learning schedules."
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      text:
        "This platform completely changed my career. The courses are practical and easy to follow."
    },
    {
      name: "Anjali Verma",
      role: "Software Engineer",
      text:
        "Best learning experience ever! I landed my first job after completing the courses."
    },
    {
      name: "Amit Patel",
      role: "CS Student",
      text:
        "Amazing instructors and well-structured content. Highly recommended!"
    }
  ];

  return (
    <>
    
      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: UserPlus, title: "Create Account", desc: "Quick sign up" },
              { icon: PlayCircle, title: "Start Learning", desc: "Watch & practice" },
              { icon: Award, title: "Get Certified", desc: "Showcase skills" }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-dark-100 p-8 rounded-2xl border border-dark-200"
              >
                <item.icon className="w-10 h-10 text-primary-500 mx-auto mb-4" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-dark-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Testimonials</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-dark-50 p-8 rounded-2xl border border-dark-200"
              >
                <Quote className="text-primary-500 mb-4 mx-auto" />
                <p className="text-sm mb-4">“{t.text}”</p>
                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-xs text-dark-600">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 bg-dark-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">FAQs</h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-dark-100 p-6 rounded-xl border border-dark-200"
              >
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-sm text-dark-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
