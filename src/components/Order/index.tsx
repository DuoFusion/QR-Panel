import { Button, Flex, Modal } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Trash } from "iconsax-react";
import { Fragment } from "react";
import { Container } from "reactstrap";
import { Mutations, Queries } from "../../api";
import Breadcrumbs from "../../coreComponents/Breadcrumbs";
import CardWrapper from "../../coreComponents/CardWrapper";
import { OrderType } from "../../types";
import { generateOptions } from "../../utils";
import useBasicTableFilterHelper from "../../utils/hook/useBasicTableFilterHelper";

const OrderContainer = () => {
  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange, handleSetSortBy } = useBasicTableFilterHelper();

  const { mutate } = Mutations.useDeleteOrder();
  const { data, isLoading } = Queries.useGetOrder(params);
  const { data: User } = Queries.useGetUser({});
  const AllUser = data?.data;

  const handleDelete = async (id: string) => {
    mutate(id);
  };

  const columns: ColumnsType<OrderType> = [
    {
      title: "ID",
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
      <Breadcrumbs mainTitle="Order" parent="Pages" />
      <Container fluid className="custom-table">
        <CardWrapper Search={(e) => handleSetSearch(e)} searchClass="col-md-10 col-sm-7" typeFilterData={generateOptions(User?.data?.User_data)} typeFilter={handleSetSortBy}>
          <Table
            className="custom-table"
            dataSource={AllUser?.order_data}
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

export default OrderContainer;

// import { Button, Flex, Modal, Table } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import { Trash } from "iconsax-react";
// import { Fragment } from "react";
// import { Container } from "reactstrap";
// import { Mutations, Queries } from "../../api";
// import Breadcrumbs from "../../coreComponents/Breadcrumbs";
// import CardWrapper from "../../coreComponents/CardWrapper";
// import { OrderType } from "../../types";
// import { generateOptions } from "../../utils";
// import useBasicTableFilterHelper from "../../utils/hook/useBasicTableFilterHelper";

// const OrderContainer = () => {
//   const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange, handleSetSortBy } = useBasicTableFilterHelper();

//   const { mutate } = Mutations.useDeleteOrder();
//   const { data, isLoading } = Queries.useGetOrder(params);
//   const { data: User } = Queries.useGetUser({});
//   const AllUser = data?.data;

//   // delete handler
//   const handleDelete = async (id: string) => {
//     mutate(id);
//   };

//   // build rowSpan map for merging User Name
//   const rowSpanMap: Record<string, number> = {};
//   AllUser?.order_data?.forEach((order) => {
//     const uid = order.userId?._id;
//     rowSpanMap[uid] = (rowSpanMap[uid] || 0) + 1;
//   });

//   // expanded row renderer → product details table
//   const expandedRowRender = (record: OrderType) => {
//     // Ensure productId is always an array for the table
//     const products = Array.isArray(record?.productId) ? record.productId : record?.productId ? [record.productId] : [];

//     const productColumns: ColumnsType<any> = [
//       {
//         title: "ID",
//         key: "index",
//         render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1,
//       },
//       {
//         title: "Image",
//         dataIndex: "image",
//         key: "image",
//         render: (img) => img && <img src={img} alt="" style={{ width: 50, height: 50, objectFit: "cover" }} />,
//       },
//       { title: "Name", dataIndex: "name", key: "name" },
//       { title: "Description", dataIndex: "description", key: "description" },
//       { title: "Price", dataIndex: "price", key: "price" },
//       { title: "Category", dataIndex: "category", key: "category" },
//     ];

//     return <Table className="custom-table" columns={productColumns} dataSource={products} rowKey={(item) => item._id} pagination={false} size="middle" bordered />;
//   };

//   // main table columns → order & customer details
//   const columns: ColumnsType<OrderType> = [
//     {
//       title: "ID",
//       key: "index",
//       render: (_, __, index) => (pageNumber - 1) * pageSize + index + 1,
//     },
//     {
//       title: "User Name",
//       dataIndex: "userId",
//       key: "userId",
//       render: (_, record) => (record?.userId?.firstName ? `${record?.userId?.firstName} ${record?.userId?.lastName}` : "-"),
//       // onCell: (record, index) => {
//       //   const uid = record.userId?._id;
//       //   const isFirstOccurrence = AllUser?.order_data?.findIndex((o) => o.userId?._id === uid) === index;
//       //   return {
//       //     rowSpan: isFirstOccurrence ? rowSpanMap[uid] : 0,
//       //   };
//       // },
//       // fixed: "left",
//     },
//     { title: "Customer Name", dataIndex: "name", key: "name" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Phone", dataIndex: "phone", key: "phone" },
//     { title: "Address", dataIndex: "address", key: "address", width: 400 },
//     { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
//     { title: "Price", dataIndex: "price", key: "price" },
//     { title: "Message", dataIndex: "message", key: "message" },
//     {
//       title: "Option",
//       key: "actionIcons",
//       width: 120,
//       fixed: "right",
//       render: (_, record) => (
//         <Flex gap="middle" justify="center">
//           <Button
//             type="text"
//             danger
//             className="m-1 p-1 btn btn-danger"
//             onClick={() => {
//               Modal.confirm({
//                 title: "Are you sure?",
//                 content: `Do you really want to delete "${record.name}"?`,
//                 okText: "Yes, Delete",
//                 cancelText: "Cancel",
//                 onOk: () => handleDelete(record?._id),
//               });
//             }}
//             title="Delete"
//           >
//             <Trash className="action" />
//           </Button>
//         </Flex>
//       ),
//     },
//   ];

//   return (
//     <Fragment>
//       <Breadcrumbs mainTitle="Order" parent="Pages" />
//       <Container fluid className="custom-table">
//         <CardWrapper Search={(e) => handleSetSearch(e)} searchClass="col-md-10 col-sm-7" typeFilterData={generateOptions(User?.data?.User_data)} typeFilter={handleSetSortBy}>
//           <Table
//             bordered
//             className="custom-table"
//             dataSource={AllUser?.order_data}
//             columns={columns}
//             rowKey={(record) => record._id}
//             scroll={{ x: "max-content" }}
//             loading={isLoading}
//             expandable={{ expandedRowRender }}
//             pagination={{
//               current: pageNumber,
//               pageSize: pageSize,
//               total: AllUser?.totalData,
//               showSizeChanger: true,
//               onChange: handlePaginationChange,
//             }}
//           />
//         </CardWrapper>
//       </Container>
//     </Fragment>
//   );
// };

// export default OrderContainer;
