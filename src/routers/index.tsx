import { createBrowserRouter } from "react-router-dom";
import ChangePasswordContainer from "../auth/changePassword";
import ForgotPasswordContainer from "../auth/forgotPassword";
import LoginContainer from "../auth/login";
import ResetPasswordContainer from "../auth/resetPassword";
import VerifyOtpContainer from "../auth/verifyOtp";
import Dashboard from "../components/dashboard";
import UserContainer from "../components/user";
import { ROUTES } from "../constants";
import Layout from "../layout";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

export const Router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: ROUTES.HOME, element: <Dashboard /> },
          { path: ROUTES.CHANGE_PASSWORD, element: <ChangePasswordContainer /> },
          { path: ROUTES.USER, element: <UserContainer /> },
        ],
      },
    ],
  },
  {
    element: <PublicRoutes />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginContainer /> },
      { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordContainer /> },
      { path: ROUTES.VERIFY_OTP, element: <VerifyOtpContainer /> },
      { path: ROUTES.Reset_PASSWORD, element: <ResetPasswordContainer /> },
    ],
  },
  {
    path: "*",
    // element: <ErrorPage />,
  },
]);
