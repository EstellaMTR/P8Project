import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        setError("Invalid username or password");
        return;
      }

      const user = await response.json();
      onLogin(user); // pass user to parent
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Paper sx={{ p: 4, width: 350, borderRadius: "16px" }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Log In
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            sx={{ mb: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography sx={{ color: "red", mb: 2 }}>{error}</Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#14B8A6",
              fontWeight: 600,
              borderRadius: "12px",
              py: 1.2,
              "&:hover": { bgcolor: "#14B8A6" },
            }}
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Box>
  );
}