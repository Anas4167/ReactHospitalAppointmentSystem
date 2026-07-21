import {
  Stethoscope,
  Clock,
  HeartPulse,
  Hospital,
} from "lucide-react";

const Features = () => {
  const data = [
    {
      icon: Stethoscope,
      title: "Expert Doctors",
      text: "Qualified specialists providing excellent care with experience and compassion.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      text: "Healthcare support is available whenever you or your loved ones need it.",
    },
    {
      icon: HeartPulse,
      title: "Patient Care",
      text: "Your health and comfort are our priority at every step of your healthcare journey.",
    },
    {
      icon: Hospital,
      title: "Modern Hospital",
      text: "Advanced medical technology and modern facilities for better healthcare.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-16 transition-colors duration-300 dark:bg-slate-950 sm:px-6 sm:py-20 lg:px-20 lg:py-24">

      {/* Decorative Background Text */}
      <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 select-none">
        <h1 className="whitespace-nowrap text-[50px] font-extrabold uppercase tracking-[0.15em] text-blue-100/60 dark:text-slate-900 sm:text-[80px] sm:tracking-widest md:text-[110px] lg:text-[140px]">
          Healthcare
        </h1>
      </div>

      {/* Header */}
      <div className="relative mx-auto mb-12 max-w-3xl text-center sm:mb-14">

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 sm:text-sm sm:tracking-[0.3em]">
          Why Choose Us
        </p>

        <h2 className="text-3xl font-bold leading-tight text-slate-900 transition-colors duration-300 dark:text-white sm:text-4xl md:text-5xl">
          Quality Healthcare You Can{" "}
          <span className="text-blue-600">
            Trust
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 transition-colors duration-300 dark:text-slate-400 sm:text-lg sm:leading-8">
          We are committed to providing professional medical care,
          modern facilities, and a comfortable experience for every
          patient.
        </p>
      </div>

      {/* Cards */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">

        {data.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-7"
            >
              {/* Top Border */}
              <div className="absolute left-0 top-0 h-1 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full" />

              {/* Number */}
              <span className="pointer-events-none absolute right-5 top-3 text-4xl font-bold text-slate-100 transition-colors duration-300 group-hover:text-blue-100 dark:text-slate-800 dark:group-hover:text-slate-700 sm:text-5xl">
                0{index + 1}
              </span>

              {/* Icon */}
              <div className="relative mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white sm:h-16 sm:w-16">
                <Icon
                  size={28}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-lg font-bold text-slate-900 transition-colors duration-300 dark:text-white sm:text-xl">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-7 text-slate-500 transition-colors duration-300 dark:text-slate-400">
                {item.text}
              </p>
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default Features;