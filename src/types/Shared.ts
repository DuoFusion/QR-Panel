// ************ Svg's ***********

import type { ColorPickerProps, GetProp, UploadProps } from "antd";
import { UploadListType } from "antd/es/upload/interface";
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
  inputGroupIcon?: any;
}

export interface OtpInputProps {
  val: string[];
  setVal: (val: string[]) => void;
  submitForm?: (values: { otp: string }, formikHelpers: FormikHelpers<{ otp: string }>) => void;
}

export interface SelectInputProps {
  label?: string;
  name: string;
  required?: boolean;
  options: { value: string | number; label: string; disabled?: boolean }[];
  placeholder?: string;
  [key: string]: any;
}

export interface ColorPickerInputProps extends Omit<ColorPickerProps, "value" | "onChange"> {
  label?: string;
  name: string;
  required?: boolean;
  [key: string]: any;
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
  children?: React.ReactNode;
  cardProps?: React.ComponentProps<typeof Card>;
  bodyProps?: React.ComponentProps<typeof CardBody>;
}

// ************ Common Api Data Type ***********

export interface PageState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface PageStatus {
  totalData: number;
  state: PageState;
}

export interface MessageStatus {
  status: number;
  message: string;
  error: Record<string, any>;
}

// ************ Upload ***********

export interface UploadResponse {
  data: string;
  error: Record<string, unknown>;
  message: string;
  status: number;
}

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export interface ImageUploadProps {
  fileList: string[];
  setFileList: React.Dispatch<React.SetStateAction<string[]>>;
  multiple?: boolean;
  name?: string;
  accept?: string;
  isListType?: UploadListType;
  label?: string;
  required?: boolean;
}
