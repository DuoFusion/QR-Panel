import * as Yup from "yup";

export const yupObject = <T extends Record<string, Yup.AnySchema>>(schemaObject: T) => {
  return Yup.object().shape(schemaObject);
};


export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
});
