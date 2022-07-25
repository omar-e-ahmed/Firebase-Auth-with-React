import { Stack, Button, Divider, Typography } from "@mui/material";
import { Iconify } from "../../../components/Iconify";
// import { useAuth } from "../../../context/AuthContext";

export default function AuthSocial() {
  // const { login } = useAuth();
  return (
    <>
      <Stack direction="row" spacing={2} className="px-10">
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify
            icon="eva:google-fill"
            color="#DF3E30"
            width={22}
            height={22}
          />
        </Button>

        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify
            icon="eva:facebook-fill"
            color="#1877F2"
            width={22}
            height={22}
          />
        </Button> */}

        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify
            icon="eva:twitter-fill"
            color="#1C9CEA"
            width={22}
            height={22}
          />
        </Button> */}
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
