import React, { useContext, useEffect, useState } from "react";
import { Form, InputNumber, Select, Checkbox, Button, Radio } from "antd";
import CurrencyInput from "react-currency-input-field";
import "./style.css";
import swal from "sweetalert2";
import { AccountContext } from "stores/AccountContext";
import { useNavigate } from "react-router-dom";
import mealService from "api/meal";

const { Option } = Select;

const MealForm = () => {
  const { account, preferences, fetchAccount, fetchPreferences } =
    useContext(AccountContext);
  const [maxPrice, setMaxPrice] = useState(0);
  const [mealplan, setMealplan] = useState([0, 0, 0, 0, 0]);
  const [lowSalt, setLowSalt] = useState(false);
  const [lowCholesterol, setLowCholesterol] = useState(false);
  const [days, setDays] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const navigator = useNavigate();

  useEffect(() => {
    fetchAccount();
    fetchPreferences();
  }, []);

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
    console.log(maxPrice);
  };

  const handleChange = (mealIndex, value) => {
    const newMealplan = [...mealplan];
    newMealplan[mealIndex] = value;
    setMealplan(newMealplan);
    console.log(mealplan);
  };

  const renderCheckboxes = (mealIndex) => {
    return [0, 1, 2, 3, 4].map((val) => (
      <Checkbox
        key={`${mealIndex}-${val}`}
        checked={mealplan[mealIndex] === val}
        onChange={() => handleChange(mealIndex, val)}
        style={{
          margin: "0 10px",
          fontWeight: "600",
        }}
        className="custom-checkbox"
      >
        {val}
      </Checkbox>
    ));
  };

  const handleSaltChange = (e) => {
    setLowSalt(e.target.value);
    console.log(lowSalt);
  };

  const handleCholesterolChange = (e) => {
    setLowCholesterol(e.target.value);
    console.log(lowCholesterol);
  };
  const handleDaysChange = (value) => {
    setDays(value);
    console.log(days);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (maxPrice) {
        const queryString = new URLSearchParams({
          userId: account._id ? account._id : "663e23d97c96a8f9ccd57d3a",
          cost_limit: maxPrice ? maxPrice : 300000,
          days: days,
          low_salt: lowSalt,
          low_cholesterol: lowCholesterol,
          fibre_limit: preferences.healthRecords
            ? preferences.healthRecords[preferences.healthRecords.length - 1]
                .nutritionPerDay.fiber
            : 35,

          kcal_limit: preferences ? preferences.suggestedCalories : 1784,

          carb_kcal_limit: preferences.healthRecords
            ? preferences.healthRecords[preferences.healthRecords.length - 1]
                .nutritionPerDay.carbohydrat
            : 212,
          protein_kcal_limit: preferences.healthRecords
            ? preferences.healthRecords[preferences.healthRecords.length - 1]
                .nutritionPerDay.protein
            : 75,
          fat_kcal_limit: preferences.healthRecords
            ? preferences.healthRecords[preferences.healthRecords.length - 1]
                .nutritionPerDay.fat
            : 51,
          meal_count_str: mealplan ? mealplan.join(",") : "1%2C0%2C2%2C2%2C0",
        }).toString();

        setIsLoading(true);
        const response = await mealService.getGenMealFastApi(queryString);
        setIsLoading(false);
        const { message, meal_plan } = response.data;
        console.log(meal_plan);
        // if (message === "Gen meal successfully") {
        //   swal.fire({
        //     title: "Success",
        //     text: "Gợi ý thực đơn thành công, mời bạn nhấn OK để xem thực đơn!",
        //     icon: "success",
        //     confirmButtonText: "OK",
        //   });
        // } else {
        //   setError(message);
        // }
      } else {
        swal.fire({
          text: "Vui lòng điền đầy đủ tất cả các trường",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      navigator("/error");
    }
  };

  return (
    <div className="d-flex container flex-column justify-content-center my-3">
      <div className="col-md-4">
        <form onSubmit={onSubmit}>
          <h2
            className="mb-3 color-key "
            style={{ fontWeight: "500", marginLeft: "30px" }}
          >
            Đề xuất thực đơn
          </h2>

          <div style={{ marginBottom: "5px" }}>
            <label style={{ display: "block", fontWeight: "600" }}>
              Giới hạn giá
            </label>
            <CurrencyInput
              className="custom-currency-input"
              placeholder="Nhập số tiền tối đa"
              allowDecimals={true}
              decimalsLimit={2}
              suffix="  VNĐ"
              value={maxPrice}
              onValueChange={handleMaxPriceChange}
              style={{ borderColor: "GrayText", marginLeft: "20px" }}
            />
          </div>

          <div style={{ marginBottom: "5px" }}>
            <label style={{ display: "block", fontWeight: "600" }}>
              Số bữa ăn sáng
            </label>
            {renderCheckboxes(0)}
          </div>

          <div style={{ marginBottom: "5px" }}>
            <label style={{ display: "block", fontWeight: "600" }}>
              Số bữa ăn trưa
            </label>
            {renderCheckboxes(1)}
          </div>

          <div style={{ marginBottom: "5px" }}>
            <label style={{ display: "block", fontWeight: "600" }}>
              Số bữa ăn xế
            </label>
            {renderCheckboxes(2)}
          </div>

          <div style={{ marginBottom: "5px" }}>
            <label style={{ display: "block", fontWeight: "600" }}>
              Số bữa ăn tối
            </label>
            {renderCheckboxes(3)}
          </div>

          <div style={{ marginBottom: "5px" }}>
            <label style={{ display: "block", fontWeight: "600" }}>
              Số bữa ăn khuya
            </label>
            {renderCheckboxes(4)}
          </div>

          <div>
            <label style={{ fontWeight: "600", marginRight: "10px" }}>
              Ít muối:
            </label>
            <Radio.Group
              className="radio-group"
              onChange={handleSaltChange}
              value={lowSalt}
              size="medium"
              buttonStyle="solid"
              style={{ fontWeight: "600" }}
            >
              <Radio.Button value="true">Low</Radio.Button>
              <Radio.Button value="false">High</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <label style={{ fontWeight: "600", marginRight: "10px" }}>
              Ít Cholesterol:
            </label>
            <Radio.Group
              className="radio-group"
              onChange={handleCholesterolChange}
              value={lowCholesterol}
              size="medium"
              buttonStyle="solid"
              style={{ fontWeight: "600" }}
            >
              <Radio.Button value="true">Low</Radio.Button>
              <Radio.Button value="false">High</Radio.Button>
            </Radio.Group>
          </div>

          <div className="row mb-3 align-items-center">
            <label
              className="col-5 col-form-label"
              style={{ fontWeight: "600" }}
            >
              Chọn số ngày:
            </label>
            <div className="col-5 d-flex align-items-center">
              <Select
                defaultValue={1}
                onChange={handleDaysChange}
                className="select-days"
                style={{ width: "100%" }}
              >
                <Option value={1}>1 ngày</Option>
                <Option value={7}>1 tuần</Option>
              </Select>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <Button
                className="primary-btn bg-key signup-btn"
                type="primary"
                size="large"
                htmlType="submit"
                style={{ width: "50%" }}
              >
                GENERATE
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MealForm;
