import { Card, CardContent, Typography, Button, IconButton, CardHeader, Collapse, CardActions } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ArrowDropUp';
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

export default function SessionCard({ session }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

  if (!session) return null; // safety guard

  return (
    <Card 
        sx={{
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0,08)",
            p: 1.5,
            width: "100%",
        }}
    >
        <CardHeader
            sx={{
                pb: 0.5,
            }}
            titleTypographyProps={{ 
                fontWeight: 600, 
                fontSize: "1.1rem",
                lineHeight: 1.2, 
            }}
            subheaderTypographyProps={{ 
                color: "text.secondary" 
                fontSize
            }}
            title={session.title}
            subheader={session.type}
            action={
                <>
                    <IconButton aria-label="edit session">
                        <EditIcon/>
                    </IconButton>

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="expand session"
                    >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </>
        }    
    />
        <Collapse in={expanded}>
            <CardContent sx={{ pt: 0 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Goals:
                </Typography>

                {session.goals.map((goal, index) => (
                        <Typography 
                        key={index} 
                        variant="body2" 
                        sx={{ mb: 0.8, lineHeight: 1.4 }}
                        >
                            • {goal}
                        </Typography>
                ))}
                 
                <Typography 
                variant="body2" 
                sx={{ 
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 2,
                    color: "text.secondary",
                    }}
                >
                    <ClockIcon fontSize="small" />
                    {session.estimatedTIme}
                    </Typography>
                </CardContent>
            <CardActions>
                <Button
                fullWidth
                variant="contained"
                sx={{
                    bgcolor: "success.main",
                    textTransform: "non",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": { bgcolor: "success.dark" },
                }}
                >
                    {session.completed ? "Start Reflection" : "Finish"}
                </Button>
            </CardActions>
        </Collapse>
    </Card> 
  );
}