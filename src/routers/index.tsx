import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import { ROUTES } from "../constants";
import Login from "../auth/login";
import Dashboard from "../components/dashboard";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

export const Router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Layout />,
        children: [{ path: ROUTES.HOME, element: <Dashboard /> }],
      },
    ],
  },
  {
    element: <PublicRoutes />,
    children: [
      { path: ROUTES.LOGIN, element: <Login /> },
      // { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordContainer /> },
      // { path: ROUTES.VERIFY_OTP, element: <VerifyOtpContainer /> },
      // { path: ROUTES.SET_NEW_PASSWORD, element: <NewPasswordContainer /> },
    ],
  },
  {
    path: "*",
    // element: <ErrorPage />,
  },
]);
