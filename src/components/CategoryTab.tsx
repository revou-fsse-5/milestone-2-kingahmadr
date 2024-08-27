// import * as React from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Cards from "./Cards";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  //   const { children } = props;

  return (
    <div
      //   className="flex flex-wrap justify-end w-3/6 gap-20"
      //   role="tabpanel"
      //   hidden={value !== index}
      //   id={`vertical-tabpanel-${index}`}
      //   aria-labelledby={`vertical-tab-${index}`}
      //   {...other}
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {/* {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )} */}
      {children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    // id: `vertical-tab-${index}`,
    // "aria-controls": `vertical-tabpanel-${index}`,
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function CategoryTab() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    // <Box
    //   sx={{
    //     flexGrow: 1,
    //     bgcolor: "background.paper",
    //     display: "flex",
    //     height: 224,
    //   }}
    // >
    //   <Tabs
    //     orientation="vertical"
    //     variant="scrollable"
    //     value={value}
    //     onChange={handleChange}
    //     aria-label="Vertical tabs example"
    //     sx={{ borderRight: 1, borderColor: "divider", bgcolor: "grey.400" }}
    //   >
    //     <Tab label="Item One" {...a11yProps(0)} />
    //     <Tab label="Item Two" {...a11yProps(1)} />
    //     <Tab label="Item Three" {...a11yProps(2)} />
    //     <Tab label="Item Four" {...a11yProps(3)} />
    //     <Tab label="Item Five" {...a11yProps(4)} />
    //     <Tab label="Item Six" {...a11yProps(5)} />
    //     <Tab label="Item Seven" {...a11yProps(6)} />
    //   </Tabs>
    //   <TabPanel value={value} index={0}>
    //     <Cards />
    //   </TabPanel>
    //   <TabPanel value={value} index={1}>
    //     Item Two
    //   </TabPanel>
    //   <TabPanel value={value} index={2}>
    //     Item Three
    //   </TabPanel>
    //   <TabPanel value={value} index={3}>
    //     Item Four
    //   </TabPanel>
    //   <TabPanel value={value} index={4}>
    //     Item Five
    //   </TabPanel>
    //   <TabPanel value={value} index={5}>
    //     Item Six
    //   </TabPanel>
    //   <TabPanel value={value} index={6}>
    //     Item Seven
    //   </TabPanel>
    // </Box>
    <Box sx={{ bgcolor: "background.paper", width: 500 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Cards />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
