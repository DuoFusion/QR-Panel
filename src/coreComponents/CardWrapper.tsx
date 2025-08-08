import { FC } from "react";
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { CardHeaderProp } from "../types";
import { Select } from "antd";

const CardWrapper: FC<CardHeaderProp> = ({ title, headClass, Search, searchClass, btnTitle, btnClick, typeFilter, typeFilterData, children, bodyProps = {}, cardProps = {} }) => {
  return (
    <Card {...cardProps}>
      <CardHeader className={`card-header-box ${headClass ? headClass : ""}`}>
        <Row className="g-3">
          {title && (
            <Col md="10" sm="7" xs="12" className="d-flex align-items-center">
              <h4>{title}</h4>
            </Col>
          )}
          {Search && (
            <Col xs="12" className={searchClass}>
              <div className="form-group">
                <Input type="text" placeholder="Search" onChange={(e) => Search?.(e.target.value)} />
                <i className="fa fa-search" />
              </div>
            </Col>
          )}
          {typeFilter && (
            <Col xl="2" md="3" sm="7" xs="12">
              <div className="form-group">
                <Select showSearch allowClear optionFilterProp="label" placeholder="Select a user" options={typeFilterData} onChange={typeFilter} onClear={() => typeFilter("")} filterOption={(input, option) => (option?.label ?? "").toString().toLowerCase().includes(input.toLowerCase())} />
              </div>
            </Col>
          )}
          {btnClick && (
            <Col xl="2" md="3" sm="5" xs="12">
              <div className="form-group">
                <Button color="primary" className="w-100" onClick={btnClick}>
                  {btnTitle}
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </CardHeader>
      {children && <CardBody {...bodyProps}>{children}</CardBody>}
    </Card>
  );
};

export default CardWrapper;
