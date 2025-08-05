import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react/jsx-runtime";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import CardWrapper from "../../coreComponents/CardWrapper";
import { TextInput } from "../../shared/formFields";
import { ChangePasswordPayload } from "../../types";
import { ChangePasswordSchema } from "../../utils/validationSchemas";
import { useAppSelector } from "../../store/hooks";
import Breadcrumbs from "../../coreComponents/Breadcrumbs";

const ChangePasswordContainer = () => {
  const { mutate: ChangePassword, isPending } = Mutations.useChangePassword();
  const { user } = useAppSelector((store) => store.auth);

  const handleSubmit = async (values: ChangePasswordPayload, { resetForm }: FormikHelpers<ChangePasswordPayload>) => {
    ChangePassword(
      {
        email: user?.email,
        ...values,
      },
      {
        onSuccess: () => resetForm(),
      }
    );
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Change Password" parent="Pages" />
      <Container fluid>
        <CardWrapper title="Change Password">
          <div className="input-items">
            <Formik initialValues={{ oldPassword: "", newPassword: "", confirmPassword: "" }} validationSchema={ChangePasswordSchema} onSubmit={handleSubmit}>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="4">
                      <TextInput name="oldPassword" label="Old Password" type="password" placeholder=" * * * * * * * * * " required />
                    </Col>
                    <Col md="4">
                      <TextInput name="newPassword" label="New Password" type="password" placeholder=" * * * * * * * * * " required />
                    </Col>
                    <Col md="4">
                      <TextInput name="confirmPassword" label="Confirm Password" type="password" placeholder=" * * * * * * * * * " required />
                    </Col>
                    <Col ms="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isPending}>
                          Save
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

export default ChangePasswordContainer;
