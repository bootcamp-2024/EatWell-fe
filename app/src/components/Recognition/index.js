import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, ListGroup, Pagination } from "react-bootstrap";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const fakeRecipes = [
    {
      name: "Ro tel with cheese",
      ingredients: [
        "1 bottle 450g ore ida cheese, cut into 24 pieces",
        "1/2 bottle 125ml port clam sauce",
      ],
      instructions: [
        "Combine cheese and port in a saucepan.",
        "Cook over medium low heat until melted, about 1 minute.",
        "Season with salt and pepper.",
        "To serve, pour a good half pint of ro tel into a glass.",
        "Top with the cheese sauce.",
      ],
    },
    {
        name: "Ro tel with cheese",
        ingredients: [
          "1 bottle 450g ore ida cheese, cut into 24 pieces",
          "1/2 bottle 125ml port clam sauce",
        ],
        instructions: [
          "Combine cheese and port in a saucepan.",
          "Cook over medium low heat until melted, about 1 minute.",
          "Season with salt and pepper.",
          "To serve, pour a good half pint of ro tel into a glass.",
          "Top with the cheese sauce.",
        ],
      },
      {
        name: "Ro tel with cheese",
        ingredients: [
          "1 bottle 450g ore ida cheese, cut into 24 pieces",
          "1/2 bottle 125ml port clam sauce",
        ],
        instructions: [
          "Combine cheese and port in a saucepan.",
          "Cook over medium low heat until melted, about 1 minute.",
          "Season with salt and pepper.",
          "To serve, pour a good half pint of ro tel into a glass.",
          "Top with the cheese sauce.",
        ],
      },
      {
        name: "Ro tel with cheese",
        ingredients: [
          "1 bottle 450g ore ida cheese, cut into 24 pieces",
          "1/2 bottle 125ml port clam sauce",
        ],
        instructions: [
          "Combine cheese and port in a saucepan.",
          "Cook over medium low heat until melted, about 1 minute.",
          "Season with salt and pepper.",
          "To serve, pour a good half pint of ro tel into a glass.",
          "Top with the cheese sauce.",
        ],
      },
      {
        name: "Ro tel with cheese",
        ingredients: [
          "1 bottle 450g ore ida cheese, cut into 24 pieces",
          "1/2 bottle 125ml port clam sauce",
        ],
        instructions: [
          "Combine cheese and port in a saucepan.",
          "Cook over medium low heat until melted, about 1 minute.",
          "Season with salt and pepper.",
          "To serve, pour a good half pint of ro tel into a glass.",
          "Top with the cheese sauce.",
        ],
      },
    {
      name: "Pasta Primavera",
      ingredients: [
        "200g pasta",
        "1 cup chopped vegetables",
        "2 tbsp olive oil",
        "Salt and pepper to taste",
      ],
      instructions: [
        "Cook pasta according to package instructions.",
        "Sauté vegetables in olive oil until tender.",
        "Mix pasta and vegetables together.",
        "Season with salt and pepper.",
        "Serve warm.",
      ],
    },
    {
      name: "Chicken Stir Fry",
      ingredients: [
        "2 chicken breasts, sliced",
        "1 bell pepper, sliced",
        "1 onion, sliced",
        "3 tbsp soy sauce",
      ],
      instructions: [
        "Heat oil in a pan.",
        "Add chicken and cook until browned.",
        "Add vegetables and stir fry for 5 minutes.",
        "Add soy sauce and cook for another 2 minutes.",
        "Serve hot with rice.",
      ],
    },
    {
      name: "Beef Tacos",
      ingredients: [
        "500g ground beef",
        "1 taco seasoning packet",
        "12 taco shells",
        "1 cup shredded lettuce",
        "1 cup diced tomatoes",
      ],
      instructions: [
        "Cook beef in a skillet over medium heat.",
        "Add taco seasoning and cook according to package instructions.",
        "Fill taco shells with beef, lettuce, and tomatoes.",
        "Serve with your favorite toppings.",
      ],
    },
    {
      name: "Caesar Salad",
      ingredients: [
        "1 head romaine lettuce, chopped",
        "1/2 cup Caesar dressing",
        "1/4 cup grated Parmesan cheese",
        "Croutons",
      ],
      instructions: [
        "In a large bowl, toss lettuce with dressing.",
        "Add Parmesan cheese and croutons.",
        "Toss to combine.",
        "Serve immediately.",
      ],
    },
  ];

const Recognition = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recipesPerPage = 1;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      setRecipes([]);
      setCurrentPage(0);
    }
  };

  const handleGenerateRecipes = () => {
    // Update the URL to the new image and set the recipe description
    setImageUrl("https://res.cloudinary.com/dgtdkbnnq/image/upload/v1716044404/dtka4pqzdjk28rn73fwh.jpg"); // Replace with your desired URL
    setRecipes(fakeRecipes);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(recipes.length / recipesPerPage) - 1));
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col md={6}>
          <h3>Upload Image</h3>
          <div className="p-2 rounded"  style={{ border: "2px dashed #18aeac" }}>
            <div className="d-flex justify-content-between align-items-center">
                <Form.Group controlId="formFileSm" className="">
                    <Form.Control type="file" size="sm" onChange={handleImageUpload} />
                </Form.Group>
                <Button size="sm" style={{ backgroundColor: "#18aeac", borderColor: "#18aeac" }} onClick={handleGenerateRecipes}>
                    Generate Recipes
                </Button>
            </div>
            {imageUrl && (
              <div className="mt-3 text-center">
                <img src={imageUrl} alt="Uploaded" style={{  maxHeight: "500px" }} />
              </div>
            )}
          </div>
        </Col>
        <Col md={6}>
          <h3>Recipes</h3>
          {recipes.length > 0 && (
            <>
              <Card className="rounded" style={{ minHeight: "492px" }}>
                <Card.Body>
                  <Card.Title>{recipes[currentPage].name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Ingredients</Card.Subtitle>
                  <ListGroup variant="flush">
                    {recipes[currentPage].ingredients.map((ingredient, index) => (
                      <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Card.Subtitle className="mt-3 mb-2 text-muted">Instructions</Card.Subtitle>
                  <ListGroup variant="flush">
                    {recipes[currentPage].instructions.map((instruction, index) => (
                      <ListGroup.Item key={index}>{instruction}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
              <div className="mt-3 d-flex justify-content-center">
                <Pagination>
                  <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 0} />
                  {[currentPage - 1, currentPage, currentPage + 1].map((page) => (
                    page >= 0 && page < Math.ceil(recipes.length / recipesPerPage) && (
                      <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page + 1}
                      </Pagination.Item>
                    )
                  ))}
                  <Pagination.Next onClick={handleNextPage} disabled={currentPage === Math.ceil(recipes.length / recipesPerPage) - 1} />
                </Pagination>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Recognition;
