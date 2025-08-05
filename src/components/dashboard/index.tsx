import React, { Fragment } from "react";
import Breadcrumbs from "../../coreComponents/Breadcrumbs";
// import { queries } from "../../api";

const Dashboard = () => {
  // const { data, isLoading } = queries.useGetTeams();
  // console.log("data", data);

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Dashboard" parent="Pages" />
    </Fragment>
  );
};

export default Dashboard;
