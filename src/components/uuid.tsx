import React, { useState, useEffect } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  styled,
} from "@mui/material/";
import { v4 as uuidv4 } from "uuid";
import { appendHistory, HistoryItem, loadHistory } from "../utils";

const StyledButton = styled(Button)({
  borderRadius: 50,
});

export default function UUID({
  history,
  onUUIDCreate,
}: {
  history: HistoryItem[];
  onUUIDCreate: (uuid: string) => void;
}) {
  const [currentUUID, setCurrentUUID] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const generateUUID = () => {
    const createdUUID = uuidv4();
    setCurrentUUID(createdUUID);
    setDisabled(true);
    onUUIDCreate(createdUUID);
    setInterval(() => {
      setDisabled(false);
    }, 1500);
  };

  useEffect(() => {
    generateUUID();
  }, []);

  const copy2Clipboard = () => {
    setOpen(true);
    navigator.clipboard.writeText(currentUUID).then(
      () => {
        //clipboard successfully set
        console.log("success copy clipboard");
      },
      () => {
        //clipboard write failed, use fallback
        console.error("error to copy clipboard");
      }
    );
    console.log("currentUUID", currentUUID);
    setInterval(() => {
      setOpen(false);
    }, 1500);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <>{currentUUID}</>
      <Box
        sx={{
          display: "flex",
          flexDirection: "col",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledButton
          disabled={disabled}
          variant="contained"
          onClick={generateUUID}
        >
          Generate UUID
        </StyledButton>
        <StyledButton variant="contained" onClick={copy2Clipboard}>
          COPY UUID
        </StyledButton>
      </Box>
      <Collapse in={open}>
        <Alert severity="success" sx={{ width: "500px", mt: 5 }}>
          <AlertTitle>Success</AlertTitle>
          <strong>UUID COPIED</strong>
          <strong>{currentUUID}</strong>
        </Alert>
      </Collapse>
    </Box>
  );
}
