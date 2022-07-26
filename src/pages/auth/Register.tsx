import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Card, Container, Typography, Grid } from "@mui/material";
import { RegisterForm } from "./components/register";
import AuthSocial from "./components/AuthSocial";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export default function Register() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <RootStyle>
      <HeaderStyle></HeaderStyle>
      <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Registration
        </Typography>
      </SectionStyle>

      <Container>
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            Get started
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Enter your details below.
          </Typography>

          <AuthSocial />

          <RegisterForm />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 3 }}
          >
            By registering, I agree to Minimal&nbsp;
            <Link to="#" className="text-blue-600">
              Terms of Service{" "}
            </Link>{" "}
            and{" "}
            <Link to="#" className=" text-blue-600">
              {" "}
              Privacy Policy
            </Link>
            .
          </Typography>

          <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
            Already have an account?{" "}
            <Link className=" text-blue-600" to="/login">
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
