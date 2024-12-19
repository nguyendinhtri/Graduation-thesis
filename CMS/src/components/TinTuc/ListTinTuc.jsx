import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import React from "react";

const ListTinTuc = ({ data, isLoading, openEdit, onDelete }) => {
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => index + 1,
      width: "5%",
    },
    {
      title: "Tiêu đề",
      dataIndex: "TITLE",
      sorter: (a, b) => a.NAME - b.NAME,
    },
    {
      title: "Mô tả",
      dataIndex: "DESC",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: ``,
      dataIndex: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <>
          <Space size="middle">
            <Button
              size="small"
              type="primary"
              icon={<EditOutlined />}
              className={"btn-warning"}
              onClick={() => openEdit(record)}
            />
            <Button
              size="small"
              type="primary"
              icon={<DeleteOutlined />}
              className={"btn-danger"}
              onClick={() => onDelete(record.id)}
            />
          </Space>
        </>
      ),
    },
  ];
  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </div>
  );
};

export default ListTinTuc;
