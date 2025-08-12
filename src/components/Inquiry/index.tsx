import { Button, Flex, Image, Modal } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Trash } from "iconsax-react";
import { Fragment } from "react";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import Breadcrumbs from "../../coreComponents/Breadcrumbs";
import CardWrapper from "../../coreComponents/CardWrapper";
import { InquiryType } from "../../types";
import { generateOptions } from "../../utils";
import useBasicTableFilterHelper from "../../utils/hook/useBasicTableFilterHelper";

const InquiryContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange, handleSetSortBy } = useBasicTableFilterHelper();

  const { mutate } = Mutations.useDeleteInquiry();
  const { data, isLoading } = Queries.useGetInquiry(params);
  const { data: User } = Queries.useGetUser({});
  const AllUser = data?.data;

  const handleDelete = async (id: string) => {
    mutate(id);
  };

  const columns: ColumnsType<InquiryType> = [
    {
      title: "Sr No",
      key: "index",
      render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1,
    },
    {
      title: "User Name",
      dataIndex: "userId",
      key: "userId",
      render: (_, record) => (record?.userId?.firstName ? `${record?.userId?.firstName} ${record?.userId?.lastName}` : "-"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Option",
      key: "actionIcons",
      width: 120,
      render: (_, record) => (
        <Flex gap="middle" justify="center">
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
      <Breadcrumbs mainTitle="Inquiry" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper Search={(e) => handleSetSearch(e)} searchClass="col-md-10 col-sm-7" typeFilterData={generateOptions(User?.data?.User_data)} typeFilter={handleSetSortBy}>
          <Table
            className="custom-table"
            dataSource={AllUser?.inquiry_data}
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

export default InquiryContainer;
