import React, { useEffect, useState } from "react";
import { Upload, Button, message, Avatar, Card, Carousel, Spin } from "antd";
import { LeftOutlined, RightOutlined, UploadOutlined } from "@ant-design/icons";
import detectService from "api/detect";
import Meta from "antd/es/card/Meta";
import "./style.css";

const Recognition = (props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeId, setRecipeId] = useState();
  const [image, setImage] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const handlePrevious = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 2, 0));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => Math.min(prevSlide + 2, recipes.length - 2));
  };

  useEffect(() => {
    if (recipes.length > 0) {
      setIsLoading(false);
    }
  }, [recipes]);

  const handleGenerate = async () => {
    setIsLoading(true);

    try {
      const response = await detectService.getGenMealDetectFastApi(recipeId);

      const recipeData = response.data.recipes;
      console.log(recipeData);
      setRecipes(recipeData);

      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
      message.error("Failed to upload image");
    }
  };

  const handleUpload = async (file) => {
    setIsUploading(true);

    try {
      const response = await detectService.uploadDetectImage(file);

      const imageUrl = response.data.url;
      const recipeId = response.data._id;
      setRecipeId(recipeId);
      console.log(imageUrl);
      console.log(recipeId);
      setImage(imageUrl);

      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
      message.error("Failed to upload image");
    }
  };

  const uploadProps = {
    maxCount: 1,
    accept: "image/png, image/jpeg",
    showUploadList: false,
    beforeUpload: handleUpload,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
      }}
    >
      <div>
        <div
          className="col-12 d-flex justify-content-center"
          style={{ marginBottom: "20px" }}
        >
          <Upload {...uploadProps}>
            <Button
              disabled={isUploading}
              loading={isUploading}
              shape="round"
              size="large"
              icon={<UploadOutlined />}
            >
              Chọn ảnh
            </Button>
          </Upload>
        </div>
        <div style={{ marginRight: "20px" }}>
          <div
            style={{
              width: "500px",
              height: "500px",
              border: "2px solid #18AEAC",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            {image && (
              <img
                src={image}
                alt="Uploaded"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            )}
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <Button
            className="primary-btn bg-key signup-btn"
            type="primary"
            size="large"
            htmlType="submit"
            style={{ width: "50%", marginTop: "10px" }}
            onClick={handleGenerate}
          >
            GENERATE RECIPES
          </Button>
        </div>
      </div>

      {!isLoading && recipes?.length > 0 && (
        <div className="carousel-container" style={{ marginLeft: "8%" }}>
          {/* Render các recipe */}
          {recipes
            .slice(currentSlide, currentSlide + 2)
            .map((recipe, index) => (
              <div
                key={index}
                className="recipe-card"
                style={{ width: "500px", height: "300px" }}
              >
                <h3
                  style={{
                    marginBottom: "5px",
                    fontWeight: "600",
                    color: "#18AEAC",
                  }}
                >
                  {recipe.name}
                </h3>
                <h4 style={{ color: "#18AEAC" }}>Ingredients:</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
                <h4 style={{ color: "#18AEAC" }}>Instructions:</h4>
                <ol>
                  {recipe.instructions.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                  ))}
                </ol>
              </div>
            ))}

          {/* Render nút điều hướng */}
          <div
            className="navigation-buttons"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              className="nav-button"
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              icon={<LeftOutlined style={{ color: "#FFFFFF" }} />}
              style={{
                backgroundColor: "#18AEAC",
                marginRight: "10px",
                display: currentSlide === 0 ? "none" : "inline-block",
                textAlign: "center",
              }}
            />
            <Button
              className="nav-button"
              onClick={handleNext}
              disabled={currentSlide === recipes.length - 2}
              icon={<RightOutlined style={{ color: "#FFFFFF" }} />}
              style={{
                backgroundColor: "#18AEAC",
                marginLeft: "10px",
                display:
                  currentSlide === recipes.length - 2 ? "none" : "inline-block",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Recognition;
