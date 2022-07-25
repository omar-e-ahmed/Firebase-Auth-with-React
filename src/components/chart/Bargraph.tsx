import { Box, Card, CardHeader } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import BaseOptionChart from "./BaseOptionChart";

type Props = {
  title: string;
  subheader: string;
  chartData: { label: string; value: number }[];
};
export default function AppConversionRates({
  title,
  subheader,
  chartData,
  ...other
}: Props) {
  const chartLabels = chartData.map((i: any) => i.label);
  const chartSeries = chartData.map((i: any) => i.value);
  const chartOptions = {
    ...BaseOptionChart,
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName: any) => seriesName,
        title: {
          formatter: () => "",
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: "28%", borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        {typeof window !== "undefined" && (
          <ReactApexChart
            type="bar"
            series={[{ data: chartSeries }]}
            options={chartOptions}
            height={364}
          />
        )}
      </Box>
    </Card>
  );
}
