// ************ Svg's ***********

import { ReactNode } from "react";
import { InputProps } from "reactstrap";

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
  label?: string
  name: string
  iconProps?: SvgProps
  children?: ReactNode
  containerClass?: string
}