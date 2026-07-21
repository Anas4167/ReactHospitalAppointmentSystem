import Hero from "../components/Hero";
import Features from "../components/FeatureCard";
import Departments from "../components/HomeDepartments";
import Doctors from "../components/DoctorCard";
import Testimonials from "../components/Testimonial";
import Footer from "../components/Footer";


const Home = () => {

  return (
    <div className="min-h-screen bg-background text-foreground">

      <Hero />

      <Features />

      <Departments />

      <Doctors />

      <Testimonials />

  

    </div>
  );
};


export default Home;