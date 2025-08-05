import { Button, message } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { ROUTES } from "../../constants";
import OtpInput from "../../shared/formFields/OtpInput";
import { useAppSelector } from "../../store/hooks";
import { OtpPayload } from "../../types";
import { OtpSchema } from "../../utils/validationSchemas";

const VerifyOtpContainer = () => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));

  const navigate = useNavigate();
  const { mutate: verifyOtp, isPending } = Mutations.useVerifyOtp();
  const { forgotPasswordEmail } = useAppSelector((store) => store.auth);

  const handleSubmit = async (values: OtpPayload, { resetForm }: FormikHelpers<OtpPayload>) => {
    if (!forgotPasswordEmail) {
      message.error("Email not found. Please restart the password reset process.");
      navigate(ROUTES.FORGOT_PASSWORD);
      return;
    }
    verifyOtp(
      {
        email: forgotPasswordEmail,
        otp: values.otp,
      },
      {
        onSuccess: () => {
          navigate(ROUTES.Reset_PASSWORD);
          resetForm();
        },
      }
    );
  };
  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div className="login-main">
              <Formik initialValues={{ otp: "" }} validationSchema={OtpSchema} onSubmit={handleSubmit}>
                {({ setFieldValue }) => (
                  <Form className="otp-form">
                    <h3>Enter OTP to Continue</h3>
                    <p>A code has been sent to</p>
                    <OtpInput
                      val={otpValues}
                      setVal={(val) => {
                        setOtpValues(val);
                        setFieldValue("otp", val.join(""));
                      }}
                      submitForm={(values, helpers) => handleSubmit(values, helpers)}
                    />
                    <div className="text-end mt-3">
                      <Button htmlType="submit" type="primary" block className="btn btn-primary" size="large" loading={isPending}>
                        verify
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyOtpContainer;
