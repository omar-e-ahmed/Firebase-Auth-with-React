import { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import Iconify from "../../../../components/Iconify/Iconify";
import { createUserAccount } from "../../../../controller/auth/auth";
import { useNavigate } from "react-router-dom";

const createUser = async (user: any) => {
  const create = await createUserAccount(user);
  return create;
};

export default function RegisterForm() {
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
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });
    // setLoading(true);
    try {
      const create: any = await createUser(user);

      if (create.status === 200) {
        // setLoading(false);
        navigate("/login", { state: { success: true } });
      } else {
        console.log(create);
        setErrors({
          email: create.response.data.email || "",
          password: create.response.data.password || "",
          firstName: create.response.data.firstName || "",
          lastName: create.response.data.lastName || "",
        });
      }
    } catch (e: any) {
      setErrors({
        email: "Failed to register",
        password: "",
        firstName: "",
        lastName: "",
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(show => !show);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrors({ email: "", password: "", firstName: "", lastName: "" });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [errors]);
  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          fullWidth
          name="firstName"
          label="First name"
          onChange={handleChange}
          error={Boolean(errors.firstName.length > 0 && errors.firstName)}
          helperText={errors.firstName.length > 0 && errors.firstName}
        />

        <TextField
          fullWidth
          name="lastName"
          label="Last name"
          onChange={handleChange}
          error={Boolean(errors.lastName.length > 0 && errors.lastName)}
          helperText={errors.lastName.length > 0 && errors.lastName}
        />
      </Stack>

      <TextField
        fullWidth
        name="email"
        autoComplete="username"
        type="email"
        label="Email address"
        onChange={handleChange}
        error={Boolean(errors.email.length > 0 && errors.email)}
        helperText={errors.email.length > 0 && errors.email}
      />

      <TextField
        fullWidth
        autoComplete="current-password"
        type={showPassword ? "text" : "password"}
        label="Password"
        name="password"
        onChange={handleChange}
        error={Boolean(errors.password.length > 0 && errors.password)}
        helperText={errors.password.length > 0 && errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowPassword(prev => !prev)}
              >
                <Iconify
                  icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button fullWidth size="large" onClick={handleSubmit} variant="contained">
        Register
      </Button>
    </Stack>
  );
}
