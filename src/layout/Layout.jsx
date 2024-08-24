import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/navbar/PublicNavbar";
import UserDashbaord from "../pages/users/UserDashboard";


const Layout = () => {
  return (
    <div className="bg-color w-full p-0 m-auto">
      <PublicNavbar />
      <main className="flex flex-col md:pl-16 lg:pl-11 lg:!pl-60">
        <UserDashbaord />
        {/* px-6 lg:px-16 */}
        <section className="relative flex flex-col flex-1 items-start max-w-full min-h-full">
          <Outlet/>
        </section>
      </main>
      
    </div>
  );
};
export default Layout;
