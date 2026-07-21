import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const PublicLayout = () => {

  return (
    <div className="min-h-screen bg-background text-foreground">

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  );

};


export default PublicLayout;