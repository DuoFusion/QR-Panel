import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { ROUTES } from "../../constants";
import { TextInput } from "../../shared/formFields";
import { useAppDispatch } from "../../store/hooks";
import { setForgotPasswordEmail } from "../../store/slices/AuthSlice";
import { ForgetPasswordPayload } from "../../types";
import { ForgotPasswordSchema } from "../../utils/validationSchemas";

const ForgotPasswordContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate: requestPin, isPending } = Mutations.useRequestForgotPassword();

  const handleSubmit = async (values: ForgetPasswordPayload, { resetForm }: FormikHelpers<ForgetPasswordPayload>) => {
    requestPin(values, {
      onSuccess: () => {
        dispatch(setForgotPasswordEmail(values.email));
        navigate(ROUTES.VERIFY_OTP);
        resetForm();
      },
    });
  };
  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div className="login-main">
              <Formik initialValues={{ email: "" }} validationSchema={ForgotPasswordSchema} onSubmit={handleSubmit}>
                {() => (
                  <Form>
                    <h3>Need a Password Reset?</h3>
                    <p>Forget your password?</p>

                    <TextInput label="email address" name="email" type="email" placeholder="rarex49098@firain.com" />

                    <div className="text-end mt-3">
                      <Button htmlType="submit" type="primary" block className="btn btn-primary" size="large" loading={isPending}>
                        Send
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

export default ForgotPasswordContainer;
