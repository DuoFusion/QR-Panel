import { ColorPicker } from "antd";
import { FieldHookConfig, useField } from "formik";
import { Label } from "reactstrap";
import { ColorPickerInputProps } from "../../types";

const ColorPickerInput = ({ label, name, required, ...props }: ColorPickerInputProps) => {
  const fieldConfig: FieldHookConfig<any> = { name };
  const [field, meta, helpers] = useField(fieldConfig);

  const handleChange = (color: any) => {
    helpers.setValue(color.toHexString());
  };

  return (
    <div className="input-box">
      {label && (
        <Label htmlFor={props.id || name}>
          {label}
          {required && <span className="required ps-1">*</span>}
        </Label>
      )}

      <div style={{ display: "flex", alignItems: "center" }}>
        <ColorPicker {...props} value={field.value || props.defaultValue || "#1677ff"} onChange={handleChange} />
      </div>

      {meta.error && <div className="invalid-feedback d-block">{meta.error}</div>}
    </div>
  );
};

export default ColorPickerInput;
