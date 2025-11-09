import { useState, useEffect } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import { Stack } from "@mui/material";
import { tabProps } from "../lib/tabProps";
import VisitorForm from "./forms/VisitorForm";
import { getCurrentUser } from "@/api/getData";
import { CustomTabPanel } from "./ui/CustomTabPanel";
import { NAMAYANDEGAN_USER } from "@/constants/constants";
import RepresentationForm from "./forms/RepresentationForm";

export default function EzhibitionForm() {
  const [value, setValue] = useState(1);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();

        let username = "";
        if (currentUser.includes("|")) {
          const parts = currentUser.split("|");
          if (parts.length > 0) {
            const lastPart = parts[parts.length - 1];
            if (lastPart.includes("\\")) {
              const splitParts = lastPart.split("\\");
              username = splitParts[splitParts.length - 1].toLowerCase();
            } else {
              username = lastPart.toLowerCase();
            }
          }
        } else {
          username = currentUser.toLowerCase();
        }

        const isNamayandegan = NAMAYANDEGAN_USER.some(
          (user) =>
            username === user.toLowerCase() ||
            username.includes(user.toLowerCase())
        );

        if (isNamayandegan) {
          setValue(0);
        } else {
          setValue(1);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row-reverse"
        justifyContent={"space-between"}
        sx={{ borderBottom: 1, borderColor: "divider", textAlign: "right" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="material management tabs"
        >
          <Tab label="فرم درخواست نمایندگی" {...tabProps(0)} />
          <Tab label="فرم بازدیدکنندگان" {...tabProps(1)} />
        </Tabs>
      </Stack>

      <CustomTabPanel value={value} index={1}>
        <VisitorForm />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={0}>
        <RepresentationForm />
      </CustomTabPanel>
    </Box>
  );
}
