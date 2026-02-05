import { useCallback, useState } from "react";

export const SNACK = {
  ADD_SUCCESS: "할 일이 등록 되었습니다.",
  ADD_FAIL: "할 일이 등록 되지 않았습니다.",
  DELETE_SUCCESS: "할 일이 삭제 되었습니다",
  COMPLETE_SUCCESS: "할 일을 완료 했습니다",
};

export default function useAppSnackbar() {
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
    key: 0,
  });

  const showSnack = useCallback((message, severity = "success") => {
    setSnack({
      open: true,
      message,
      severity,
      key: Date.now(), // 연속 호출에도 항상 다시 뜨게
    });
  }, []);

  const closeSnack = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setSnack((prev) => ({ ...prev, open: false }));
  }, []);

  return { snack, showSnack, closeSnack, SNACK };
}
