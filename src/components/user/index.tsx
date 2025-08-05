import React, { Fragment } from "react";
import Breadcrumbs from "../../coreComponents/Breadcrumbs";
import { Container } from "reactstrap";
import CardWrapper from "../../coreComponents/CardWrapper";

const UserContainer = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="User" parent="Pages" />
      <Container fluid>
        <CardWrapper Search={(e) => (e)} searchClass="col-md-10 col-sm-7" btnTitle="Add User" btnClick={() => {}}>
          
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default UserContainer;
