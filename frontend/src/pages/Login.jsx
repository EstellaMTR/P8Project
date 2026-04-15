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
    <Box sx={{ 
      minHeight: "100vh", 
      background: "var(--bgGradient)",
      display: "flex", 
      justifyContent: "center",
      alignItems: "center", 
      px: 2 }}>
      <Paper 
      elevation={6}
      sx={{ 
        width: "100%", maxWidth: 360,
        backgroundColor: "var(--cardMain)", 
        borderRadius: "16px",
        p: 4,
        color: "var(--textLight)",
        }}>
        <Typography 
        variant="h5" sx={{ mb: 0.5, fontWeight: 700, textAlign: "center" }}>
          Log In
        </Typography>

        <Typography
        sx={{ fontSize: "0.85rem", textAlign: "center", opacity: 0.85, mb: 3}}>
          Please enter your provided login credentials
        </Typography>


        <form onSubmit={handleSubmit}>
          <Typography sx= {{ fontSize: "0.85rem", mb: 0.5 }}>
            Username
          </Typography>

          <TextField
            fullWidth
            sx={{ mb: 2, backgroundColor: "white", borderRadius: "8px", }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Typography sx= {{ fontSize: "0.85rem", mb: 0.5 }}>
            Password
          </Typography>

          <TextField
            type="password"
            fullWidth
            sx={{ mb: 2, backgroundColor: "white", borderRadius: "8px", }}
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