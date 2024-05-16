import React from "react";
import { Row, Col, Space, Avatar } from "antd";
import { SmileOutlined, HeartOutlined, StarOutlined } from "@ant-design/icons";

const ServiceProvide = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontWeight: 500 }}>
                    Xây dựng thực đơn cá nhân hóa
                  </h4>
                  <p style={{ width: "70%", marginTop: "10px" }}>
                  EatWell thiết kế thực đơn riêng biệt cho bạn, phù hợp với sở thích, 
                  nhu cầu dinh dưỡng và mục tiêu sức khỏe của bạn.
                  </p>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontWeight: 500 }}>
                    Đánh giá nhu cầu dinh dưỡng
                  </h4>
                  <p style={{ width: "70%", marginTop: "10px" }}>
                  EatWell phân tích thói quen ăn uống và tình trạng 
                  sức khỏe của bạn để xác định chính xác nhu cầu dinh dưỡng của bạn.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontWeight: 500 }}>
                  Gợi ý danh sách mua sắm
                  </h4>
                  <p style={{ width: "70%", marginTop: "10px" }}>
                  EatWell cung cấp danh sách mua sắm chi tiết, 
                  giúp bạn tiết kiệm thời gian và tiền bạc khi đi chợ.
                  </p>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontWeight: 500 }}>
                    Đánh giá quá trình dinh dưỡng
                  </h4>
                  <p style={{ width: "70%", marginTop: "10px" }}>
                  EatWell theo dõi tiến trình dinh dưỡng của bạn 
                  và đưa ra lời khuyên để giúp bạn đạt được mục tiêu sức khỏe.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ServiceProvide;
