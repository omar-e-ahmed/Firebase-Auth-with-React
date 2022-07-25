import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import {
  Card,
  Stack,
  Divider,
  Checkbox,
  MenuItem,
  IconButton,
  CardHeader,
  FormControlLabel,
} from "@mui/material";

import { Iconify } from "../../../../components/Iconify";
// import MenuPopover from "../../../components/material/MenuPopover";

AppTasks.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTasks({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      {list.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Card>
  );
}

function TaskItem({ task, checked, ...other }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = event => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
    console.log("MARK COMPLETE", task);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.log("SHARE", task);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.log("EDIT", task);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.log("DELETE", task);
  };

  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: "text.disabled",
          textDecoration: "line-through",
        }),
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            // {...getFieldProps("checked")}
            value={task.id}
            checked={checked}
            {...other}
          />
        }
        label={task.label}
        sx={{ flexGrow: 1, m: 0 }}
      />

      <MoreMenuButton
        open={open}
        onClose={handleCloseMenu}
        onOpen={handleOpenMenu}
        actions={
          <>
            <MenuItem onClick={handleMarkComplete}>
              <Iconify icon={"eva:checkmark-circle-2-fill"} />
              Mark Complete
            </MenuItem>

            <MenuItem onClick={handleEdit}>
              <Iconify icon={"eva:edit-fill"} />
              Edit
            </MenuItem>

            <MenuItem onClick={handleShare}>
              <Iconify icon={"eva:share-fill"} />
              Share
            </MenuItem>

            <Divider sx={{ borderStyle: "dashed" }} />

            <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
              <Iconify icon={"eva:trash-2-outline"} />
              Delete
            </MenuItem>
          </>
        }
      />
    </Stack>
  );
}

// ----------------------------------------------------------------------

MoreMenuButton.propTypes = {
  actions: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.object,
};

function MoreMenuButton({ actions, open, onOpen, onClose }) {
  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        sx={{ opacity: 0.48 }}
        onClick={onOpen}
      >
        <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
      </IconButton>
      {/* 
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: "auto",
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
            "& svg": { mr: 2, width: 20, height: 20 },
          },
        }}
      >
        {actions}
      </MenuPopover> */}
    </>
  );
}
