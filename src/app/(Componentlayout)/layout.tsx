

import Footer from "@/components/layout/footer/Footer";
import NavbarServer from "@/components/layout/navbar/navbar5";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavbarServer />
      {children}
      <Footer />
    </div>
  );
};

export default UserLayout;
