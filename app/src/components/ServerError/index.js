import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const ServerError = () => {
  const navigation = useNavigate();
  return (
    <Result
      status="500"
      title="500"
      subTitle="Internal Server Error"
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

export default ServerError;
