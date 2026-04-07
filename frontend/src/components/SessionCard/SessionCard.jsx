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
    <Card variant="h1" sx={{maxWidth: 345}}> {/*figure out how to make adjustable for screen/what size the card should be*/}
        <CardHeader
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
        title={session.title}
        subheader={session.type}
    />
        <Collapse in={expanded}>
            <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2}}>
                    Goals:
                </Typography>

                {session.goals.map((goal, index) => (
                        <Typography key={index} variant="body2" sx={{ mb: 0.5}}>
                            * {goal}
                        </Typography>
                ))}
            
                    
                <Typography variant="body2" sx={{ marginBottom: 2}}>Est. time:</Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Collapse>
    </Card> 
  );
}