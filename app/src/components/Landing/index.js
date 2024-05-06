import Banner from "../Banner";
import { useLocation } from "react-router-dom";
import InfoPanel from "./InfoPanel";
import BusinessPlan from "./BussinessPlan";

const Landing = (props) => {
  const location = useLocation();

  return (
    <section className="hero">
      <div className="container">
        <Banner />
        <h3
          style={{
            textAlign: "center",
            marginTop: "40px",
            color: "#18AEAC",
            fontWeight: 700,
          }}
        >
          GIỚI THIỆU{" "}
        </h3>
        <InfoPanel />
        <BusinessPlan />
      </div>
    </section>
  );
};

export default Landing;
