import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Chip,
    IconButton,
    Stack,
    Typography,
    Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';

export default function CreateSessionPopUp({ open, onClose, onCreate }) {
    const [title, setTitle] = useState("New Session");
    const [type, setType] = useState("");
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState("");
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();

    const addGoal = () => {
        if (newGoal.trim() !== "") {
            setGoals([...goals, newGoal]);
            setNewGoal("");
        }
    };
    const handleCreate = () => {
        onCreate({
            title,
            type,
            goals,
            duration: { hours, minutes },
            status: "planned",
            createdAt: Date.now()
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>New Session</span>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>

                {/* Session Type */}
                <Typography sx= {{ mt: 2 }}>Pick a session type</Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    {["Study", "Work", "Exercise"].map((t => (
                        <Chip
                            key={t}
                            label={t}
                            color={type === t ? "primary" : "default"}
                            onClick={() => setType(t)}
                        />
                    )))}
                </Stack>

                {/* Session Title */}
                <Typography sx={{ mt: 3 }}>My goals for this session are:</Typography>

                <Stack spacing={1} sx={{ mt: 1 }}>
                    {goals.map((g, i) => (
                        <Chip
                            key={i}
                            label={g}
                            onDelete={() => setGoals(goals.filter((_, idx) => idx !== i))}
                            variant="outlined"
                        /> 
                    ))}
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Add a goal"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        />
                    <IconButton onClick={addGoal}>
                        <AddIcon/>
                    </IconButton>
                </Stack>
                
                {/* Time selection */}
                <Typography sx={{ mt: 3 }}>I expect this session to take...</Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        type="number"
                        label="Hours"
                        value={hours}
                        onChange={(e) => setMinutes(e.target.value)}
                        sx={{ width: 120 }}
                    />
                </Stack>

                {/* Submit */}
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 4 }}
                    onClick={handleCreate}
                >
                    Done
                </Button>
            
            </DialogContent>
        </Dialog>
    );
}


