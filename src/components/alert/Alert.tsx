import * as React from "react";
import Alert, { AlertColor } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

type Props = {
  text: string;
  severity: AlertColor | undefined;
  timeout?: number;
};

export default function BasicAlerts({ text, severity, timeout }: Props) {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    if (timeout) {
      setTimeout(() => {
        setOpen(false);
      }, timeout);
    }
  }, [text]);

  return open ? (
    <div>
      <Alert severity={severity}>{text}</Alert>
    </div>
  ) : (
    <></>
  );
}
