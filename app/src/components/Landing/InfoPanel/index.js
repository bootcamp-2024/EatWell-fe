import React from "react";
import "./style.css";
import calendar from "images/calendar.svg";
import save from "images/save.svg";
import wrench from "images/wrench.svg";

function InfoPanel(props) {
  return (
    <>
      <div className="infoPanel" style={{ marginTop: "70px" }}>
        <div className="infoSquare">
          <img
            className="infoSquareIcon"
            src={calendar}
            alt="calendar"
            draggable="false"
            style={{ width: 48, height: 48, marginBottom: "13px" }}
          />
          <h3 className="infoSquareTitle">Không còn nỗi lo</h3>
          <p className="infoSquareText">
          Với EatWell, bạn không còn phải lo lắng về việc hôm nay ăn gì. 
          EatWell sẽ lên kế hoạch cho các bữa ăn của bạn, giúp bạn tiết kiệm thời gian và luôn có sẵn những thực đơn ngon miệng, đầy đủ dinh dưỡng.
          </p>
        </div>
        <div className="infoSquare">
          <img
            className="infoSquareIcon"
            src={wrench}
            alt="calendar"
            draggable="false"
            style={{ width: 42, height: 42, marginBottom: "19px" }}
          />
          <h3 className="infoSquareTitle">Cá nhân hóa thực đơn</h3>
          <p className="infoSquareText">
          Dựa trên sở thích, nhu cầu dinh dưỡng và khẩu vị của bạn, 
          EatWell sẽ thiết kế thực đơn riêng biệt, phù hợp hoàn hảo với bạn. 
          Bất kể bạn là người ăn chay, ăn kiêng, hay có dị ứng với bất kỳ thực phẩm nào, 
          EatWell đều có thể đáp ứng mọi yêu cầu của bạn.
          </p>
        </div>
        <div className="infoSquare">
          <img
            className="infoSquareIcon"
            src={save}
            alt="calendar"
            draggable="false"
            style={{ width: 41, height: 41, marginBottom: "20px" }}
          />
          <h3 className="infoSquareTitle">Lưu món ăn ưu thích</h3>
          <p className="infoSquareText">
          Tìm được món ăn ưng ý cho thực đơn của mình? 
          Đăng nhập EatWell để lưu trữ món ngon ấy cho những bữa ăn sau này, 
          hoặc thêm nó vào kế hoạch cho những ngày sắp tới. 
          </p>
        </div>
      </div>
      <div className="infoPanelSpacer" />
    </>
  );
}

export default InfoPanel;
