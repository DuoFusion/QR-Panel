import * as Yup from "yup";

export const yupObject = <T extends Record<string, Yup.AnySchema>>(schemaObject: T) => {
  return Yup.object().shape(schemaObject);
};

export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
});

export const ForgotPasswordSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

export const OtpSchema = Yup.object().shape({
  otp: Yup.string().length(6, "OTP must be 6 digits").required("OTP is required"),
});

export const confirmPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
});

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Old Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Old Password must include at least one special character"),
  newPassword: Yup.string()
    .required("New Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "New Password must include at least one special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Password doesn't match")
    .required("Confirm Password is required"),
});

export const UserSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits and contain no letters"),
  address: Yup.string().required("Address is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
  // link: Yup.string().url("Link must be a valid URL").required("Link is required"),
});

export const SettingSchema = Yup.object().shape({
  title: Yup.string().required("Web Name is required"),
  weburl: Yup.string()
    .required("Web URL is required")
    .matches(/^\S*$/, "Spaces are not allowed. Use '-' instead of spaces.")
    .matches(/^[a-z0-9:./?&=_-]+$/, "Capital letters are not allowed. Use only lowercase."),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits and contain no letters"),
  content: Yup.string().required("Content is required"),
  address: Yup.string().required("Address is required"),
  userId: Yup.string().required("User is required"),
  primary: Yup.string().required("Primary is required"),
  secondary: Yup.string().required("Secondary is required"),
  backgroundColor: Yup.string().required("Background Color is required"),
  qrCode: Yup.string().notRequired(),
  facebook: Yup.string().notRequired(),
  instagram: Yup.string().notRequired(),
  whatsapp: Yup.string().notRequired(),
  location: Yup.string().notRequired(),
  logoImage: Yup.array().min(1, "Logo is required").required("Logo is required"),
  bannerImage: Yup.array().min(1, "Banner image is required").required("Banner image is required"),
});

export const ProductSchema = Yup.object().shape({
  userId: Yup.string().required("User is required"),
  name: Yup.string().required("Product Name is required"),
  category: Yup.string().required("Product Category is required"),
  price: Yup.string().required("Product Price is required"),
  description: Yup.string().required("Product Description is required"),
  image: Yup.array().min(1, "Image is required").required("Product Image is required"),
});
