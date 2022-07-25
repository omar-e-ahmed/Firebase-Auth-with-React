import PropTypes from "prop-types";
// @mui
import { Card, CardHeader, Box } from "@mui/material";
import { BaseOptionChart } from "../../../../components/chart";
import ReactApexChart from "react-apexcharts";

type props = {
  title: string;
  subheader: string;
  chartData: Array<any>;
  chartLabels: Array<string>;
  sx?: object | any;
};

export default function AppWebsiteVisits({
  title,
  subheader,
  chartLabels,
  chartData,

  ...other
}: props) {
  const chartOptions: any = {
    ...BaseOptionChart,
    plotOptions: { bar: { columnWidth: "16%" } },
    fill: { type: chartData.map(i => i.fill) },
    labels: chartLabels,
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: any) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {typeof window !== "undefined" && (
          <ReactApexChart
            type="line"
            series={chartData}
            options={chartOptions}
            height={364}
          />
        )}
      </Box>
    </Card>
  );
}
