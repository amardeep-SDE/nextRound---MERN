// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddSchedule from "./pages/AddSchedule";
import ScheduleList from "./pages/ScheduleList";
import UserProfile from "./pages/UserProfile";
import ChatPage from "./pages/ChatPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/schedule",
    element: <ScheduleList />,
  },
  {
    path: "/add-schedule",
    element: <AddSchedule />,
  },
  {
    path: "/schedule-list", 
    element: <ScheduleList />,
  },
  {
    path: "/user-details",
    element: <UserProfile />,
  },
  {
    path: "/chat",
    element: <ChatPage/>,
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
