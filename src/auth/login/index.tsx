import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Label, Row } from "reactstrap";
import { useAppDispatch } from "../../store/hooks";
import { ROUTES } from "../../constants";

const Login = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(LoginSchema),
//   });

//   const onSubmit = async (data: LoginType) => {
//     try {
//       const response = await Post(Url_Keys.Auth.Login, data);
//       if (response.status === 200) {
//         dispatch(login(response.data));
//         navigate(RouteList.Dashboard);
//       }
//     } catch (error) {}
//   };

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div>
              <div className="login-main ">
                <Form>
                  <h3>Login</h3>
                  <p>Enter your Email Id & Password to login</p>

                  <div className="input-box">
                    <Label className="col-form-label">Your Email</Label>
                    <input type="text" placeholder="Enter Your Email" />
                    {/* {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>} */}
                  </div>

                  <div className="input-box">
                    <Label className="col-form-label">Your Password</Label>
                    <div className="position-relative">
                      <input placeholder="Enter Your Password" type={isPasswordVisible ? "text" : "password"} />
                      <div className="show-hide" onClick={() => setPasswordVisible(!isPasswordVisible)}>
                        <span className={!isPasswordVisible ? "show" : ""}> </span>
                      </div>
                    </div>
                    {/* {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>} */}
                  </div>

                  <div className="checkbox p-0">
                    <Link to={ROUTES.VERIFY_OTP}>Forgot Password</Link>
                  </div>
                  <div className="text-end mt-3">
                    <Button color="primary" className="w-100" block>
                      Login
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
