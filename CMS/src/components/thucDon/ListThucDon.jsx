import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image, Space, Table } from "antd";
import React from "react";

const ListThucDon = ({
  data,
  isLoading,
  openEdit,
  onDelete,
  handleOpenModal,
  handleOpenSetting,
  deleteSettingThucdon,
}) => {
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => index + 1,
      width: "5%",
    },
    {
      title: "Thứ",
      render: (_, record) => {
        const label = [
          "Thứ 2",
          "Thứ 3",
          "Thứ 4",
          "Thứ 5",
          "Thứ 6",
          "Thứ 7",
          "Chủ nhật",
        ];
        return label[record?.DOW - 1] || ""; // Trả về label tương ứng với giá trị THU
      },
      sorter: (a, b) => a.DOW - b.DOW,
    },
    {
      title: "Giai đoạn",
      render: (_, record) => {
        const label = ["3 tháng đầu", "3 - 6 tháng", "3 tháng cuối"];
        return label[record?.PHASE - 1] || "";
      },
      sorter: (a, b) => a.PHASE - b.PHASE,
    },
    {
      title: "Phân loại",
      render: (_, record) => record?.Classify?.NAME,
      sorter: (a, b) => a?.Classify?.NAME - b?.Classify?.NAME,
    },
    {
      title: ``,
      dataIndex: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <>
          <Space size="small">
            <Button
              size="small"
              onClick={() => handleOpenSetting(record?.id)}
              title="Create"
              type="primary"
              style={{
                display: "block",
              }}
              icon={<PlusOutlined />}
            />
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

  const expandedRowRender = (data) => {
    let listNutri = data?.Setting_Menus?.reduceRight(function (
      previous,
      current
    ) {
      previous.push(current);
      return previous;
    },
    []);
    // SET KEY FOR DATA LIST CLASS
    let modifiedData = listNutri?.map((item) => ({
      ...item?.Food,
      key: item?.Food?.id,
      idSetting: item?.id,
    }));
    console.log("modifiedData", modifiedData);
    const columns2 = [
      {
        title: "STT",
        render: (_, record, index) => index + 1,
        width: "5%",
      },
      {
        title: "Hình ảnh",
        render: (_, record) => (
          <Image
            width={150}
            src={`http://localhost:8345/files/${record?.Image_Foods?.[0]?.NAME}`}
            preview={false}
          />
        ),
      },
      {
        title: "Tên",
        dataIndex: "NAME",
        sorter: (a, b) => a.NAME - b.NAME,
      },
      {
        title: "Buổi",
        render: (_, record) =>
          record?.TYPE === 1 ? "Sáng" : record?.TYPE === 2 ? "Trưa" : "Tối",
        sorter: (a, b) => a.TYPE - b.TYPE,
      },
      {
        title: ``,
        dataIndex: "operation",
        fixed: "right",
        width: 100,
        render: (_, record) => (
          <>
            <Button
              size="small"
              type="primary"
              icon={<DeleteOutlined />}
              className={"btn-danger"}
              onClick={() => deleteSettingThucdon(record.idSetting)}
            />
          </>
        ),
      },
    ];

    return (
      <Table
        columns={columns2}
        dataSource={modifiedData.sort(
          (a, b) => Date.parse(b.OPENING_DATE) - Date.parse(a.OPENING_DATE)
        )}
        pagination={false}
        className="gray-color-thead"
        style={{ marginBottom: 30 }}
      />
    );
  };
  let modifiedData = data?.map((item) => ({
    ...item,
    key: item.id,
  }));
  return (
    <div>
      <Table
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => {
            return record?.Setting_Menus?.length > 0;
          },
          columnWidth: 25,
        }}
        dataSource={modifiedData}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </div>
  );
};

export default ListThucDon;
