import { DatePicker, Form, Input, Typography, Radio, Button } from "antd";

import { useForm } from "antd/lib/form/Form";
import { AccountContext } from "stores/AccountContext";
import moment from "moment";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import accountService from "api/account";
import swal from "sweetalert2";
import { validateMinLength, validatePhone } from "utils/validator";

import i18n from "language/i18n";
import { useTranslation } from "react-i18next";
const { Text, Title } = Typography;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

const UpdateInformationPage = () => {
  const { t } = useTranslation();
  const { account, fetchAccount } = useContext(AccountContext);
  const navigator = useNavigate();
  const { logout } = useContext(AccountContext);
  const [form] = useForm();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
    fetchAccount();
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [account]);

  const handleChangeInformation = async (data) => {
    try {
      const { fullName, gender, dateOfBirth, phone } = data;

      if (!(fullName && gender && dateOfBirth && phone)) {
        return swal.fire({
          title: t("userInformation.changeTitle"),
          text: "Vui lòng nhập tất cả thông tin",
          icon: "info",
          confirmButtonText: "OK",
        });
      }

      if (!validatePhone(phone)) {
        return swal.fire({
          title: "Đổi thông tin",
          text: "Vui lòng nhập số điện thoại hợp lệ",
          icon: "error",
          confirmButtonText: "OK",
        });
      }

      const response = await accountService.updateInformation({
        fullName: fullName,
        gender: gender,
        dateOfBirth: moment(dateOfBirth).format("DD/MM/YYYY"),
        phone: phone,
      });

      const { exitcode } = response.data;

      // eslint-disable-next-line default-case
      switch (exitcode) {
        case 0: {
          await swal.fire({
            title: "Cập nhật thành công",
            text: "Thông tin của bạn đã được cập nhật thành công",
            icon: "success",
            confirmButtonText: "OK",
          });
          window.location.reload();
          break;
        }
        case 103: {
          swal.fire({
            title: "Cập nhật thành công",
            text: "Số điện thoại của bạn được cập nhật thành công",
            icon: "error",
            confirmButtonText: "OK",
          });
          break;
        }
      }
    } catch (err) {
      navigator("/error");
    }
  };

  const handleChangePassword = async (data) => {
    const { password, newPassword, confirmPassword } = data;

    if (!(newPassword && confirmPassword)) {
      return swal.fire({
        text: "Vui lòng nhập đầy đủ tất cả các trường!",
        icon: "info",
        confirmButtonText: "OK",
      });
    }

    if (!validateMinLength(password, 6) || !validateMinLength(newPassword, 6)) {
      return swal.fire({
        text: "Mật khẩu phải có nhiều hơn 6 kí tự",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    if (newPassword !== confirmPassword) {
      return swal.fire({
        text: "Mật khẩu không khớp",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    const response = await accountService.changePassword(
      password,
      newPassword,
      confirmPassword
    );
    const { exitcode } = response.data;

    // eslint-disable-next-line default-case
    switch (exitcode) {
      case 0: {
        await swal.fire({
          title: "Success",
          text: "Thay đổi mật khẩu thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        logout();
        break;
      }
      case 101: {
        swal.fire({
          text: "Mật khẩu không đúng",
          icon: "error",
          confirmButtonText: "OK",
        });
        break;
      }
    }
  };

  return (
    <div>
      <p style={{ fontWeight: "700", color: "#18AEAC", fontSize: "20px" }}>
        CẬP NHẬT THÔNG TIN
      </p>
      <Form form={form} {...formItemLayout} onFinish={handleChangeInformation}>
        <Form.Item
          name="fullName"
          initialValue={account.fullName}
          label="Tên đầy đủ"
          style={{ fontWeight: "500" }}
        >
          <Input size="large" placeholder="Nhập tên đầy đủ" />
        </Form.Item>
        <Form.Item
          name="phone"
          initialValue={account.phone}
          label="Số điện thoại"
          style={{ fontWeight: "500" }}
        >
          <Input size="large" placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 4 }}
          labelCol={{ span: 6 }}
          name="dateOfBirth"
          initialValue={moment(account.dateOfBirth || new Date(), "DD/MM/YYYY")}
          label="Ngày sinh"
          style={{ fontWeight: "500" }}
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Chọn ngày sinh"
            size="large"
            allowClear={false}
            format="DD/MM/YYYY"
          />
        </Form.Item>
        <Form.Item
          initialValue={account.gender}
          span={14}
          wrapperCol={{ span: 8 }}
          labelCol={{ span: 6 }}
          name="gender"
          label="Giới tính"
          style={{ fontWeight: "500" }}
        >
          <Radio.Group style={{ width: "100%" }} size="large">
            <Radio value="male">Nam</Radio>
            <Radio value="female">Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <div
            className="d-flex justify-content-center"
            style={{ justifyItems: "left" }}
          >
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#18AEAC",
                borderRadius: "3px",
                fontWeight: "600",
                marginLeft: "50%",
              }}
            >
              Cập nhật thông tin
            </Button>
          </div>
        </Form.Item>
      </Form>
      <p style={{ fontWeight: "700", color: "#18AEAC", fontSize: "20px" }}>
        THAY ĐỔI MẬT KHẨU
      </p>
      <Form {...formItemLayout} onFinish={handleChangePassword}>
        <Form.Item
          label="Mật khẩu hiện tại"
          name="password"
          style={{ fontWeight: "500" }}
        >
          <Input.Password size="large" placeholder="Nhập mật khẩu hiện tại" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          style={{ fontWeight: "500" }}
        >
          <Input.Password size="large" placeholder="Nhập mật khẩu mới" />
        </Form.Item>
        <Form.Item
          label="Xác nhận lại mật khẩu mới"
          name="confirmPassword"
          style={{ fontWeight: "500" }}
        >
          <Input.Password
            password
            size="large"
            placeholder="Nhập mật khẩu mới"
          />
        </Form.Item>
        <Form.Item>
          <div className="d-flex justify-content-center">
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#18AEAC",
                borderRadius: "3px",
                fontWeight: "600",
                marginLeft: "50%",
              }}
            >
              Thay đổi mật khẩu
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateInformationPage;
