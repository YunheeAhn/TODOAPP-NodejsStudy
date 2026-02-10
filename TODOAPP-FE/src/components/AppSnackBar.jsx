import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";

const AppSnackbar = ({
  open,
  message,
  severity = "success", // "success" | "error" | "info" | "warning"
  onClose,
  duration = 1200,
  anchorOrigin = { vertical: "top", horizontal: "center" },
}) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={duration}
      anchorOrigin={anchorOrigin}
      TransitionComponent={Fade}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ alignItems: "center" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
