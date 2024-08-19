import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import AllPosts from "./pages/posts/AllPosts";
import CreatePost from "./pages/posts/CreatePost";
import UpdatePost from "./pages/posts/UpdatePost";
import Home from "./pages/Home";
import PostDetails from "./pages/posts/PostDetails";
import Register from "./pages/users/Register";
import Profile from "./pages/users/Profile";
import Login from "./pages/users/Login";
import { authUserStatusAPI } from "./API/users/userAPIs";
import { isAuthenticated } from "./redux/features/user/authSlice";
import ProtectedRoutes from "./pages/protectedRoutes/ProtectedRoutes";
import AccountSummary from "./pages/users/AccountSummary";
import AddCategory from "./pages/categories/AddCategory";
import CreatePlan from "./pages/plans/CreatePlan";
import Pricing from "./pages/plans/Pricing";
import StripePaymentForm from "./pages/payments/StripePaymentForm";
import PaymentConfirmation from "./pages/payments/PaymentConfirmation";
import FreePlanConfirmation from "./pages/payments/FreePlanConfirmation";
import AccountVerification from "./pages/users/AccountVerification";
import ForgotPassword from "./pages/users/ForgotPassword";
import ResetPassword from "./pages/users/ResetPassword";
import CreatorsRanking from "./pages/earnings/CreatorsRanking";
import NotificationList from "./pages/notifications/NotificationList";
import MyEarnings from "./pages/earnings/MyEarnings";
import MyPosts from "./pages/posts/MyPosts";
import Settings from "./pages/users/Settings";
import UpdateEmail from "./pages/users/UpdateEmail";
import UpdateProfilePhoto from "./pages/users/UpdateProfilePhoto";
import AllUsers from "./pages/users/AllUsers";
import DeleteUserAccount from "./pages/users/admin/DeleteUserAccount";
import Layout from "./layout/Layout";
import PostDetailModal from "./pages/posts/PostDetailModal";

const App = () => {
  // const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {  data } = useQuery({
    queryKey: ["auth-user-status"],
    queryFn: authUserStatusAPI,
  });

  //Dispatching actions
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Home />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route
              path="create-post"
              element={
                <ProtectedRoutes>
                  <CreatePost />
                </ProtectedRoutes>
              }
            />
            <Route
              path="posts"
              element={
                <ProtectedRoutes>
                  <MyPosts />
                </ProtectedRoutes>
              }
            />
            <Route
              path="all-posts"
              element={
                <ProtectedRoutes>
                  <AllPosts />
                </ProtectedRoutes>
              }
            />
            <Route
              path="post-details/:postId"
              element={
                <ProtectedRoutes>
                  <PostDetails />
                </ProtectedRoutes>
              }
            />
            <Route
              path="update-post/:postId"
              element={
                <ProtectedRoutes>
                  <UpdatePost />
                </ProtectedRoutes>
              }
            />
            <Route
              path=""
              element={
                <ProtectedRoutes>
                  <AccountSummary />
                </ProtectedRoutes>
              }
            />
            <Route
              path="add-category"
              element={
                <ProtectedRoutes>
                  <AddCategory />
                </ProtectedRoutes>
              }
            />
            <Route
              path="subscription"
              element={
                <ProtectedRoutes>
                  <Pricing />
                </ProtectedRoutes>
              }
            />
            <Route
              path="users-list"
              element={
                <ProtectedRoutes>
                  <AllUsers />
                </ProtectedRoutes>
              }
            />
            <Route
              path="delete-user-account/:userId"
              element={
                <ProtectedRoutes>
                  <DeleteUserAccount />
                </ProtectedRoutes>
              }
            />
            <Route
            path="settings"
            element={
              <ProtectedRoutes>
                <Settings />
              </ProtectedRoutes>
            }
            />
            <Route
            path="notifications"
            element={
              <ProtectedRoutes>
                <NotificationList />
              </ProtectedRoutes>
            }
            />
            <Route
            path="update-account-email"
            element={
              <ProtectedRoutes>
                <UpdateEmail />
              </ProtectedRoutes>
            }
            />
            <Route
            path="update-profile-photo"
            element={
              <ProtectedRoutes>
                <UpdateProfilePhoto />
              </ProtectedRoutes>
            }
            />
            <Route
              path="my-earnings"
              element={
                <ProtectedRoutes>
                  <MyEarnings />
                </ProtectedRoutes>
              }
            />
            <Route
              path="add-plan"
              element={
                <ProtectedRoutes>
                  <CreatePlan />
                </ProtectedRoutes>
              }
            />
            <Route
              path="account-verification/:emailToken"
              element={
                <ProtectedRoutes>
                  <AccountVerification />
                </ProtectedRoutes>
              }
            />
            <Route
            path="profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          </Route>
          <Route
            path="success"
            element={
              <ProtectedRoutes>
                <PaymentConfirmation />
              </ProtectedRoutes>
            }
          />
          <Route
            path="free-plan"
            element={
              <ProtectedRoutes>
                <FreePlanConfirmation />
              </ProtectedRoutes>
            }
          />
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post-details/:postId" element={<PostDetails />} />
          <Route path="/update/:postId" element={<UpdatePost />} />
          <Route path="/ranking" element={<CreatorsRanking />} />
          {/* <Route path="/subscription" element={<Pricing />} />   */}
          <Route path="/payments/stripe-checkout/:planId" element={<StripePaymentForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:resetToken" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
