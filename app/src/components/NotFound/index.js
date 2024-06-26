import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const NotFound = () => {
  const navigation = useNavigate();
  return (
    <Result
      status="404"
      className="d-flex container flex-column justify-content-center my-5"
      style={{ height: "60vh" }}
      title="404"
      subTitle="Trang bạn tìm kiếm không tồn tại"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigation("/");
          }}
        >
          Trang chủ
        </Button>
      }
    />
  );
};

export default NotFound;
