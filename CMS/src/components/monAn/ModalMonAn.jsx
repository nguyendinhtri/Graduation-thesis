import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import monAnApi from "../../api/monAnApi";
import { useSnackbar } from "notistack";

const ModalMonAn = ({
  isOpen,
  handleCancel,
  isLoading,
  onUpdate,
  updateFileMonAn,
  deleteFileMonAn,
  data,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [form] = useForm();
  const [fileList, setFileList] = useState([]);
  const [avatar, setAvatar] = useState(undefined);
  const [removeFile, setRemoveFile] = useState(undefined);
  const [newFile, setNewFile] = useState([]);

  const onCancel = () => {
    form.resetFields();
    handleCancel();
    setAvatar(undefined);
    setFileList([]);
    setRemoveFile(undefined);
    setNewFile([]);
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
      setFileList([
        {
          id: data?.Image_Foods?.[0]?.id,
          name: data?.Image_Foods?.[0]?.NAME,
          status: "done",
          url: `http://localhost:8345/files/${data?.Image_Foods?.[0]?.NAME}`,
        },
      ]);
    }
  }, [data]);
  const handleOk = async () => {
    form.validateFields().then((values) => {
      if (data) {
        if (removeFile) {
          deleteFileMonAn(removeFile?.id);
        }
        if (newFile?.length) {
          handleUpdateFileMonAn(data?.id);
        }
        onUpdate(values, data?.id, () => onCancel());
      } else {
        handleCreate(values);
      }
    });
  };
  const handleCreate = async (data) => {
    let res = await monAnApi.createMonAn(data);
    if (res.data) {
      handleUpLoadFileMonAn(res.data?.elements?.id);
      enqueueSnackbar(res?.data?.message, { variant: "success" });
    }
  };
  const handleUpLoadFileMonAn = (id) => {
    let formData = new FormData();
    formData.append("FOOD_ID", id);
    if (avatar && avatar.originFileObj) {
      formData.append("uploadFile", avatar?.originFileObj);
    }
    updateFileMonAn(formData, () => onCancel());
  };
  const handleUpdateFileMonAn = (id) => {
    let formData = new FormData();
    formData.append("FOOD_ID", id);
    if (newFile?.length && newFile?.[0].originFileObj) {
      formData.append("uploadFile", newFile?.[0]?.originFileObj);
    }
    updateFileMonAn(formData, () => {});
  };
  const onChange = ({ fileList: newFileList }) => {
    if (data) {
      let newImage = [...newFileList];
      if (newImage && newImage.length > 0) {
        newImage[0].status = "success";
      }
      setNewFile(newImage);
      setFileList(newImage);
    } else {
      let newImage = [...newFileList];
      if (newImage && newImage.length > 0) {
        newImage[0].status = "success";
      }
      setFileList(newImage);
    }
  };
  const onSelectFile = ({ fileList }) => {
    if (!fileList || fileList.length === 0) {
      setAvatar(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setAvatar(fileList[0]);
  };
  const onRemoveFile = (data) => {
    setRemoveFile(data);
    setFileList([]);
  };
  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <>
      <Modal
        title="Phân loại"
        visible={isOpen}
        onCancel={onCancel}
        footer={[
          <Button type="second" onClick={onCancel}>
            Cancel
          </Button>,
          <Button type="primary" onClick={handleOk}>
            {isLoading ? <LoadingOutlined /> : "OK"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{
            span: 5,
          }}
          wrroleerCol={{
            span: 19,
          }}
        >
          <Form.Item
            label="Tên"
            name="NAME"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên loại",
              },
            ]}
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item label="Buổi" name="TYPE">
            <Select
              options={[
                {
                  value: 1,
                  label: "Sáng",
                },
                {
                  value: 2,
                  label: "Trưa",
                },
                {
                  value: 3,
                  label: "Tối",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="avt" label="Avatar">
            <ImgCrop rotate>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={(e) => {
                  onChange(e);
                  onSelectFile(e);
                }}
                onPreview={onPreview}
                onRemove={onRemoveFile}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalMonAn;
