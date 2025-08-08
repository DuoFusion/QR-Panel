import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import { Mutations, Queries } from "../../api";
import { ROUTES } from "../../constants";
import Breadcrumbs from "../../coreComponents/Breadcrumbs";
import CardWrapper from "../../coreComponents/CardWrapper";
import { ImageUpload, SelectInput, TextInput } from "../../shared/formFields";
import { ProductFormValues } from "../../types";
import { generateOptions } from "../../utils";
import { ProductSchema } from "../../utils/validationSchemas";

const AddEditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const { mutate: createProduct, isPending: isProductCreating } = Mutations.useProduct();
  const { mutate: editUserProduct, isPending: isProductUpdating } = Mutations.useEditProduct();
  const { data, isLoading } = Queries.useGetUser({});

  const initialData = state?.editData;

  const [isImage, setImage] = useState<string[]>(initialData?.image ? [initialData.image] : []);

  const initialValues: ProductFormValues = {
    userId: initialData?.userId?._id || "",
    name: initialData?.name || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    description: initialData?.description || "",
    image: initialData?.image ? [initialData.image] : [],
  };

  const handleSubmit = async (values: ProductFormValues, { resetForm }: FormikHelpers<ProductFormValues>) => {
    const payload = {
      ...(values.userId && { userId: values.userId }),
      ...(values.name && { name: values.name }),
      ...(values.category && { category: values.category }),
      ...(values.price && { price: values.price }),
      ...(values.description && { description: values.description }),
      ...(values.image?.length && { image: values.image[0] }),
    };

    if (state?.edit) {
      editUserProduct({ productId: state?.editData?._id, ...payload }, { onSuccess: () => navigate(ROUTES.PRODUCT) });
    } else {
      createProduct(payload, {
        onSuccess: () => {
          resetForm();
          navigate(ROUTES.PRODUCT);
        },
      });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Product`} parent="Product" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Product`}>
          <div className="input-items">
            <Formik<ProductFormValues> initialValues={initialValues} validationSchema={ProductSchema} onSubmit={handleSubmit} enableReinitialize>
              {({ setFieldValue }) => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <SelectInput name="userId" label="User" options={generateOptions(data?.data?.User_data)} loading={isLoading} required />
                    </Col>
                    <Col md="6">
                      <TextInput name="name" label="Name" type="text" placeholder="Enter your Product Name" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="category" label="category" type="text" placeholder="Enter your Product category" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="price" label="Price" type="number" placeholder="Enter your Product Price" required />
                    </Col>
                    <Col md="12">
                      <TextInput name="description" label="description" type="textarea" placeholder="Enter your Product Description" required />
                    </Col>
                    <Col md="3">
                      <ImageUpload
                        name="image"
                        label="Upload Product Image"
                        fileList={isImage}
                        setFileList={(list) => {
                          setImage(list);
                          setFieldValue("image", list);
                        }}
                        required
                      />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isProductCreating || isProductUpdating}>
                          Save
                        </Button>
                        <Button htmlType="button" className="btn btn-light ms-3" size="large" onClick={() => navigate(ROUTES.PRODUCT)}>
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

export default AddEditProduct;
