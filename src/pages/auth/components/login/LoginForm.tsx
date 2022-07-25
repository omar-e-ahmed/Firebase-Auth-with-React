import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import {
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "../../../../components/Iconify/Iconify";
import { useAuth } from "../../../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const loginRequest = await login(email, password);

      if (loginRequest.user.accessToken) {
        navigate("/");
      } else if (loginRequest.code === "auth/invalid-email") {
        throw new Error("Invalid login");
      }
    } catch {
      setErrors({ email: "Failed to log in", password: "" });
    }
    setLoading(false);
  }

  const handleShowPassword = () => {
    setShowPassword(show => !show);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrors({ email: "", password: "" });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [errors]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            onChange={e => setEmail(e.target.value)}
            error={errors.email.length > 0}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errors.password.length > 0}
            helperText={errors.password.length > 0 && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onClick={() => setRemember(!remember)}
              />
            }
            label="Remember me"
          />

          <Link href="/">Forgot password?</Link>
        </Stack>

        <Button fullWidth size="large" type="submit" variant="contained">
          {loading ? "..." : "Login"}
        </Button>
      </form>
    </>
  );
}
