import { Avatar, Button, Descriptions, Badge } from "antd";
import Upload from "antd/lib/upload/Upload";
import { AccountContext } from "stores/AccountContext";
import defaultAvatar from "images/avatar.png";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import accountService from "api/account";
import swal from "sweetalert2";
import { isImage, sizeLessMegaByte } from "utils/validator";

const UserInformationPage = (props) => {
  const { account, fetchAccount } = useContext(AccountContext);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchAccount();
  }, []);

  const uploadProps = {
    maxCount: 1,
    accept: "image/png, image/jpeg",
    showUploadList: false,

    async beforeUpload(file) {
      if (!(isImage(file.type) && sizeLessMegaByte(file.size, 5))) {
        swal.fire({
          text: "Ảnh không hợp lệ!",
          icon: "error",
          confirmButtonText: "OK",
        });
        return false;
      }

      setIsUploading(true);
      const response = await accountService.uploadAvatar(file);
      const { exitcode } = response.data;
      if (exitcode === 0) {
        await swal.fire({
          text: "Thay đổi anh đại diện thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        console.log(account.avatar_path);
        window.location.reload();
      }
      setIsUploading(false);
      return false;
    },
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Avatar
          className="border rounded-circle"
          size={128}
          src={account.avatar_path || defaultAvatar}
        />
      </div>
      <div className="my-2 d-flex justify-content-center">
        <Upload {...uploadProps}>
          <Button
            disabled={isUploading}
            loading={isUploading}
            shape="round"
            size="large"
          >
            Đăng ảnh đại diện
          </Button>
        </Upload>
      </div>
      <Badge.Ribbon
        text={account.isVerified ? "Đã xác nhận" : "Chưa xác nhận"}
        color={account.isVerified ? "green" : "red"}
      >
        <Descriptions bordered className="border rounded my-4">
          <Descriptions.Item label="Họ tên" span={3}>
            {account.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {account.dateOfBirth}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính" span={2}>
            {account.gender === "male" ? "Nam" : "Nữ"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{account.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại" span={2}>
            {account.phone}
          </Descriptions.Item>
        </Descriptions>
      </Badge.Ribbon>
    </div>
  );
};

export default UserInformationPage;
