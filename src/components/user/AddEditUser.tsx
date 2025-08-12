import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import Breadcrumbs from "../../coreComponents/Breadcrumbs";
import CardWrapper from "../../coreComponents/CardWrapper";
import { TextInput } from "../../shared/formFields";
import { UserFormValues, UserPayload } from "../../types";
import { UserSchema } from "../../utils/validationSchemas";
import { ROUTES } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";

export const UserInitialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  password: "",
  email: "",
  // link: "",
  address: "",
};

const AddEditUser = () => {
  const navigate = useNavigate();
  const { mutate: useUser, isPending: isUserCreating } = Mutations.useUser();
  const { mutate: upEditUser, isPending: isUserUpdating } = Mutations.useEditUser();

  const location = useLocation();
  const state = location.state;

  const handleSubmit = async (values: UserFormValues, { resetForm }: FormikHelpers<UserFormValues>) => {
    const payload: UserPayload = {
      ...(values.firstName && { firstName: values.firstName }),
      ...(values.lastName && { lastName: values.lastName }),
      ...(values.phoneNumber && { phoneNumber: values.phoneNumber }),
      ...(values.email && { email: values.email }),
      ...(values.password && { password: values.password }),
      ...(values.password && { confirmPassword: values.password }),
      // ...(values.link && { link: values.link }),
      ...(values.address && { address: values.address }),
    };
    if (state?.edit) {
      upEditUser({ userId: state?.editData?._id, ...payload });
      navigate(ROUTES.USER);
    } else {
      useUser(payload, {
        onSuccess: () => {
          resetForm();
          navigate(ROUTES.USER);
        },
      });
    }
  };

  const initialValues: UserFormValues = state?.edit ? { ...state.editData, password: state.editData.confirmPassword } : { ...UserInitialValues };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} User`} parent="User" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} User`}>
          <div className="input-items">
            <Formik<UserFormValues> initialValues={initialValues} validationSchema={UserSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6" xl="4">
                      <TextInput name="firstName" label="first Name" type="text" placeholder="Enter your First Name" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="lastName" label="last Name" type="text" placeholder="Enter your Last Name" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="phoneNumber" label="phone Number" type="number" placeholder="Enter your Phone Number" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="password" label="password" type="password" placeholder=" * * * * * * * * * " required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="email" label="email address" type="email" placeholder="Enter your Email Address" required />
                    </Col>
                    {/* <Col md="6" xl="4">
                      <TextInput name="link" label="Link" type="text" placeholder="Enter your Link" required />
                    </Col> */}
                    <Col sm="12">
                      <TextInput name="address" label="address" type="textarea" placeholder="Enter your Address" required />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isUserCreating || isUserUpdating}>
                          Save
                        </Button>
                        <Button htmlType="button" className="btn btn-light ms-3" size="large" onClick={() => navigate(ROUTES.USER)}>
                          Cancel
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default AddEditUser;
