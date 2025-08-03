import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import { ROUTES } from "../constants";
import Login from "../auth/login";
import Dashboard from "../components/dashboard";

export const Router = createBrowserRouter([
  {
    // element: <PrivateRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: ROUTES.HOME, element: <Dashboard /> },
          // { path: ROUTES.MANAGE_USERS, element: <ManageUsers /> },
          // { path: ROUTES.MANAGE_TEAM, element: <ManageTeams /> },
          // { path: ROUTES.PROFILE, element: <UserProfileContainer /> },
          // { path: ROUTES.SETTING, element: <Setting /> },
          // { path: ROUTES.MANAGE_TEAM_MEMBERS, element: <ManageTeamMembers /> },
          // { path: ROUTES.MANAGE_CHANNELS, element: <ManageChannels /> },
        ],
      },
    ],
  },
  {
    // element: <PublicRoutes />,
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
