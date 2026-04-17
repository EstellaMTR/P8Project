import { useEffect, useState } from "react";
import { Button, Box, Typography, Paper, Card, CardActions, CardContent } from "@mui/material";

export default function BackgroundBox({cardContent}) {


    return <>
    <Card sx={{ 
        width: 500, 
        margin: "10px 10px 5px 10px", 
        padding: 4, 
        bgcolor: "#d0E0FF", 
        color: "#1E1E1E", 
        height: 600,
        overflowY: "auto",
        textAlign: "center",
        alignContent: "center",
        }}>
        {cardContent}
    </Card>


    </>

}