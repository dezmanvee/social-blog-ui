import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/navbar/PublicNavbar";
import UserDashbaord from "../pages/users/UserDashboard";
import StoreProvider from "../redux/features/user/store/store";
import { useSelector } from "react-redux";

const Layout = () => {

  const isSidebarCollapsed = useSelector((state) => state.global.isSidebarCollapsed)
  return (
    // <StoreProvider>
      <div className="bg-color w-full p-0 m-auto">
        <PublicNavbar />
        {/* ${isSidebarCollapsed ? "md:pl-8" : "lg:!pl-60"} */}
        <main className={`flex flex-col md:pl-8 lg:!pl-60 `}>
          <UserDashbaord />
          {/* px-6 lg:px-16 */}
          <section className="relative flex flex-col flex-1 items-start max-w-full min-h-full max-lg:p-16 max-md:p-0">
            <Outlet />
          </section>
        </main>
      </div>
    // </StoreProvider>
  );
};

const LayoutWrapper = ({children}) => {
  return (
    <StoreProvider>
      <Layout>{children}</Layout>
    </StoreProvider>
  )
}
export default LayoutWrapper;

