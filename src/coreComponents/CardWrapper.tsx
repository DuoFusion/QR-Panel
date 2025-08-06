import { FC } from "react";
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { CardHeaderProp } from "../types";

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
            <Col xs="7" className={searchClass}>
              <div className="form-group">
                <Input type="text" placeholder="Search" onChange={(e) => Search?.(e.target.value)} />
                <i className="fa fa-search" />
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
