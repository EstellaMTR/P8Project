import { useState } from "react";
import { Button, Box, Typography, Paper } from "@mui/material";
import CreateSessionPopUp from "../components/CreateSessionPopUp/CreateSessionPopUp.jsx"; // adjust path if needed
import SessionCard from "../components/SessionCard/SessionCard.jsx"; //this is our session card component

// const SessionCard = () => <div>Test</div>; //placeholder in case this doesn't work

export default function CreateSessionTest() {
  const [open, setOpen] = useState(false);
  const [sessions, setSessions] = useState([]);

  const handleCreate = (newSession) => {
    console.log("New session created:", newSession);
    setSessions([...sessions, newSession]);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create New Session
      </Button>

      {/* Your pop‑up */}
      <CreateSessionPopUp
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreate}
      />

      {/* Display test results */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Created Sessions (Test Output)</Typography>

        {sessions.map((session, index) => (
          <Paper key={index} sx={{ p: 2, mt: 2, background: "var(--bgAccent)" }}>
          <SessionCard session={session} />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
``