import {
  MapPin,
  Phone,
  Mail,
  Clock,
  HeartPulse,
  ArrowRight,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-white px-6 pt-16 text-gray-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white lg:px-20">
      {/* Background */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-900/20" />

      <div className="relative mx-auto max-w-7xl">
        {/* Main Footer */}
        <div className="grid py-10 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                <HeartPulse size={26} />
              </div>

              <h2 className="text-2xl font-bold">
                Hospital<span className="text-blue-600">Care</span>
              </h2>
            </div>

            <p className="max-w-xs leading-7 text-gray-500 dark:text-slate-400">
              Providing trusted healthcare services with professional doctors,
              modern facilities, and compassionate patient care.
            </p>

            <div className="mt-6 flex gap-3">
              {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-500 dark:text-slate-400">
              {[
                ["Home", "/"],
                ["About Us", "/about"],
                ["Our Doctors", "/doctors"],
                ["Departments", "/departments"],
                ["Book Appointment", "/appointments"],
              ].map(([label, link]) => (
                <li key={label}>
                  <a
                    href={link}
                    className="transition hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-bold dark:text-white">
              Contact Us
            </h3>

            <div className="space-y-5 text-gray-500 dark:text-slate-400">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 text-blue-600" size={20} />
                <p>Mogadishu, Somalia</p>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-blue-600" size={20} />
                <p>+252 61XXXXXXX</p>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-blue-600" size={20} />
                <p>info@hospitalcare.com</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="mb-6 text-lg font-bold dark:text-white">
              Working Hours
            </h3>

            <div className="flex items-start gap-4">
              <Clock className="mt-1 text-blue-600" size={20} />

              <div className="space-y-3 text-gray-500 dark:text-slate-400">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Monday - Friday
                  </p>
                  <p>8:00 AM - 8:00 PM</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Saturday - Sunday
                  </p>
                  <p>9:00 AM - 5:00 PM</p>
                </div>

                <p className="font-semibold text-red-500">
                  Emergency: 24/7
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-gray-200 py-6 text-sm text-gray-500 transition-colors dark:border-slate-800 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 HospitalCare. All rights reserved.</p>

          <div className="flex gap-6">
            <a
              href="/privacy"
              className="transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;