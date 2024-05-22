import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  InputNumber,
  Select,
  Checkbox,
  Button,
  Radio,
  Popover,
  Modal,
  Divider,
  Slider,
  Row,
  Col,
  Card,
} from "antd";
import CurrencyInput from "react-currency-input-field";
import "./style.css";
import swal from "sweetalert2";
import { AccountContext } from "stores/AccountContext";
import { useNavigate } from "react-router-dom";
import mealService from "api/meal";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  LeftOutlined,
  MenuOutlined,
  ReloadOutlined,
  RightOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import formatter from "utils/formatter";
import moment from "moment";

ChartJS.register(ArcElement, Tooltip, Legend);

const { Option } = Select;

const MealForm = () => {
  const { account, preferences, fetchAccount, fetchPreferences } =
    useContext(AccountContext);
  const [maxPrice, setMaxPrice] = useState(0);
  const [mealplan, setMealplan] = useState([0, 0, 0, 0, 0]);
  const [lowSalt, setLowSalt] = useState(false);
  const [lowCholesterol, setLowCholesterol] = useState(false);
  const [mealPlanToday, setMealPlanToday] = useState({});
  const [days, setDays] = useState(1);

  // meal plan state
  const [showDetails, setShowDetails] = useState(false);
  const [showDetailsMeal, setShowDetailsMeal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [sliderValue, setSliderValue] = useState(1);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccount();
    fetchPreferences();
    fetchMealPlanToday();
  }, []); //eslint-disable-line

  const fetchMealPlanToday = async () => {
    try {
      const response = await mealService.getMealPlanToday();
      const { exitcode, data } = response.data;
      console.log(data);

      if (exitcode === 0) {
        setMealPlanToday(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const today = new Date();

  const showModal = (meal) => {
    setSelectedMeal(meal);
    console.log(selectedMeal);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const navigator = useNavigate();

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
    return [0, 1, 2, 3].map((val) => (
      <Checkbox
        key={`${mealIndex}-${val}`}
        checked={mealplan[mealIndex] === val}
        onChange={() => handleChange(mealIndex, val)}
        style={{
          marginLeft: "10%",
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
  };

  const handleCholesterolChange = (e) => {
    setLowCholesterol(e.target.value);
  };
  const handleDaysChange = (value) => {
    setDays(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
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
      setMealPlanToday(meal_plan);
      if (meal_plan) {
        swal.fire({
          title: "Success",
          text: "Gợi ý thực đơn thành công, mời bạn nhấn OK để xem thực đơn!",
          icon: "success",
          confirmButtonText: "OK",
        });
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
  };
  const calculatePercentages = () => {
    if (!mealPlanToday || mealPlanToday.length === 0 || !mealPlanToday[0])
      return {
        fiber: 0,
        carbohydrat: 0,
        protein: 0,
        fat: 0,
      };

    const total_fiber = mealPlanToday[0].total_nutritions?.total_fiber || 0;
    const total_carbohydrat =
      mealPlanToday[0].total_nutritions?.total_carbohydrat || 0;
    const total_protein = mealPlanToday[0].total_nutritions?.total_protein || 0;
    const total_fat = mealPlanToday[0].total_nutritions?.total_fat || 0;

    const total = total_fiber + total_carbohydrat + total_protein + total_fat;

    if (total === 0) {
      return {
        fiber: 0,
        carbohydrat: 0,
        protein: 0,
        fat: 0,
      };
    }

    return {
      fiber: (total_fiber / total) * 100,
      carbohydrat: (total_carbohydrat / total) * 100,
      protein: (total_protein / total) * 100,
      fat: (total_fat / total) * 100,
    };
  };

  const percentages = calculatePercentages();

  const data = {
    labels: ["Fat", "Protein", "Carbohydrate", "Fiber"],
    datasets: [
      {
        label: "Nutrition Breakdown",
        data: percentages
          ? [
              percentages.fiber,
              percentages.carbohydrat,
              percentages.protein,
              percentages.fat,
            ]
          : [],
        backgroundColor: ["#0DEFBF", "#EFA70D", "#AB0DEF", "#EF280D"],
        borderColor: ["#ffff", "#ffff", "#ffff", "#ffff"],
        borderWidth: 1,
      },
    ],
  };

  const capitalizeWords = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderDetails = () => {
    if (
      !mealPlanToday ||
      !mealPlanToday[0] ||
      !mealPlanToday[0].total_nutritions
    )
      return null;

    const total_nutritions = mealPlanToday[0].total_nutritions || {};

    const details = {
      total_fiber: `${(
        mealPlanToday[0].total_nutritions?.total_fiber || 0
      ).toFixed(2)} g`,
      total_sugar: `${(
        mealPlanToday[0].total_nutritions?.total_sugar || 0
      ).toFixed(2)} g`,
      total_calo: `${(
        mealPlanToday[0].total_nutritions?.total_calo || 0
      ).toFixed(2)} g`,
      total_carbohydrat: `${(
        mealPlanToday[0].total_nutritions?.total_carbohydrat || 0
      ).toFixed(2)} g`,
      total_protein: `${(
        mealPlanToday[0].total_nutritions?.total_protein || 0
      ).toFixed(2)} g`,
      total_fat: `${(mealPlanToday[0].total_nutritions?.total_fat || 0).toFixed(
        2
      )} g`,
      total_sodium: `${(
        mealPlanToday[0].total_nutritions?.total_sodium || 0
      ).toFixed(2)} g`,
      total_cholesterol: `${(
        mealPlanToday[0].total_nutritions?.total_cholesterol || 0
      ).toFixed(2)} g`,
      total_cost: `${(
        mealPlanToday[0].total_nutritions?.total_cost || 0
      ).toFixed(0)} VNĐ`,
    };

    return (
      <div style={{ marginTop: "10px", width: "100%" }}>
        {Object.entries(details).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <span style={{ fontWeight: "600" }}>{capitalizeWords(key)}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    );
  };

  const popoverContent = (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "80%" }}>
        <Pie data={data} />
      </div>
      <Button
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setShowDetails(!showDetails)}
        style={{ marginTop: "10px", backgroundColor: "#18AEAC" }}
      >
        More Details Information
      </Button>
      {showDetails && renderDetails()}
    </div>
  );
  const capitalizeWords2 = (str) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const mealOrder = ["Breakfast", "Lunch", "Snack", "Dinner", "Elevenses"];

  const handleMealClick = (meal) => {
    console.log(meal);
    showModal(meal);
  };

  const renderMealPlan = () => {
    if (!mealPlanToday || !mealPlanToday[0] || !mealPlanToday[0].meal_plan)
      return null;

    const mealGroups = mealPlanToday[0]?.meal_plan?.reduce((groups, meal) => {
      if (!groups[meal.meal_time]) {
        groups[meal.meal_time] = [];
      }
      groups[meal.meal_time].push(meal);
      return groups;
    }, {});

    // Lặp qua các nhóm và render các div nhóm theo thứ tự của mealOrder
    return mealOrder.map(
      (mealTime, index) =>
        mealGroups[mealTime] && (
          <div
            key={index}
            style={{
              border: "1px solid transparent",
              transition: "border-color 0.3s ease",
              margin: "10px",
              padding: "10px",
              borderRadius: "20px",
              boxShadow: "0 0 5px #18AEAC",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "transparent";
            }}
          >
            <h5> {mealTime}</h5>

            {mealGroups[mealTime].map((meal) => (
              <div
                key={meal._id}
                style={{
                  border: "2px solid transparent",
                  transition: "border-color 0.3s ease",
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "transparent";
                }}
              >
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h6
                      style={{ color: "#18AEAC" }}
                      onClick={() => handleMealClick(meal)}
                    >
                      {" "}
                      {meal.name}
                    </h6>
                    <SyncOutlined
                      style={{
                        fontSize: "15px",
                        cursor: "pointer",
                        color: "#65656E",
                      }}
                      onClick={() => handleReGenClick(meal._id)}
                    />
                  </div>

                  <label
                    style={{
                      display: "block",
                      fontSize: "20",
                      color: "#65656E",
                      marginTop: "10px",
                    }}
                  >
                    {capitalizeWords2(meal.category)}
                  </label>
                  <label
                    style={{
                      display: "block",
                      fontSize: "20",
                      color: "#65656E",
                    }}
                  >
                    Bao gồm: {meal.total_calo} Calories
                  </label>
                </div>
              </div>
            ))}
          </div>
        )
    );
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const capitalizeWords3 = (str) => {
    return str
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const renderDetailsNutrition = (meal) => {
    if (!meal) return null;

    const details = {
      total_fiber: `${(meal?.total_fiber || 0).toFixed(2)} g`,
      total_sugar: `${(meal?.total_sugar || 0).toFixed(2)} g`,
      total_calo: `${(meal?.total_calo || 0).toFixed(2)} g`,
      total_carbohydrat: `${(meal?.total_carbohydrat || 0).toFixed(2)} g`,
      total_protein: `${(meal?.total_protein || 0).toFixed(2)} g`,
      total_fat: `${(meal?.total_fat || 0).toFixed(2)} g`,
      total_sodium: `${(meal?.total_sodium || 0).toFixed(2)} g`,
      total_cholesterol: `${(meal?.total_cholesterol || 0).toFixed(2)} g`,
      total_cost: `${(meal?.total_cost || 0).toFixed(0)} VNĐ`,
    };

    return (
      <div style={{ marginTop: "10px", width: "100%" }}>
        {Object.entries(details).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <span style={{ fontWeight: "600" }}>{capitalizeWords3(key)}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    );
  };

  const MealModal = (meal) => {
    const selectedMeal = meal.meal;
    console.log(selectedMeal);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const handleIngredientChange = (value) => {
      const ingredient = selectedMeal.ingredients.find(
        (ing) => ing.name === value
      );
      setSelectedIngredient(ingredient);
    };

    const total =
      (selectedMeal.total_carbohydrate || 0) +
      (selectedMeal.total_fat || 0) +
      (selectedMeal.total_protein || 0) +
      (selectedMeal.total_sugar || 0);
    console.log(total);
    const pieData = {
      labels: ["Carbohydrates", "Fat", "Protein", "Sugar"],
      datasets: [
        {
          label: "Phần trăm calories",
          data: [
            (selectedMeal.total_carbohydrate / total) * 100,
            (selectedMeal.total_fat / total) * 100,
            (selectedMeal.total_protein / total) * 100,
            (selectedMeal.total_sugar / total) * 100,
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        },
      ],
    };

    return (
      <Modal
        title={meal?.meal?.name}
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ minWidth: "50%" }}
      >
        {meal && (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={meal?.meal?.image}
                alt={meal?.meal?.name}
                style={{
                  width: "100px",
                  height: "100px",
                  marginRight: "20px",
                  marginTop: "20px",
                }}
              />
              <div style={{ marginTop: "20px" }}>
                <p>
                  <ClockCircleOutlined style={{ marginRight: "5px" }} /> Cook
                  Time: {meal?.meal?.cook_time || "25 phút"}
                </p>

                <p>
                  <CalendarOutlined style={{ marginRight: "5px" }} /> Prep Time:{" "}
                  {meal?.meal?.prep_time || "25 phút"}
                </p>
              </div>
            </div>
            <Divider />

            <div style={{ display: "flex" }}>
              <div style={{ flex: "1", marginRight: "20px" }}>
                <h4>Ingredients</h4>
                {meal?.meal?.ingredients
                  .filter((ingredient) => ingredient.name)
                  .map((ingredient, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ fontWeight: "500" }}>
                        {capitalizeFirstLetter(ingredient.name)}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        {ingredient.quantity} {ingredient.unit}
                        <span style={{ fontSize: "0.8em", color: "gray" }}>
                          ({ingredient.grams} grams)
                        </span>
                      </span>
                    </div>
                  ))}
              </div>

              <div style={{ width: "50%", marginTop: "20px" }}>
                <h6 style={{ textAlign: "center", marginBottom: "20px" }}>
                  TỈ LỆ PHẦN TRĂM CALORIES TỪ RECIPE
                </h6>
                <Pie data={pieData} />

                {renderDetailsNutrition(selectedMeal)}
              </div>
            </div>

            <Divider />
            <div style={{ marginTop: "20px" }}>
              <h4>Hướng dẫn nấu ăn</h4>
              {selectedMeal?.intructions?.map((instruction, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <b>Step {index + 1}:</b> {instruction}
                </div>
              ))}
            </div>

            <div style={{ marginTop: "15px" }}>
              <h4>So sánh giá</h4>
              <Select
                placeholder="Chọn thành phần cần so sánh giá"
                style={{ width: "50%", borderColor: "#18AEAC" }}
                onChange={handleIngredientChange}
              >
                {meal.meal.ingredients
                  .filter(
                    (ingredient) =>
                      ingredient.name && ingredient.name.length > 2
                  )
                  .map((ingredient, index) => (
                    <Option key={index} value={ingredient.name}>
                      {capitalizeFirstLetter(ingredient.name)}
                    </Option>
                  ))}
              </Select>

              {selectedIngredient && (
                <Row gutter={16} style={{ marginTop: "15px" }}>
                  {selectedIngredient.unit_price.map((priceDetail, index) => (
                    <Col span={8} key={index}>
                      <Card
                        hoverable
                        cover={
                          <img alt={priceDetail.name} src={priceDetail.image} />
                        }
                        style={{ height: "100%" }}
                      >
                        <Card.Meta
                          title={
                            <a
                              style={{
                                marginTop: "10px",
                                fontWeight: "bold",
                                color: "#18AEAC",
                              }}
                              href={priceDetail.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {priceDetail.name}
                            </a>
                          }
                          description={
                            <div>
                              <span style={{ fontWeight: "bold" }}>
                                Price:{" "}
                                {formatter.formatPrice(priceDetail.price)}
                              </span>
                            </div>
                          }
                        />
                        <p
                          style={{
                            marginTop: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          Domain: {priceDetail.domain_url}
                        </p>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </div>
        )}
      </Modal>
    );
  };

  const handleReGenClick = async (mealId) => {
    const queryString = new URLSearchParams({
      userId: account._id ? account._id : "663e23d97c96a8f9ccd57d3a",
      day: moment().format("DD-MM-YY"),
      recipeId: mealId.$oid,
    }).toString();
    console.log(queryString);

    setIsLoading(true);
    try {
      await mealService.getReGenMealFastApi(queryString);
      const regendata = await fetchMealPlanToday();
      const { data } = regendata.data;
      console.log(data);
      setMealPlanToday(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  const handleNext = () => {
    if (currentIndex < mealPlanToday.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderDateTitle = (index) => {
    const date = new Date(today);
    date.setDate(date.getDate() + index);
    const days = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    return `${dayName} ${day}/${month}`;
  };
  return (
    <div className="d-flex container flex-column justify-content-center my-3">
      <div className="col-md-5">
        <form onSubmit={onSubmit} className="form-container">
          <h2
            className="mb-3 color-key "
            style={{ fontWeight: "500", marginLeft: "20%" }}
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
              style={{ borderColor: "GrayText" }}
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
              Lượng muối:
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
              Lượng Cholesterol:
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
        <hr className="divider" style={{ width: "100%" }} />
      </div>
      <h4 style={{ fontWeight: "600" }}>Thực đơn dành cho bạn</h4>
      {mealPlanToday && (
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)")
            }
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  marginRight: "10px",
                  fontWeight: "600",
                  color: "#18AEAC",
                }}
              >
                Calories cần nạp vào là:{" "}
                {(mealPlanToday[0]?.total_nutritions?.total_calo ?? 0).toFixed(
                  2
                )}
              </span>
              <Popover
                title="Chi tiết thông tin"
                placement="right"
                content={popoverContent}
                trigger="click"
              >
                <Button
                  className="info-button"
                  type="link"
                  style={{ padding: 0 }}
                >
                  i
                </Button>
              </Popover>
            </div>
          </div>
          <div style={{ marginTop: "30px", width: "600px" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {currentIndex > 0 && (
                  <Button
                    style={{
                      backgroundColor: "#18AEAC",
                      color: "white",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handlePrev}
                  >
                    <LeftOutlined />
                  </Button>
                )}
                <h4>{renderDateTitle(currentIndex)}</h4>
                {currentIndex < mealPlanToday.length - 1 && (
                  <Button
                    onClick={handleNext}
                    style={{
                      backgroundColor: "#18AEAC",
                      color: "white",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <RightOutlined />
                  </Button>
                )}
              </div>
              {isLoading ? <div>Loading...</div> : renderMealPlan()}
              {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
          </div>
        </div>
      )}
      {selectedMeal && <MealModal meal={selectedMeal} />}
    </div>
  );
};

export default MealForm;
