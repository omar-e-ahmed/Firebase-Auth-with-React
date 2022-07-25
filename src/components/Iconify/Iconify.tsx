import { Icon } from "@iconify/react";
// @mui
import { Box } from "@mui/material";
import react from "react";

type Props = {
  icon: string;
  sx?: object;
  color?: string;
  width?: number;
  height?: number;
};

export default function Iconify({ icon, sx, ...other }: Props) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
