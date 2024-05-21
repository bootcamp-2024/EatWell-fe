import React, { useContext, useEffect, useState } from "react";
import { AutoComplete, Button, Input, Radio, Select, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import accountService from "api/account";
import swal from "sweetalert2";
import { AccountContext } from "stores/AccountContext";
import {
  calculateAge,
  calculateBMR,
  calculateNutritionPerDay,
} from "utils/calculate";
import { PlusOutlined } from "@ant-design/icons";
import "./style.css";
import { LogoutOutlined } from "@ant-design/icons";
import nonVeganLogo from "images/non-vegan-logo.png";
import veganLogo from "images/vegan-logo.png";
import { Col, Row } from "antd";
import formatter from "utils/formatter";
import CurrencyInput from "react-currency-input-field";
import mealService from "api/meal";

const { Option } = Select;

const Survey = () => {
  const { account, fetchAccount } = useContext(AccountContext);
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState("");
  let [bmi, setBmi] = useState("");
  let [bmr, setBmr] = useState("");
  let [allergies, setAllergies] = useState([]);
  let [cuisine, setCuisine] = useState("All");
  let [height, setHeight] = useState("");
  let [weight, setWeight] = useState("");
  let [bodyGoal, setBodyGoal] = useState("lose-weight");
  let [tags, setTags] = useState("non-vegan");
  // const [mealsPerDay, setMealsPerDay] = useState({ breakfast: 0, lunch: 0, snack: 0, dinner: 0 , evening:0});
  let [nutritionPerDay, setNutritionPerDay] = useState({});
  let [activityLevel, setActivityLevel] = useState("sedentary");
  let [suggestedCalories, setSuggestedCalories] = useState(0);
  let [ingredients, setIngredients] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  let [dataSource, setDataSource] = useState([]);
  let [searchTermVisible, setSearchTermVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

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
    fetchAccount();
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

  const handleTagsChange = (e) => {
    const value = e.currentTarget.getAttribute("value");
    setSelectedTag(value);
  };

  const getBackgroundColor = (tag) => {
    return selectedTag === tag ? "#cceeff" : "transparent";
  };

  const handleSearchTermConfirm = (value) => {
    if (value && !allergies.includes(value.trim())) {
      setAllergies([...allergies, value.trim()]);
    }
    console.log(allergies);
    setSearchTermVisible(false);
    setSearchTerm("");
  };

  const handleBodyGoalChange = (e) => {
    setBodyGoal(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(parseInt(e.target.value));
  };

  const handleHeightChange = (e) => {
    setHeight(parseInt(e.target.value));
  };
  const handleActivityLevelChange = (value) => {
    setActivityLevel(value);
  };

  const calculateCaloriesAndNutrition = () => {
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

    switch (bodyGoal) {
      case "increase-weight":
        suggestedCaloriesResult = suggestedCaloriesResult + 300;
        break;
      case "lose-weight":
        suggestedCaloriesResult = suggestedCaloriesResult - 300;
        break;
      default:
        break;
    }
    suggestedCaloriesResult = Math.round(suggestedCaloriesResult);

    setSuggestedCalories(suggestedCaloriesResult);
    // Tính toán chỉ số dinh dưỡng cho cả ngày

    const protein = suggestedCaloriesResult / 20;
    const fat = suggestedCaloriesResult / 20;
    const carbohydrat = suggestedCaloriesResult / 8;
    const fiber = 30;

    setNutritionPerDay({
      protein: Math.round(protein),
      fat: Math.round(fat),
      carbohydrat: Math.round(carbohydrat),
      fiber: Math.round(fiber),
    });
  };
  // const mealOptions = Array.from({ length: 4 }, (_, index) => ({ label: `${index}`, value: index }));

  const onSubmit = async () => {
    try {
      if (
        allergies &&
        cuisine &&
        height &&
        weight &&
        bodyGoal &&
        nutritionPerDay &&
        activityLevel &&
        suggestedCalories
      ) {
        const entity = {
          height,
          weight,
          cuisine,
          allergies,
          tags,
          bodyGoal,
          activityLevel,
          nutritionPerDay,
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
          navigator("/meal/proposed-menu");
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

      <div
        className="calorie-calc-row"
        style={{ marginBottom: "5px", width: "40%" }}
      >
        <div>
          <div
            className="calorie-calc-field-text"
            style={{ marginBottom: "5px", display: "block", fontWeight: "600" }}
          >
            Mục tiêu cân nặng
          </div>
          <Radio.Group
            className="custom-radio-group"
            size="large"
            buttonStyle="solid"
            defaultValue="b"
            onChange={handleBodyGoalChange}
            style={{ color: "#18AEAC", fontWeight: "600" }}
          >
            <Radio.Button value="lose-weight">Giảm cân</Radio.Button>
            <Radio.Button value="maintain">Duy trì</Radio.Button>
            <Radio.Button value="increase-weight">Tăng cân</Radio.Button>
          </Radio.Group>
        </div>
      </div>

      <div
        className="calorie-calc-row"
        style={{ marginBottom: "5px", width: "40%" }}
      >
        <div>
          <div
            className="calorie-calc-field-text"
            style={{ marginBottom: "5px", display: "block", fontWeight: "600" }}
          >
            Chế độ ăn
          </div>

          <div
            style={{
              padding: "20px",
              backgroundColor: "#f5f5f5",
              borderRadius: "5px",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            <Row gutter={16} justify="space-between" align="middle">
              <Col>
                <a
                  value="vegan"
                  onClick={handleTagsChange}
                  style={{
                    textDecoration: "none",
                    color: "#18AEAC",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: getBackgroundColor("vegan"),
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    src={veganLogo}
                    alt="Ăn chay"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                    }}
                  />
                  Ăn chay
                </a>
              </Col>
              <Col>
                <a
                  value="non-vegan"
                  onClick={handleTagsChange}
                  style={{
                    textDecoration: "none",
                    color: "#18AEAC",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: getBackgroundColor("non-vegan"),
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    src={nonVeganLogo}
                    alt="Không ăn chay"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                    }}
                  />
                  Không ăn chay
                </a>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* 
      <div
        className="calorie-calc-row"
        style={{ marginBottom: "5px", width: "40%" }}
      >
        <div
          className="calorie-calc-field-text"
          style={{ marginBottom: "5px", display: "block", fontWeight: "600" }}
        >
          Số bữa ăn
        </div>
        <Input
          type="number"
          placeholder="Nhập cân nặng của bạn"
          addonAfter="kg"
          size="large"
          onChange={handleWeightChange}
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
          defaultValue="All"
          size="large"
          style={{ minWidth: "100%" }}
          value={cuisine}
          onChange={(value) => setCuisine(value)}
        >
          <Option value="All">Tất cả</Option>
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
          onClick={calculateCaloriesAndNutrition}
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
