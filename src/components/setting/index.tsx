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
import { SettingType } from "../../types";
import useBasicTableFilterHelper from "../../utils/hook/useBasicTableFilterHelper";

const SettingContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicTableFilterHelper();

  const navigate = useNavigate();
  const { mutate } = Mutations.useDeleteUserSetting();
  const { data, isLoading } = Queries.useGetUserSetting(params);
  const AllUser = data?.data;

  const handleDelete = async (id: string) => {
    mutate(id);
  };

  const handleEdit = (item: SettingType) => {
    navigate(ROUTES.SETTING_Add_Edit, {
      state: {
        editData: item,
        edit: true,
      },
    });
  };

  const columns: ColumnsType<SettingType> = [
    {
      title: "ID",
      key: "index",
      render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1,
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
      render: (_, record) => `${record.userId.firstName} ${record.userId.lastName}`,
    },
    {
      title: "Web Name",
      dataIndex: "title",
      key: "title",
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
      title: "Logo",
      dataIndex: "logoImage",
      key: "logoImage",
      render: (logoImage: string) => (logoImage ? <Image src={logoImage} width={60} height={60} alt="logo" fallback="/placeholder.png" /> : <span className="text-muted">No Image</span>),
    },
    {
      title: "Banner",
      dataIndex: "bannerImage",
      key: "bannerImage",
      render: (bannerImage: string) => (bannerImage ? <Image src={bannerImage} width={60} height={60} alt="banner" fallback="/placeholder.png" /> : <span className="text-muted">No Image</span>),
    },
    {
      title: "QR",
      dataIndex: "qrCode",
      key: "qrCode",
      render: (qrCode: string) => (qrCode ? <Image src={qrCode} width={60} height={60} alt="qr" fallback="/placeholder.png" /> : <span className="text-muted">No Image</span>),
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
                content: `Do you really want to delete "${record.title}"?`,
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
      <Breadcrumbs mainTitle="Setting" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper Search={(e) => handleSetSearch(e)} searchClass="col-xl-10 col-md-9 col-sm-7" btnTitle="Add Setting" btnClick={() => navigate(ROUTES.SETTING_Add_Edit)}>
          <Table
            className="custom-table"
            dataSource={AllUser?.setting_data}
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

export default SettingContainer;
