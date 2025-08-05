import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { Href } from "../constants";
import { CardHeaderProp } from "../types";

const CardWrapper: FC<CardHeaderProp> = ({ title, headClass, Search, searchClass, btnTitle, btnClick, btnLink, typeFilter, typeFilterData, children, bodyProps = {}, cardProps = {} }) => {
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
            <Col xs="7" className={searchClass}>
              <div className="form-group">
                <Input type="text" placeholder="Search" onChange={(e) => Search?.(e.target.value)} />
                <i className="fa fa-search"></i>
              </div>
            </Col>
          )}
          {typeFilter && (
            <Col md="2" sm="7" xs="12">
              <div className="form-group m-0">
                <select className="form-select" onChange={(e) => typeFilter(e.target.value)}>
                  <option value="">-- Select Type --</option>
                  {typeFilterData?.map((link, index) => (
                    <option value={link?.value} key={index}>
                      {link?.label}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
          )}
          {btnClick && (
            <Col md="2" sm="5" xs="12">
              <div className="form-group">
                <Button color="primary" className="w-100" onClick={() => btnClick()}>
                  {btnTitle}
                </Button>
              </div>
            </Col>
          )}
          {btnLink && (
            <Col md="2" sm="5" xs="12">
              <div className="form-group">
                <Link to={btnLink || Href}>
                  <Button color="primary" className="w-100">
                    {btnTitle}
                  </Button>
                </Link>
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
