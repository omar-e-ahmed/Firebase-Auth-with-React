import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography, Button } from "@mui/material";
import { Iconify } from "../../components/Iconify";
import AppCurrentSubject from "../../components/chart/AppCurrentSubject";
// import { getAllPortfoliosByUser } from "../../controller/portfolio/portfolio";
import { useAuth } from "../../context/AuthContext";
import {
  AppTasks,
  AppTrafficBySite,
  AppWidgetSummary,
} from "./components/dashboard";
import { fetchUserAccount } from "../../controller/auth/auth";

type Props = {};

// const handleClick = async () => {
//   const get = await getAllPortfoliosByUser();
// };

const Dashboard = (props: Props) => {
  const auth = useAuth();
  const [userData, setUserData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const data: any = await fetchUserAccount();
      setUserData(data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const theme = useTheme();

  useEffect(() => {
    fetchUserInfo();
    setLoading(false);
  }, []);

  return (
    <Container maxWidth="xl">
      <div className="w-screen flex flex-row relative ">
        <Typography variant="h4" className="pt-10" sx={{ mb: 5 }}>
          {!loading && `Hi ${userData?.firstName || ""}, Welcome back`}
        </Typography>
        <Button
          size="small"
          className="absolute top-0 right-0"
          onClick={() => auth.logout()}
        >
          <Typography variant="h6" className="pt-10" sx={{ mb: 5 }}>
            Logout
          </Typography>
        </Button>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            icons={true}
            nums={false}
            sx={{}}
            title="Portfolios"
            total={1352831}
            color="info"
            icon={"arcticons:stockswidget"}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            sx={{}}
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={"ant-design:windows-filled"}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            sx={{}}
            title="Bug Reports"
            total={234}
            color="error"
            icon={"ant-design:bug-filled"}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentSubject
            subheader={undefined}
            title="Current Subject"
            chartLabels={[
              "English",
              "History",
              "Physics",
              "Geography",
              "Chinese",
              "Math",
            ]}
            chartData={[
              { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
              { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
              { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
            ]}
            chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppTrafficBySite
            subheader=""
            title="Traffic by Site"
            list={[
              {
                name: "FaceBook",
                value: 323234,
                icon: (
                  <Iconify
                    sx={undefined}
                    icon={"eva:facebook-fill"}
                    color="#1877F2"
                    width={32}
                    height={32}
                  />
                ),
              },
              {
                name: "Google",
                value: 341212,
                icon: (
                  <Iconify
                    sx={undefined}
                    icon={"eva:google-fill"}
                    color="#DF3E30"
                    width={32}
                    height={32}
                  />
                ),
              },
              {
                name: "Linkedin",
                value: 411213,
                icon: (
                  <Iconify
                    sx={undefined}
                    icon={"eva:linkedin-fill"}
                    color="#006097"
                    width={32}
                    height={32}
                  />
                ),
              },
              {
                name: "Twitter",
                value: 443232,
                icon: (
                  <Iconify
                    sx={undefined}
                    icon={"eva:twitter-fill"}
                    color="#1C9CEA"
                    width={32}
                    height={32}
                  />
                ),
              },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppTasks
            subheader=""
            title="Tasks"
            list={[
              { id: "1", label: "task 1" },
              { id: "2", label: "task 2" },
              { id: "3", label: "task 3" },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
