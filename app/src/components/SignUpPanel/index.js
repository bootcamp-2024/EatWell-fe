import React, { useState } from "react";
import { Input } from "antd";
import { useNavigate, Link } from "react-router-dom";

function SignUpPanel(props) {
  const [email, setEmail] = useState("");

  const history = useNavigate();

  return (
    <div className="signupPanel">
      <div className="signupPanelBody">
        <div className="signupPanelFillerLR" />
        <div className="signupPanelReadyText">
          <div style={{ color: "#40a66e" }}>
            Ready to get your diet on track?
          </div>
          Join EatWell today!
        </div>
        <div className="signupPanelFillerM" />
        <div className="signupPanelInput">
          <button className="primary-btn bg-key login-btn col-6" type="submit">
            <Link to="/signup" className="text-key pointer pl-1">
              Đăng kí
            </Link>
          </button>

          <div className="signupPanelInputFiller" />
        </div>
        <div className="signupPanelFillerLR" />
      </div>
    </div>
  );
}

export default SignUpPanel;
