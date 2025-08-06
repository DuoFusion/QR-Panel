// ************ Svg's ***********

import { FormikHelpers } from "formik";
import { ReactNode } from "react";
import { Card, CardBody, InputProps } from "reactstrap";

export interface SvgProps {
  iconId: string | undefined;
  className?: string;
  style?: {
    height?: number;
    width?: number;
    fill?: string;
    marginRight?: number;
  };
  onClick?: () => void;
}

// ************ Images ***********

export interface ImageProps {
  className?: string;
  src: string;
  alt?: string;
  style?: object;
  height?: number;
  id?: string;
  title?: string;
  width?: number;
}

// ************ Form/Input Fields ***********

export interface TextInputProps extends InputProps {
  label?: string;
  name: string;
  children?: ReactNode;
  required?: boolean;
}

export interface OtpInputProps {
  val: string[];
  setVal: (val: string[]) => void;
  submitForm?: (values: { otp: string }, formikHelpers: FormikHelpers<{ otp: string }>) => void;
}

// ************ Breadcrumbs ***********

export interface BreadcrumbsProps {
  mainTitle: string;
  parent: string;
}

// ************ CardHeaderProp ***********

export interface TypeFilterData {
  value?: string;
  label?: string;
}

export interface CardHeaderProp {
  title?: string;
  headClass?: string;
  Search?: (key: string) => void;
  searchClass?: string;
  btnTitle?: string;
  btnClick?: () => void;
  typeFilter?: (id: string) => void;
  typeFilterData?: TypeFilterData[];
  children?: React.ReactNode
  cardProps?: React.ComponentProps<typeof Card>
  bodyProps?: React.ComponentProps<typeof CardBody>
}

// ************ CardHeaderProp ***********

export interface PageState {
  page: number;
  limit: number;
  page_limit: number;
}