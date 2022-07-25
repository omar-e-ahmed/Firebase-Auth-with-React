import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import { Iconify } from "../../../../components/Iconify";

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

type Props = {
  color?: string;
  icon: string | "";
  title?: string;
  total?: number;
  sx?: object | any;
  icons?: boolean;
  nums?: boolean;
};

export default function AppWidgetSummary({
  title,
  total,
  icon,
  icons = true,
  nums = false,
  color = "primary",
  sx,
  ...other
}: Props) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        color: (theme: any) => theme.palette[color].darker,
        bgcolor: (theme: any) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      {icons && (
        <IconWrapperStyle
          sx={{
            color: (theme: any) => theme.palette[color].dark,
            backgroundImage: (theme: any) =>
              `linear-gradient(135deg, ${alpha(
                theme.palette[color].dark,
                0
              )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
          }}
        >
          <Iconify icon={icon} sx={{ width: 24, height: 24 }} />
        </IconWrapperStyle>
      )}
      {nums && <Typography variant="h3">{total}</Typography>}

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
