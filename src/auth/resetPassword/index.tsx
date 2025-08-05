import { Button } from "antd";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { ROUTES } from "../../constants";
import { TextInput } from "../../shared/formFields";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearForgotPasswordEmail, loginSuccess } from "../../store/slices/AuthSlice";
import { ResetPasswordFormValues } from "../../types";
import { confirmPasswordSchema } from "../../utils/validationSchemas";

const ResetPasswordContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending } = Mutations.useResetPassword();
  const { forgotPasswordEmail } = useAppSelector((store) => store.auth);

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    resetPassword(
      {
        email: forgotPasswordEmail,
        newpassword: values.password,
      },
      {
        onSuccess: (response) => {
          dispatch(loginSuccess(response?.data));
          dispatch(clearForgotPasswordEmail());
          navigate(ROUTES.DASHBOARD);
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
              <Formik initialValues={{ password: "" }} validationSchema={confirmPasswordSchema} onSubmit={handleSubmit}>
                {() => (
                  <Form>
                    <h3>Set Your New Password</h3>
                    <p>Enter and confirm your new password below.</p>

                    <TextInput name="password" label="password" type="password" placeholder=" * * * * * * * * * " />

                    <div className="text-end mt-3">
                      <Button htmlType="submit" type="primary" block className="btn btn-primary" size="large" loading={isPending}>
                        Login
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

export default ResetPasswordContainer;
