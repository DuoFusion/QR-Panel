import Table, { ColumnsType } from "antd/es/table";
import { Fragment } from "react";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import Breadcrumbs from "../../coreComponents/Breadcrumbs";
import CardWrapper from "../../coreComponents/CardWrapper";
import { UserType } from "../../types";
import { Button, Flex, Modal, Spin } from "antd";
import { Edit, Trash } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import useBasicTableFilterHelper from "../../utils/hook/useBasicTableFilterHelper";

const UserContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicTableFilterHelper();

  const navigate = useNavigate();
  const { mutate } = Mutations.useDeleteUser();
  const { data, isLoading } = Queries.useGetUser(params);
  const AllUser = data?.data;

  const handleDelete = async (id: string) => {
    try {
      mutate(id);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (item: UserType) => {
    navigate(ROUTES.USER_Add_Edit, {
      state: {
        editData: item,
        edit: true,
      },
    });
  };

  const columns: ColumnsType<UserType> = [
    {
      title: "ID",
      key: "index",
      render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1,
    },
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => role.charAt(0).toUpperCase() + role.slice(1),
    },
    {
      title: "Option",
      key: "actionIcons",
      width: 120,
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
                content: `Do you really want to delete "${record.firstName} ${record.lastName}"?`,
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
      <Breadcrumbs mainTitle="User" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper Search={(e) => handleSetSearch(e)} searchClass="col-md-10 col-sm-7" btnTitle="Add User" btnClick={() => navigate(ROUTES.USER_Add_Edit)}>
          {isLoading ? (
            <div className="text-center py-5">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              className="custom-table"
              dataSource={AllUser?.User_data}
              columns={columns}
              rowKey={(record) => record._id}
              scroll={{ x: "max-content" }}
              pagination={{
                current: pageNumber,
                pageSize: pageSize,
                total: AllUser?.totalData,
                showSizeChanger: true,
                onChange: handlePaginationChange,
              }}
            />
          )}
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default UserContainer;
