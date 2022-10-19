import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material/";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HistoryIcon from "@mui/icons-material/History";
import "./App.css";
import UUID from "./components/uuid";
import History from "./components/history";
import { appendHistory, HistoryItem, loadHistory } from "./utils";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log("seesionstorage not set", sessionStorage);
  };

  useEffect(() => {
    loadHistory((_loadedHistory) => {
      console.log("_loadedHistory", _loadedHistory);
      setHistory(_loadedHistory);
    });
  }, []);

  return (
    <div className="app">
      <Box
        sx={{
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab
            sx={{ color: "white" }}
            icon={<AddCircleOutlineIcon />}
            label="UUID"
          />
          <Tab sx={{ color: "white" }} icon={<HistoryIcon />} label="HISTORY" />
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TabPanel value={value} index={0}>
          <UUID
            history={history}
            onUUIDCreate={(uuid) => {
              appendHistory(new HistoryItem(uuid, Date.now()));
              loadHistory((_loadedHistory) => {
                console.log("_loadedHistory", _loadedHistory);
                setHistory(_loadedHistory);
              });
            }}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <History history={history} />
        </TabPanel>
      </Box>
    </div>
  );
}

export default App;
