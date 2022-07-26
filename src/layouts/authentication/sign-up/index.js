import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { createUserAccount } from "controller/auth/auth";

const createUser = async (user) => {
  const create = await createUserAccount(user);
  return create;
};

function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const handleSetAgremment = () => setAgremment(!agreement);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    terms: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      terms: "",
    });
    try {
      if (!agreement) {
        throw new Error("You must agree to the terms and conditions");
      }
      const create = await createUser(user);
      if (create.status === 200) {
        navigate("/auth/login", { state: { success: true } });
      } else {
        create;
        setErrors({
          email: create.response.data.email || "",
          password: create.response.data.password || "",
          firstName: create.response.data.firstName || "",
          lastName: create.response.data.lastName || "",
          terms: "",
        });
      }
    } catch (e) {
      if (e.message === "You must agree to the terms and conditions") {
        setErrors({ ...errors, terms: e.message });
      } else {
        setErrors({
          email: "Failed to register",
          password: "",
          firstName: "",
          lastName: "",
          terms: "",
        });
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrors({ email: "", password: "", firstName: "", lastName: "" });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [errors]);

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            {errors.terms && (
              <SoftAlert color="error" dismissable={true}>
                {errors.terms}
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
              <SoftInput
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                value={user.firstName}
                error={errors.firstName.length > 0}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                value={user.lastName}
                error={errors.lastName.length > 0}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={user.email}
                error={errors.email.length > 0}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                error={errors.password.length > 0}
              />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth onClick={handleSubmit}>
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/auth/login"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
