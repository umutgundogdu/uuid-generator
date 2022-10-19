import * as React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { HistoryItem } from "../utils";

const HistoryItemComp = ({ historyItem }: { historyItem: HistoryItem }) => {
  return (
    <ListItem>
      <ListItemButton
        onClick={() => {
          navigator.clipboard.writeText(historyItem.uuid);
        }}
      >
        <ListItemText primary={historyItem.uuid} />
        <Typography>{historyItem.getDateString()}</Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default function History({ history }: { history: HistoryItem[] }) {
  return (
    <Box sx={{ width: "100%", minWidth: 600, bgcolor: "transparent" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {history.map((item) => (
            <HistoryItemComp historyItem={item} />
          ))}
        </List>
      </nav>
    </Box>
  );
}
