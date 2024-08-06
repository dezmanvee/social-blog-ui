import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/navbar/PublicNavbar";
import UserDashbaord from "../pages/users/UserDashboard";

const Layout = () => {
  return (
    <div className="bg-color">
      <PublicNavbar />
      <main className="flex flex-col md:pl-16 lg:pl-11 lg:!pl-60">
        <UserDashbaord />
        <section className="relative pt-10 px-6 lg:px-16 flex flex-col flex-1 items-start max-w-full pb-16">
          <Outlet/>
        </section>
      </main>
    </div>
  );
};
export default Layout;
