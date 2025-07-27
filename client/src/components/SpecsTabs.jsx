import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";

// Example: expects a `specs` prop as an object with tab names as keys
// and tab content as values (can be string, array, or object)
export default function SpecsTabs({ specs = {} }) {
  const tabKeys = Object.keys(specs);
  const [tab, setTab] = useState(0);

  if (!tabKeys.length) return null;

  return (
    <Box className="mt-6">
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabKeys.map((key, i) => (
          <Tab key={key} label={key} />
        ))}
      </Tabs>
      <Box className="p-4 bg-gray-50 rounded-b">
        <TabPanel value={tab} index={tab}>
          <SpecContent content={specs[tabKeys[tab]]} />
        </TabPanel>
      </Box>
    </Box>
  );
}

// Helper: TabPanel
function TabPanel({ children, value, index }) {
  return value === index ? <div>{children}</div> : null;
}

// Helper: Render content flexibly
function SpecContent({ content }) {
  if (typeof content === "string") {
    return <Typography>{content}</Typography>;
  }
  if (Array.isArray(content)) {
    return (
      <ul className="list-disc pl-6">
        {content.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  if (typeof content === "object" && content !== null) {
    return (
      <table className="w-full text-left">
        <tbody>
          {Object.entries(content).map(([k, v]) => (
            <tr key={k}>
              <td className="pr-4 font-semibold">{k}</td>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return null;
}