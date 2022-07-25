import { styled } from "@mui/material/styles";
import { Card, Container, Typography } from "@mui/material";
import { LoginForm } from "./components/login";
import AuthSocial from "./components/AuthSocial";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Alert } from "../../components/alert";
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

export default function Login() {
  const location: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: any;
  } = useLocation();

  return (
    <RootStyle>
      <HeaderStyle></HeaderStyle>
      <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Hi, Welcome Back
        </Typography>
      </SectionStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          {location.state && location.state.success && (
            <div className="flex justify-center align-center py-4 relative">
              <Alert
                severity="success"
                text="Account successfully registered"
                timeout={5000}
              />
            </div>
          )}

          <Typography variant="h4" gutterBottom>
            Sign in
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Enter your details below.
          </Typography>

          <AuthSocial />

          <LoginForm />

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Get started
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
