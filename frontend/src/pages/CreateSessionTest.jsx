import { Box, Typography, Paper } from "@mui/material";
import { useState } from "react";
import SessionCard from "../components/SessionCard/SessionCard.jsx";
import CreateSessionPopUp from "../components/CreateSessionPopUp/CreateSessionPopUp.jsx";
import ReflectionPopUp from "../components/ReflectionPopUp/ReflectionPopUp.jsx";

export default function CreateSessionTest({ user }) {
  console.log("Logged in as:", user.name);
  const [sessions, setSessions] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const [reflectionSession, setReflectionSession] = useState(null);

  // Create or update session
  const handleSave = (sessionData) => {
    if (editingSession) {
      setSessions(prev =>
        prev.map(s => s.id === sessionData.id ? sessionData : s)
      );
    } else {
      setSessions(prev => [
        ...prev,
        { ...sessionData, id: crypto.randomUUID(), completed: false }
      ]);
    }

    setEditingSession(null);
    setOpen(false);
  };

  // Delete
  const handleDelete = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  // Finish
  const handleFinish = (id) => {
    setSessions(prev =>
      prev.map(s =>
        s.id === id ? { ...s, completed: true } : s
      )
    );
  };

  // Edit
  const handleEdit = (session) => {
    setEditingSession(session);
    setOpen(true);
  };

  const handleStartReflection = (session) => {
    setReflectionSession(session);
    setReflectionOpen(true);
};

  const handleSaveReflection = (id, reflectionText) => {
    setSessions(prev =>
        prev.map(s =>
            s.id === id ? { ...s, reflection: reflectionText } : s
        )
    );
};

  const plannedSessions = sessions.filter(s => !s.completed);
  const completedSessions = sessions.filter(s => s.completed);

  return (
    <Box sx={{ p: 4 }}>
      {/* Create button */}
      <button
        onClick={() => {
          setEditingSession(null);
          setOpen(true);
        }}
        style={{
          padding: "10px 16px",
          borderRadius: "10px",
          background: "#14B8A6",
          color: "white",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        + New Session
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.reload();
        }}
      >
        Logout
      </button>

      {/* Popup */}
      <CreateSessionPopUp
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingSession(null);
        }}
        onCreate={handleSave}
        session={editingSession}
      />

      <ReflectionPopUp
        open={reflectionOpen}
        onClose={() => setReflectionOpen(false)}
        session={reflectionSession}
        onSave={handleSaveReflection}
      />

      {/* Planned Sessions */}
      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Planned Sessions
      </Typography>

      {plannedSessions.length === 0 && (
        <Typography sx={{ opacity: 0.6 }}>No planned sessions</Typography>
      )}

      {plannedSessions.map((session) => (
        <Paper key={session.id} sx={{ p: 2, mt: 2 }}>
          <SessionCard
            session={session}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onFinish={handleFinish}
            onStartReflection={handleStartReflection}
          />
        </Paper>
      ))}

      {/* Completed Sessions */}
      <Typography variant="h5" sx={{ mt: 5, mb: 1 }}>
        Ready for Reflection
      </Typography>

      {completedSessions.length === 0 && (
        <Typography sx={{ opacity: 0.6 }}>No completed sessions yet</Typography>
      )}

      {completedSessions.map((session) => (
        <Paper key={session.id} sx={{ p: 2, mt: 2 }}>
          <SessionCard
            session={session}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onFinish={handleFinish}
            onStartReflection={handleStartReflection}
          />
        </Paper>
      ))}
    </Box>
  );
}