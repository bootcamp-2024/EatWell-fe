import { Menu } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import i18n from "language/i18n";
import { useTranslation } from "react-i18next";

const AccountBar = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const items = [
    { key: "userInformation", label: t("accountBar.userInformation") },
    { key: "changeInformation", label: t("accountBar.changeInformation") },
    { key: "healthSettings", label: t("accountBar.healthManagement") },
  ];

  const onClick = (e) => {
    navigate({
      pathname: `/meal/settings/${e.key}`,
    });
  };

  return (
    <>
      <div className="col-lg-3">
        <div className="hero__categories__all">
          <i className="fa fa-bars"></i>
          <span>{t("accountBar.customize")}</span>
        </div>

        <Menu
          onClick={onClick}
          defaultSelectedKeys={["userInformation"]}
          style={{ border: "1px solid #e8e8e8" }}
          mode="inline"
          items={items}
        />
      </div>
    </>
  );
};

export default AccountBar;
