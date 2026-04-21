import { useEffect, useState } from "react";
import { Button, Box, Typography, Paper, Card, CardActions, CardContent } from "@mui/material";

export default function BackgroundBox({header, children}) {

    return (
    <Card sx={{ 
        width: 500, 
        margin: "10px", 
        padding: 3, 
        bgcolor: "#d0E0FF", 
        color: "#1E1E1E", 
        height: 550,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        }}
    >
        <Box sx={{ mb: 1.5}}>
        {header}
        </Box>

        <Box
            sx={{
                flexGrow: 1,
                overflowY: "auto",
                pr: 1,
            }}
        >
            {children}
        </Box>
    </Card>
    );
}