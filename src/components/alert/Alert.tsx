import * as React from "react";
import Alert, { AlertColor } from "@mui/material/Alert";

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
  }, [timeout]);

  return open ? (
    <div>
      <Alert severity={severity}>{text}</Alert>
    </div>
  ) : (
    <></>
  );
}
