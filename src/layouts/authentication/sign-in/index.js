import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

// Soft UI Dashboard React components
import SoftAlert from "components/SoftAlert";
// @mui material components
import Icon from "@mui/material/Icon";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const location = useLocation();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const loginRequest = await auth.login(email, password);
      if (loginRequest.user.accessToken) {
        navigate("/dashboard");
      } else if (loginRequest.code === "auth/invalid-email") {
        throw new Error("Invalid email");
      }
    } catch {
      setErrors({ email: "Failed to log in please check email and password", password: "" });
    }
    setLoading(false);
  }

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrors({ email: "", password: "" });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [errors]);

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        {location.state && location.state.success && (
          <SoftAlert color="success">
            <Icon fontSize="small">thumb_up</Icon>&nbsp; Account successfully registered. Sign in
            below.
          </SoftAlert>
        )}
        {errors.email && (
          <SoftAlert color="error" dismissable={true}>
            {errors.email}
          </SoftAlert>
        )}
        {errors.password && (
          <SoftAlert color="error" dismissable={true}>
            {errors.password}
          </SoftAlert>
        )}
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            error={errors.email.length > 0}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            error={errors.password.length > 0}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/auth/register"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
