import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AdacemicSessionCard({session}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 400,  padding: 0 }}>
      <CardContent>
        <Typography variant="h5">{session.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          This is some basic content inside the card.
        </Typography>

        <IconButton onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </IconButton>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography sx={{ marginTop: 2 }}>
            This is the expanded content. It becomes visible when you click the dropdown button.
          </Typography>
        </Collapse>
      </CardContent>
    </Card>
  );
}