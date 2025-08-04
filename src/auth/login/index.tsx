import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { useAppDispatch } from "../../store/hooks";
import { ROUTES, URL_KEYS } from "../../constants";
import { Formik, Form } from "formik";
import { loginSchema } from "../../utils/validationSchemas";
import { TextInput } from "../../shared/formFields";
import { Button, message } from "antd";
import { Post } from "../../api";
// import { loginSuccess } from "../../store/slices/authSlice"; // if needed

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const result = await Post(URL_KEYS.Auth.Login, values);
      // dispatch(loginSuccess(result.data));
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      message.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div className="login-main">
              <Formik initialValues={{ email: "", password: "" }} validationSchema={loginSchema} onSubmit={handleSubmit}>
                {() => (
                  <Form>
                    <h3>Login</h3>
                    <p>Enter your Email Id & Password to login</p>

                    <TextInput label="email address" name="email" type="email" placeholder="rarex49098@firain.com" />
                    <TextInput name="password" label="password" type="password" placeholder="*********" />

                    <div className="checkbox p-0">
                      <Link to={ROUTES.FORGOT_PASSWORD}>Forgot Password</Link>
                    </div>

                    <div className="text-end mt-3">
                      <Button htmlType="submit" type="primary" block className="btn btn-primary" size="large" loading={loading}>
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

export default Login;
