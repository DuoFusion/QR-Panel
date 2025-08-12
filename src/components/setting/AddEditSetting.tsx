import { Button } from "antd";
import { Form, Formik, FormikHelpers, ErrorMessage } from "formik";
import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Label, Row } from "reactstrap";
import { Facebook, Instagram, Location, Whatsapp } from "iconsax-react";

import { Mutations, Queries } from "../../api";
import { ROUTES } from "../../constants";
import Breadcrumbs from "../../coreComponents/Breadcrumbs";
import CardWrapper from "../../coreComponents/CardWrapper";
import { ColorPickerInput, ImageUpload, SelectInput, TextInput } from "../../shared/formFields";
import { SettingFormValues } from "../../types";
import { SettingSchema } from "../../utils/validationSchemas";
import { generateOptions } from "../../utils";

const AddEditSetting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const { mutate: createUserSetting, isPending: isUserSettingCreating } = Mutations.useUserSetting();
  const { mutate: editUserSetting, isPending: isUserSettingUpdating } = Mutations.useEditUserSetting();
  const { data, isLoading } = Queries.useGetUser({});

  const initialData = state?.editData;

  const [isLogoImage, setLogoImage] = useState<string[]>(initialData?.logoImage ? [initialData.logoImage] : []);
  const [isBannerImage, setBannerImage] = useState<string[]>(initialData?.bannerImage ? [initialData.bannerImage] : []);

  const initialValues: SettingFormValues = {
    userId: initialData?.userId?._id || "",
    title: initialData?.title || "",
    email: initialData?.email || "",
    phoneNumber: initialData?.phoneNumber || "",
    content: initialData?.content || "",
    address: initialData?.address || "",
    qrCode: initialData?.qrCode || "",
    facebook: initialData?.socialLinks?.facebook || "",
    instagram: initialData?.socialLinks?.instagram || "",
    whatsapp: initialData?.socialLinks?.whatsapp || "",
    location: initialData?.socialLinks?.location || "",
    primary: initialData?.primary || "",
    secondary: initialData?.secondary || "",
    backgroundColor: initialData?.backgroundColor || "",
    logoImage: initialData?.logoImage ? [initialData.logoImage] : [],
    bannerImage: initialData?.bannerImage ? [initialData.bannerImage] : [],
  };

  const handleSubmit = async (values: SettingFormValues, { resetForm }: FormikHelpers<SettingFormValues>) => {
    const payload = {
      ...(values.title && { title: values.title }),
      ...(values.email && { email: values.email }),
      ...(values.phoneNumber && { phoneNumber: values.phoneNumber }),
      ...(values.content && { content: values.content }),
      ...(values.address && { address: values.address }),
      ...(values.userId && { userId: values.userId }),
      ...(values.logoImage?.length && { logoImage: values.logoImage[0] }),
      ...(values.bannerImage?.length && { bannerImage: values.bannerImage[0] }),
      ...(values.qrCode && { qrCode: values.qrCode }),
      ...(values.primary && { primary: values.primary }),
      ...(values.secondary && { secondary: values.secondary }),
      ...(values.backgroundColor && { backgroundColor: values.backgroundColor }),
      socialLinks: {
        ...(values.facebook && { facebook: values.facebook }),
        ...(values.instagram && { instagram: values.instagram }),
        ...(values.whatsapp && { whatsapp: values.whatsapp }),
        ...(values.location && { location: values.location }),
      },
    };

    if (state?.edit) {
      editUserSetting({ settingId: state?.editData?._id, ...payload }, { onSuccess: () => navigate(ROUTES.SETTING) });
    } else {
      createUserSetting(payload, {
        onSuccess: () => {
          resetForm();
          navigate(ROUTES.SETTING);
        },
      });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Setting`} parent="Setting" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Setting`}>
          <div className="input-items">
            <Formik<SettingFormValues> initialValues={initialValues} validationSchema={SettingSchema} onSubmit={handleSubmit} enableReinitialize>
              {({ setFieldValue }) => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <SelectInput name="userId" label="User" options={generateOptions(data?.data?.User_data)} loading={isLoading} required />
                    </Col>
                    <Col md="6">
                      <TextInput name="title" label="Web Name" type="text" placeholder="Enter your Web Name" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="email" label="Email Address" type="email" placeholder="Enter your Email Address" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="phoneNumber" label="Phone Number" type="number" placeholder="Enter your Phone Number" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="content" label="Content" type="textarea" placeholder="Enter your Content" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="address" label="Address" type="textarea" placeholder="Enter your Address" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="qrCode" label="QR Code" type="text" placeholder="Enter your Web Link" />
                    </Col>
                    <Col md="6">
                      <TextInput name="facebook" label="Facebook" type="text" placeholder="Facebook Link" inputGroupIcon={<Facebook />} />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="instagram" label="Instagram" type="text" placeholder="Instagram Link" inputGroupIcon={<Instagram />} />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="whatsapp" label="Whatsapp" type="text" placeholder="Whatsapp Link" inputGroupIcon={<Whatsapp />} />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="location" label="Location" type="text" placeholder="Map Link" inputGroupIcon={<Location />} />
                    </Col>
                    <Col sm="6" md="3">
                      <ColorPickerInput label="Primary Color" name="primary" required showText />
                    </Col>
                    <Col sm="6" md="3">
                      <ColorPickerInput label="Secondary Color" name="secondary" required showText />
                    </Col>
                    <Col sm="6" md="6">
                      <ColorPickerInput label="gradient background Color" name="backgroundColor" mode={"gradient"} required showText allowClear/>
                    </Col>
                    <Col sm="6" md="3">
                      <ImageUpload
                        name="logoImage"
                        label="Upload Logo"
                        fileList={isLogoImage}
                        setFileList={(list) => {
                          setLogoImage(list);
                          setFieldValue("logoImage", list);
                        }}
                        required
                      />
                    </Col>
                    <Col sm="6" md="3">
                      <ImageUpload
                        name="bannerImage"
                        label="Upload Banner Image"
                        fileList={isBannerImage}
                        setFileList={(list) => {
                          setBannerImage(list);
                          setFieldValue("bannerImage", list);
                        }}
                        required
                      />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isUserSettingCreating || isUserSettingUpdating}>
                          Save
                        </Button>
                        <Button htmlType="button" className="btn btn-light ms-3" size="large" onClick={() => navigate(ROUTES.SETTING)}>
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

export default AddEditSetting;
