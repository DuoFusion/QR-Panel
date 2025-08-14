import { createBrowserRouter, Navigate } from "react-router-dom";
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
import AddEditUser from "../components/user/AddEditUser";
import SettingContainer from "../components/setting";
import AddEditSetting from "../components/setting/AddEditSetting";
import ProductContainer from "../components/product";
import AddEditProduct from "../components/product/AddEditProduct";
import InquiryContainer from "../components/Inquiry";
import OrderContainer from "../components/Order";
import Error from "../components/error";

export const Router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: ROUTES.DASHBOARD, element: <Dashboard /> },
          { path: ROUTES.CHANGE_PASSWORD, element: <ChangePasswordContainer /> },
          { path: ROUTES.USER, element: <UserContainer /> },
          { path: ROUTES.USER_Add_Edit, element: <AddEditUser /> },
          { path: ROUTES.SETTING, element: <SettingContainer /> },
          { path: ROUTES.SETTING_Add_Edit, element: <AddEditSetting /> },
          { path: ROUTES.PRODUCT, element: <ProductContainer /> },
          { path: ROUTES.PRODUCT_Add_Edit, element: <AddEditProduct /> },
          { path: ROUTES.INQUIRY, element: <InquiryContainer /> },
          { path: ROUTES.ORDER, element: <OrderContainer /> },
        ],
      },
    ],
  },
  {
    element: <PublicRoutes />,
    children: [
      { path: ROUTES.HOME, element: <Navigate to={ROUTES.LOGIN} replace /> },
      { path: ROUTES.LOGIN, element: <LoginContainer /> },
      { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordContainer /> },
      { path: ROUTES.VERIFY_OTP, element: <VerifyOtpContainer /> },
      { path: ROUTES.Reset_PASSWORD, element: <ResetPasswordContainer /> },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
