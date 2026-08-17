import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <main className="app-body">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
