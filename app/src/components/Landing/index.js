import Banner from "../Banner";
import { useLocation } from "react-router-dom";
import InfoPanel from "./InfoPanel";
import BusinessPlan from "./BussinessPlan";
import "./style.css";
import ServiceProvide from "./ServiceProvide";

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
          GIỚI THIỆU
        </h3>
        <InfoPanel />
        <BusinessPlan />
        <h3
          style={{
            textAlign: "center",
            marginTop: "40px",
            color: "#18AEAC",
            fontWeight: 700,
          }}
        >
          DỊCH VỤ MÀ CHÚNG TÔI CUNG CẤP
        </h3>
        <div style={{ marginLeft: "15%" }}>
          <ServiceProvide style={{}} />
        </div>
      </div>
    </section>
  );
};

export default Landing;
