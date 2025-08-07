import { PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Image, Upload } from "antd";
import { FC, useState } from "react";
import { ErrorMessage } from "formik";
import { Label } from "reactstrap";
import { Mutations } from "../../api";
import { FileType, ImageUploadProps } from "../../types";


const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload: FC<ImageUploadProps> = ({ fileList, setFileList, multiple, name, accept, isListType, label, required }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const { mutate: uploadImage, isPending: isUserUpdating } = Mutations.useUpload();
  const { mutate } = Mutations.useDeleteUpload();

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const customUpload: UploadProps["beforeUpload"] = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      uploadImage(formData, {
        onSuccess: (response) => {
          const uploadedUrl = response.data as string;
          const updatedList = multiple ? [...fileList, uploadedUrl] : [uploadedUrl];
          setFileList(updatedList);
        },
      });
    } catch (error) {}

    return false;
  };

  const removeFile = async (imageSrc: string) => {
    try {
      const updatedList = fileList.filter((img) => img !== imageSrc);
      mutate({ imageUrl: imageSrc });
      setFileList(updatedList);
    } catch (err) {}
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="input-box">
      <Label>
        {label ? label : "Upload Logo"} {required && <span className="required">*</span>}
      </Label>
      <Upload
        accept={accept ?? "image/*"}
        listType={isListType ?? "picture-card"}
        fileList={fileList.map((url, index) => ({
          uid: String(index),
          name: `file-${index}${name === "pdf" ? ".pdf" : ".jpg"}`,
          status: "done",
          url,
        }))}
        beforeUpload={customUpload}
        onPreview={handlePreview}
        onRemove={(file) => {
          if (file.url) removeFile(file.url);
        }}
        multiple={multiple}
      >
        {multiple || fileList.length < 1 ? uploadButton : null}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      <ErrorMessage name={name || ""}>{(msg) => <div className="text-danger mt-1">{msg}</div>}</ErrorMessage>
    </div>
  );
};

export default ImageUpload;
