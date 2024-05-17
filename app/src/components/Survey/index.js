import React, { useContext, useEffect, useState } from "react";
import { AutoComplete, Button, Input, Radio, Select, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import accountService from "api/account";
import swal from "sweetalert2";
import { AccountContext } from "stores/AccountContext";
import { calculateAge, calculateBMR } from "utils/calculate";
import { PlusOutlined } from "@ant-design/icons";
import "./style.css";
import formatter from "utils/formatter";
import CurrencyInput from "react-currency-input-field";
import mealService from "api/meal";

const { Option } = Select;

const Survey = () => {
  const { account } = useContext(AccountContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [bmi, setBmi] = useState([]);
  const [bmr, setBmr] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [cuisine, setCuisine] = useState("Vietnamese");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [suggestedCalories, setSuggestedCalories] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [searchTermVisible, setSearchTermVisible] = useState(false);

  const navigator = useNavigate();

  const fetchIngredients = async () => {
    try {
      const response = await mealService.getIngredientNames();
      const ingredientList = response.data.names;
      const data = ingredientList.map((ingredient) => ({ value: ingredient }));
      setIngredients(ingredientList);
      setDataSource(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterIngredients = (searchTerm) => {
    const filtered = ingredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const data = filtered.map((ingredient) => ({ value: ingredient }));
    setDataSource(data);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleClose = (removedTag) => {
    const newAllergies = allergies.filter((tag) => tag !== removedTag);
    setAllergies(newAllergies);
  };

  const showSearchTerm = () => {
    setSearchTermVisible(true);
  };

  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
    filterIngredients(value);
  };

  const handleSearchTermConfirm = (value) => {
    if (value && !allergies.includes(value.trim())) {
      setAllergies([...allergies, value.trim()]);
    }
    setSearchTermVisible(false);
    setSearchTerm("");
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  const handleWeightChange = (value) => {
    setWeight(value);
  };

  const handleHeightChange = (value) => {
    setHeight(value);
  };

  const handleActivityLevelChange = (value) => {
    setActivityLevel(value);
  };

  const calculateCalories = () => {
    const age = calculateAge(account.dateOfBirth);
    const bmrResult = calculateBMR(account.gender, weight, height, age);
    const bmiResult = weight / ((height * height) / 10000);
    setBmi(bmiResult);
    setBmr(bmrResult);

    let suggestedCaloriesResult = 0;
    switch (activityLevel) {
      case "sedentary":
        suggestedCaloriesResult = bmrResult * 1.2;
        break;
      case "light":
        suggestedCaloriesResult = bmrResult * 1.375;
        break;
      case "moderate":
        suggestedCaloriesResult = bmrResult * 1.55;
        break;
      case "active":
        suggestedCaloriesResult = bmrResult * 1.725;
        break;
      default:
        break;
    }
    suggestedCaloriesResult = Math.round(suggestedCaloriesResult);
    setSuggestedCalories(suggestedCaloriesResult);
  };

  const onSubmit = async () => {
    try {
      if (
        allergies &&
        cuisine &&
        height &&
        weight &&
        maxPrice &&
        activityLevel &&
        suggestedCalories
      ) {
        const entity = {
          allergies,
          cuisine,
          height,
          weight,
          maxPrice,
          activityLevel,
          suggestedCalories,
          BMI: bmi,
          BMR: bmr,
        };

        setIsLoading(true);
        const response = await accountService.updateUserPreferences(entity);
        setIsLoading(false);

        const { exitcode, message } = response.data;

        if (exitcode === 0) {
          swal.fire({
            title: "Success",
            text: "Cảm ơn bạn đã hoàn thành khảo sát, mời bạn đến với EatWell!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigator("/meal/suggest");
        } else {
          setError(message);
        }
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
    <div className="d-flex container flex-column justify-content-center my-4">
      <p style={{ fontWeight: "700", color: "red", fontSize: "20px" }}>
        Vui lòng nhập các thông tin cần thiết để chúng tôi hiểu thêm về tình
        trạng của bạn hơn!
      </p>
      <div style={{ width: "100%", borderBottom: "1px solid #eeeeee" }} />
      <div />

      <div
        className="calorie-calc-row"
        style={{ marginBottom: "5px", width: "40%" }}
      >
        <div
          className="calorie-calc-field-text"
          style={{ marginBottom: "5px", display: "block", fontWeight: "600" }}
        >
          Chiều cao
        </div>
        <div className="calorieCalcHeight">
          <Input
            type="number"
            placeholder="Nhập chiều cao của bạn"
            addonAfter="cm"
            size="large"
            onChange={handleHeightChange}
          />
        </div>
      </div>
      <div
        className="calorie-calc-row"
        style={{ marginBottom: "5px", width: "40%" }}
      >
        <div
          className="calorie-calc-field-text"
          style={{ marginBottom: "5px", display: "block", fontWeight: "600" }}
        >
          Cân nặng
        </div>
        <Input
          type="number"
          placeholder="Nhập cân nặng của bạn"
          addonAfter="kg"
          size="large"
          onChange={handleWeightChange}
        />
      </div>

      {/* <div style={{ width: "40%" }}>
        <div>
          <label
            style={{ marginBottom: "5px", display: "block", fontWeight: "600" }}
          >
            Thực phẩm dị ứng
          </label>
        </div>
        {Array.isArray(allergies) &&
          allergies.map((allergy) => (
            <Tag
              key={allergy}
              closable
              onClose={() => handleRemoveAllergy(allergy)}
              style={{
                marginBottom: "5px",
                marginRight: "5px",
                height: "25px",
                borderRadius: "5px",
                backgroundColor: "#18AEAC",
                color: "#ffff",
                fontWeight: "600",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              {allergy}
            </Tag>
          ))}
        <Input
          type="text"
          size="large"
          value={allergyInput}
          onChange={handleAllergyInputChange}
          onPressEnter={handlePressEnter}
          placeholder="Nhập thực phẩm bạn dị ứng"
        />
      </div> */}
      <div style={{ width: "40%" }}>
        <div>
          <label
            style={{ marginBottom: "5px", display: "block", fontWeight: "600" }}
          >
            Thực phẩm dị ứng
          </label>
        </div>

        <div>
          {allergies.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                key={tag}
                closable
                onClose={() => handleClose(tag)}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "5px",
                  marginRight: "5px",
                  lineHeight: "35px",
                  borderRadius: "5px",
                  backgroundColor: "#18AEAC",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {searchTermVisible && (
            <div>
              <AutoComplete
                style={{ width: "100%" }}
                options={dataSource}
                value={searchTerm}
                onSelect={handleSearchTermConfirm}
                onSearch={handleSearchTermChange}
                placeholder="Tìm kiếm thực phẩm..."
              />
            </div>
          )}

          {!searchTermVisible && (
            <Tag
              onClick={showSearchTerm}
              style={{
                background: "#fff",
                borderStyle: "dashed",
              }}
            >
              <PlusOutlined /> New Allergy
            </Tag>
          )}
        </div>
      </div>

      {/* <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {filterIngredients().map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div> */}

      <div style={{ marginBottom: "5px", width: "40%" }}>
        <label style={{ display: "block", fontWeight: "600" }}>
          Max Price{" "}
        </label>

        <CurrencyInput
          className="custom-currency-input"
          placeholder="Nhập số tiền tối đa"
          allowDecimals={true}
          decimalsLimit={2}
          prefix="VNĐ   "
          value={maxPrice}
          onValueChange={handleMaxPriceChange}
          style={{ borderColor: "GrayText" }}
        />
      </div>
      <div
        className="calorieCalcRow"
        style={{ marginBottom: "5px", width: "40%" }}
      >
        <div
          clas
          sName="calorieCalcFieldText"
          style={{ marginBottom: "5px", display: "block", fontWeight: "600" }}
        >
          Chọn nền ẩm thực
        </div>
        <Select
          className="calorieCalcField"
          name="cuisine"
          defaultValue="Vietnamese"
          size="large"
          style={{ minWidth: "100%" }}
          value={cuisine}
          onChange={(value) => setCuisine(value)}
        >
          <Option value="Vietnamese">Việt Nam</Option>
          <Option value="Chinese">Trung Quốc</Option>
          <Option value="Thai">Thái Lan</Option>
          <Option value="Indian">Ấn Độ</Option>
          <Option value="Korean">Hàn Quốc</Option>
          <Option value="Japanese">Nhật Bản</Option>
          <Option value="Bangladeshi">Bangladesh</Option>
        </Select>
      </div>

      <div
        className="calorieCalcRow"
        style={{ marginBottom: "5px", width: "40%" }}
      >
        <div
          className="calorieCalcFieldText"
          style={{ marginBottom: "5px", display: "block", fontWeight: "600" }}
        >
          Mức độ hoạt động
        </div>
        <Select
          className="calorieCalcField"
          name="activityLevel"
          defaultValue="sedentary"
          size="large"
          style={{ minWidth: "100%" }}
          value={activityLevel}
          onChange={handleActivityLevelChange}
        >
          <Option value="sedentary">Rất ít vận động</Option>
          <Option value="light">Vận động nhẹ</Option>
          <Option value="moderate">Vận động vừa phải</Option>
          <Option value="active">Vận động nhiều</Option>
        </Select>
      </div>
      <div>
        <Button
          className="primary-btn bg-key secondary-btn"
          type="primary"
          size="large"
          onClick={calculateCalories}
          loading={isLoading}
          disabled={isLoading}
          // style={{ backgroundColor: "#ff6600" }}
        >
          Tính Calories
        </Button>
      </div>
      <div
        className="calorieCalcApplyRow"
        style={{
          marginTop: "15px",
          opacity: suggestedCalories === 0 ? 0 : 1,
          height: suggestedCalories === 0 ? 0 : "40px",
        }}
      >
        <div
          style={{
            width: "450px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>Lượng calo đề xuất:&nbsp;&nbsp;</div>
            <span className="underline" style={{ fontWeight: 500 }}>
              {suggestedCalories}
            </span>
          </div>
          <Button
            className="primary-btn bg-key signup-btn col-6"
            type="primary"
            size="large"
            onClick={onSubmit}
            loading={isLoading}
            disabled={isLoading}
          >
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Survey;
