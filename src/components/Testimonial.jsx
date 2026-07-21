import { useState } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      name: "Mohamed Ali",
      role: "Patient",
      text: "Excellent doctors and professional service. The hospital staff were very friendly and caring.",
    },
    {
      name: "Aisha Ahmed",
      role: "Patient",
      text: "The appointment process was very easy and the doctors provided excellent treatment.",
    },
    {
      name: "Abdi Hassan",
      role: "Patient",
      text: "Modern hospital with friendly staff and high quality healthcare services.",
    },
  ];

  const currentReview = reviews[currentIndex];

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 transition-colors duration-300 dark:bg-slate-950 lg:px-24">
      {/* Background Text */}
      <h1 className="pointer-events-none absolute left-10 top-0 select-none text-[120px] font-bold uppercase text-blue-50 dark:text-slate-900">
        Patients
      </h1>

      <div className="relative grid items-center gap-12 lg:grid-cols-2">
        {/* Left */}
        <div>
          <p className="mb-3 text-xl text-slate-500 dark:text-slate-400">
            Some of our happy patients
          </p>

          <h2 className="mb-8 text-4xl font-bold text-slate-900 dark:text-white">
            Our <span className="text-blue-600">Patients</span>
          </h2>

          <p className="max-w-lg text-lg leading-8 text-slate-500 dark:text-slate-400">
            To find the best healthcare experience, our patients trust our
            professional doctors, modern facilities, and caring medical team.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative rounded-2xl bg-blue-50 p-10 transition-colors dark:bg-slate-900">
          <div className="relative rounded-xl bg-white p-8 shadow-sm transition-colors dark:bg-slate-800">
            <p className="text-xl leading-10 text-slate-700 dark:text-slate-300">
              "{currentReview.text}"
            </p>

            {/* Speech Arrow */}
            <div className="absolute -bottom-5 left-10 h-0 w-0 border-l-[25px] border-r-[25px] border-t-[25px] border-l-transparent border-r-transparent border-t-white dark:border-t-slate-800" />
          </div>

          {/* Footer */}
          <div className="mt-10 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-blue-600">
                {currentReview.name}
              </h3>

              <p className="text-slate-500 dark:text-slate-400">
                {currentReview.role}
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex gap-3">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show testimonial ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-4 w-4 rounded-full border-4 transition-all duration-300 ${
                    currentIndex === index
                      ? "border-blue-600 bg-blue-600"
                      : "border-slate-300 bg-transparent hover:border-blue-400 dark:border-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;