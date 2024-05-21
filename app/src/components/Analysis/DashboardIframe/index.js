import React from "react";
import "./style.css";

const DashboardIframe = () => {
  return (
    <div className="iframe-container">
      <iframe
        className="responsive-iframe"
        src="https://charts.mongodb.com/charts-eatwell-jcsbxho/embed/dashboards?id=66489e8e-248a-4848-830b-32979ec4f26b&theme=light&autoRefresh=true&maxDataAge=300&showTitleAndDesc=false&scalingWidth=scale&scalingHeight=fixed"
      ></iframe>
    </div>
  );
};

export default DashboardIframe;
