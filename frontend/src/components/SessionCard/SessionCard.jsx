import { Card, CardContent, Typography, Button, IconButton, CardHeader, Collapse, CardActions, Box, } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import ClockIcon from '@mui/icons-material/WatchLater';
import EditIcon from '@mui/icons-material/Edit';

import { styled } from '@mui/material/styles';
import React from 'react';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function SessionCard({ session, onEdit, onDelete, onFinish }) {
    const [expanded, setExpanded] = React.useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

  if (!session) return null; // safety guard

  return (
    <Card 
        sx={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
            width: "100%",
        }}
    >
        <Box
            sx={{
                bgcolor: "#456EBB",
                color: "#F4F7FF", 
                px: 2,
                py: 1.5,
                display: "flex",
                alignItems: "center",
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", lineHeight: 1 }}>
                    {session.title}
                </Typography>

                <Typography sx={{ fontSize: "0.9rem" }}>
                    {session.type}
                </Typography>
            </Box>

            <IconButton 
                sx={{ color: "#F4F7FF" }}
                onClick={() => onEdit(session)}
            >
                <EditIcon fontSize="medium" />
            </IconButton>

            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                sx={{ color: "#F4F7FF" }}
            >
                <ExpandMoreIcon fontSize="large" />
            </ExpandMore>
        </Box>

        <Collapse in={expanded}>
            <CardContent sx={{ py: 2, px: 2.5, bgcolor: "#F4F7FF" }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>
                    Goals:
                </Typography>

                {session.goals.map((goal, index) => (
                    <Box 
                        key={index} 
                        sx={{ 
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1, 
                            bgcolor: "#456EBB",
                            borderRadius: "12px",
                            px: 1.5,
                            py: 1.2,
                            gap: 1.5,
                        }}
                    >
                        <FlagIcon sx={{ color: "#F4F7FF", fontSize: 18 }} />
                        
                        <Typography
                            sx={{
                                fontSize: "0.95rem",
                                lineHeight: 1.45,
                                color: "#F4F7FF",
                            }}
                        >
                            {goal}
                        </Typography>
                    </Box>
                ))}

                <Typography sx={{ fontWeight: 600, mt: 2 }}>Est. Time</Typography>

                <Typography sx={{ 
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 1,
                    color: "text.secondary" //figure out how to make it the right color
                    }}
                >
                    <ClockIcon fontSize="small" />
                    {session.estimatedTime}
                </Typography>
            
            <CardActions 
                sx={{ 
                    px: 2.5, 
                    pb: 2, 
                    pt: 0,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 1.5, 
                    }}
                >
                
                {!session.completed && (
                    <Button
                        variant="contained"
                        onClick={() => setConfirmDeleteOpen(true)}
                            sx={{
                                minWidth: "48px",
                                height: "48px",
                                bgcolor: "#14BBA6",
                                color: "#F4F7FF",
                                borderRadius: "12px",
                                p: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0px 2px 4px rgba(0,0,0,0.15)",
                                transition: "all 0.2s ease",
                                "&hover": { 
                                    bgcolor: "#14B8A6", 
                                    boxShadow: "0px 4px 8px rgba(0,0,0,0.25)",
                                }
                            }}
                        >
                            <DeleteIcon/>
                        </Button>
                )}

                <Button
                variant="contained"
                onClick={() => onFinish(session.id)}
                sx={{
                    minWidth: "48px",
                    height: "48px",
                    bgcolor: "#14B8A6",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "12px",
                    p: 2,
                    fontSize: "1rem",
                    "&:hover": { bgcolor: "#14B8A6" }, // hover effect?
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.15)",
                }}
                >
                    {session.completed ? "Start Reflection" : "Finish"}
                </Button>
            </CardActions>

            </CardContent>
        </Collapse>

        <Dialog
            open={confirmDeleteOpen}
            onClose={() => setConfirmDeleteOpen(false)}
        >
            <Box sx={{ p: 3 }}>
                <Typography sx={{ mb: 2 }}>
                    Are you sure you want to delete this session?
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button onClick={() => setConfirmDeleteOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        color="error"
                        onClick={() => {
                            onDelete(session.id);
                            setConfirmDeleteOpen(false);
                        }}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </Dialog>
    </Card> 
  );
}