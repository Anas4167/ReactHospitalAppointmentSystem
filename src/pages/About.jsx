import {
  Check,
  HeartPulse,
} from "lucide-react";

const About = () => {
  const features = [
    "Professional Healthcare Services",
    "Experienced Medical Specialists",
    "Modern Medical Technology",
    "Affordable Healthcare",
    "Patient-Centered Care",
    "Easy Appointment Booking",
    "Quality Medical Treatment",
    "Trusted Healthcare Services",
    "24/7 Patient Support",
  ];

  return (
    <div className="bg-white text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-200">

      {/* About Section */}
      <section className="relative overflow-hidden px-4 py-16 transition-colors duration-300 sm:px-6 lg:px-20">

        {/* Large Background Text */}
        <div
          className="
            pointer-events-none
            absolute
            left-6
            top-0
            select-none
            text-[60px]
            font-extrabold
            leading-none
            text-blue-50
            transition-colors
            duration-300
            dark:text-slate-900
            sm:left-10
            sm:text-[100px]
            md:left-16
            md:text-[150px]
            lg:text-[180px]
          "
        >
          HOSPITAL
        </div>

        <div
          className="
            relative
            mx-auto
            grid
            max-w-7xl
            items-center
            gap-12
            lg:grid-cols-[1.6fr_0.8fr]
          "
        >

          {/* Left Content */}
          <div className="relative z-10">

            {/* Icon + Greeting */}
            <div className="flex items-center gap-4 sm:gap-6">

              {/* Blue Circle Icon */}
              <div
                className="
                  flex
                  h-20
                  w-20
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-600
                  shadow-lg
                  shadow-blue-500/20
                  sm:h-24
                  sm:w-24
                "
              >
                <HeartPulse
                  className="h-10 w-10 text-white sm:h-12 sm:w-12"
                  strokeWidth={2}
                />
              </div>

              <div>
                <p className="text-base text-slate-500 transition-colors duration-300 dark:text-slate-400 sm:text-lg md:text-xl">
                  Hello dear visitor
                </p>

                <h1 className="mt-1 text-2xl font-bold text-slate-900 transition-colors duration-300 dark:text-white sm:text-3xl md:text-4xl">
                  About Our{" "}
                  <span className="text-blue-600">
                    HospitalCare
                  </span>
                </h1>
              </div>
            </div>

            {/* Description */}
            <p
              className="
                mt-10
                max-w-5xl
                text-base
                leading-8
                text-slate-600
                transition-colors
                duration-300
                dark:text-slate-400
                sm:mt-14
                sm:text-lg
                md:text-xl
                md:leading-9
              "
            >
              We are committed to providing high-quality healthcare
              services that improve the health and well-being of our
              community. Our experienced medical professionals combine
              compassionate care with modern medical technology to
              provide safe, reliable, and patient-centered treatment.
            </p>

            {/* Features */}
            <div
              className="
                mt-10
                grid
                gap-x-10
                gap-y-5
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-4"
                >
                  {/* Check Circle */}
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-blue-200
                      bg-white
                      transition-colors
                      duration-300
                      dark:border-blue-900
                      dark:bg-slate-900
                    "
                  >
                    <Check
                      className="h-6 w-6 text-blue-600"
                      strokeWidth={2.5}
                    />
                  </div>

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-slate-900
                      transition-colors
                      duration-300
                      dark:text-slate-200
                      sm:text-base
                      md:text-lg
                    "
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Doctor Image */}
          <div
            className="
              relative
              flex
              min-h-[400px]
              items-end
              justify-center
              lg:min-h-[500px]
            "
          >
            {/* Blue Circle Background */}
            <div
              className="
                absolute
                bottom-0
                right-1/2
                h-72
                w-72
                translate-x-1/2
                rounded-full
                bg-blue-50
                transition-colors
                duration-300
                dark:bg-blue-950/40
                sm:h-80
                sm:w-80
                lg:right-10
                lg:translate-x-0
              "
            />

            {/* Doctor Image */}
            <img
              src="https://i.pinimg.com/736x/9d/82/1b/9d821b1859455d825f674a21569f82dc.jpg"
              alt="Healthcare professional"
              className="
                relative
                z-10
                max-h-[320px]
                max-w-full
                rounded-full
                object-contain
                transition-transform
                duration-500
                hover:scale-105
                lg:mr-10
              "
            />
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section
        className="
          bg-blue-50
          px-4
          py-16
          transition-colors
          duration-300
          dark:bg-slate-900
          sm:px-6
          lg:px-20
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-7xl
            gap-6
            md:grid-cols-2
          "
        >

          {/* Mission */}
          <div
            className="
              rounded-3xl
              border
              border-transparent
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
              dark:border-slate-800
              dark:bg-slate-950
              sm:p-8
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-blue-900
                transition-colors
                duration-300
                dark:text-blue-400
              "
            >
              Our Mission
            </h2>

            <p
              className="
                mt-4
                leading-7
                text-slate-500
                transition-colors
                duration-300
                dark:text-slate-400
              "
            >
              To provide accessible, affordable, and professional
              healthcare services while ensuring every patient receives
              compassionate and high-quality medical care.
            </p>
          </div>

          {/* Vision */}
          <div
            className="
              rounded-3xl
              bg-blue-600
              p-6
              text-white
              shadow-lg
              shadow-blue-500/20
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-blue-700
              sm:p-8
            "
          >
            <h2 className="text-2xl font-bold">
              Our Vision
            </h2>

            <p className="mt-4 leading-7 text-blue-100">
              To become a trusted healthcare provider known for
              excellence, innovation, modern technology, and
              patient-centered medical services.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;