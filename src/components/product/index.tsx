import { Button, Flex, Image, Modal } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Edit, Trash } from "iconsax-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { ROUTES } from "../../constants";
import Breadcrumbs from "../../coreComponents/Breadcrumbs";
import CardWrapper from "../../coreComponents/CardWrapper";
import useBasicTableFilterHelper from "../../utils/hook/useBasicTableFilterHelper";
import { ProductType } from "../../types";
import { generateOptions } from "../../utils";

const ProductContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange, handleSetSortBy } = useBasicTableFilterHelper();

  const navigate = useNavigate();
  const { mutate } = Mutations.useDeleteProduct();
  const { data, isLoading } = Queries.useGetProduct(params);
  const { data: User } = Queries.useGetUser({});
  const AllUser = data?.data;

  const handleDelete = async (id: string) => {
    mutate(id);
  };

  const handleEdit = (item: ProductType) => {
    navigate(ROUTES.PRODUCT_Add_Edit, {
      state: {
        editData: item,
        edit: true,
      },
    });
  };

  const columns: ColumnsType<ProductType> = [
    {
      title: "Sr No",
      key: "index",
      render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1,
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      render: (_, record) => (record?.userId?._id ? record?.userId?._id : "-"),
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      render: (_, record) => (record?.userId?.firstName ? `${record?.userId?.firstName} ${record?.userId?.lastName}` : "-"),
    },
    {
      title: "Wen Id",
      dataIndex: "web_id",
      key: "web_id",
      render: (_, record) => (record?.settingId?._id ? record?.settingId?._id : "-"),
    },
    {
      title: "Wen Name",
      dataIndex: "user_name",
      key: "user_name",
      render: (_, record) => (record?.settingId?.title ? record?.settingId?.title : "-"),
    },
    {
      title: "Product Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      width: 400,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (image ? <Image src={image} width={60} height={60} alt="image" fallback="/placeholder.png" /> : <span className="text-muted">No Image</span>),
    },
    {
      title: "Option",
      key: "actionIcons",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <Flex gap="middle" justify="center">
          <Button type="text" onClick={() => handleEdit(record)} title="Edit" className="m-1 p-1 btn btn-primary">
            <Edit className="action" />
          </Button>
          <Button
            type="text"
            danger
            className="m-1 p-1 btn btn-danger"
            onClick={() => {
              Modal.confirm({
                title: "Are you sure?",
                content: `Do you really want to delete "${record.name}"?`,
                okText: "Yes, Delete",
                cancelText: "Cancel",
                onOk: () => handleDelete(record?._id),
              });
            }}
            title="Delete"
          >
            <Trash className="action" />
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Product" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper Search={(e) => handleSetSearch(e)} searchClass="col-md-6 col-xl-8" btnTitle="Add Product" typeFilterData={generateOptions(User?.data?.User_data)} typeFilter={handleSetSortBy} btnClick={() => navigate(ROUTES.PRODUCT_Add_Edit)}>
          <Table
            className="custom-table"
            dataSource={AllUser?.product_data}
            columns={columns}
            rowKey={(record) => record._id}
            scroll={{ x: "max-content" }}
            loading={isLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: AllUser?.totalData,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
          />
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default ProductContainer;
