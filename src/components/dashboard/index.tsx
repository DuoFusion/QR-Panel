import React from "react";
import { queries } from "../../api";

const Dashboard = () => {
  const { data, isLoading } = queries.useGetTeams();
  console.log("data", data);

  return <div>Dashboard</div>;
};

export default Dashboard;
