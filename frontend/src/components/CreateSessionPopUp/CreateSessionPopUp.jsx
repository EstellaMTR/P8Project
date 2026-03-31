import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    IconButton,
    Typography,
    Box,
    Stack,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { useState } from "react";

export default function CreateSessionPopUp({ open, onClose, onCreate }) {

    // ✅ Initial values (for reset)
    const initialState = {
        title: "New Session",
        type: "Study",
        goals: [],
        newGoal: "",
        hours: "01",
        minutes: "30",
    };

    const [title, setTitle] = useState(initialState.title);
    const [type, setType] = useState(initialState.type);
    const [goals, setGoals] = useState(initialState.goals);
    const [newGoal, setNewGoal] = useState(initialState.newGoal);
    const [hours, setHours] = useState(initialState.hours);
    const [minutes, setMinutes] = useState(initialState.minutes);

    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState("");

    // ✅ Reset popup
    const resetPopup = () => {
        setTitle(initialState.title);
        setType(initialState.type);
        setGoals(initialState.goals);
        setNewGoal(initialState.newGoal);
        setHours(initialState.hours);
        setMinutes(initialState.minutes);
        setEditingIndex(null);
        setEditingText("");
    };

    const handleClose = () => {
        resetPopup();
        onClose();
    };

    const addGoal = () => {
        if (newGoal.trim() !== "" && goals.length < 3) {
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
            createdAt: Date.now(),
        });
        resetPopup();
        onClose();
    };

    // ✅ Time validation
    const validateHours = (value) => {
        if (value < 0) return "00";
        if (value > 24) return "24";
        return value.toString().padStart(2, "0");
    };

    const validateMinutes = (value) => {
        if (value < 0) return "00";
        if (value > 59) return "59";
        return value.toString().padStart(2, "0");
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: "#456ebb",
                    borderRadius: "20px",
                    padding: "20px",
                    position: "relative",
                }
            }}
        >

            {/* ✅ HEADER */}
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#fff",
                    pb: 0,
                }}
            >
                <TextField
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    InputProps={{
                        endAdornment: <EditIcon sx={{ color: "#456ebb" }} />,
                        sx: {
                            backgroundColor: "white",
                            borderRadius: "10px",
                            height: "45px",
                            "& input": {
                                textAlign: "center",
                                fontSize: "20px",
                                fontWeight: "bold",
                            },
                        },
                    }}
                />

                <IconButton onClick={handleClose} sx={{ color: "#fff", ml: 2 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            {/* ✅ CONTENT */}
            <DialogContent sx={{ mt: 2, color: "#fff" }}>

                {/* ✅ SESSION TYPE */}
                <Typography sx={{ mt: 1, fontSize: "18px" }}>
                    Pick a session type
                </Typography>

                <ToggleButtonGroup
                    value={type}
                    exclusive
                    onChange={(e, newType) => newType && setType(newType)}
                    sx={{ mt: 1, gap: 2 }}
                >
                    {[
                        { value: "Lecture", icon: <MenuBookIcon /> },
                        { value: "Study", icon: <SchoolIcon /> },
                        { value: "Writing", icon: <EditNoteIcon /> }
                    ].map((item) => (
                        <ToggleButton
                            key={item.value}
                            value={item.value}
                            sx={{
                                borderRadius: "50px",
                                px: 2,
                                py: 1,
                                border: "2px solid #456ebb",
                                backgroundColor: "white",
                                color: "#2e2e2e",
                                fontWeight: 500,

                                // ✅ Correct fix: override selected color
                                "&.Mui-selected": {
                                    backgroundColor: "#14B8A6 !important",
                                    color: "#ffffff !important",
                                    borderColor: "#14B8A6 !important"
                                },
                                "&.Mui-selected:hover": {
                                    backgroundColor: "#0E8F81 !important",
                                },

                                "&:hover": {
                                    backgroundColor: "#f2f6ff",
                                }
                            }}
                        >
                            {item.icon} &nbsp; {item.value}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>

                {/* ✅ GOALS */}
                <Typography sx={{ mt: 3, fontSize: "18px" }}>
                    My goals for this session are...
                </Typography>

                {/* ✅ LIST OF GOALS */}
                <Stack sx={{ mt: 1 }} spacing={1}>
                    {goals.map((g, i) => (
                        <Box
                            key={i}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "white",
                                borderRadius: "8px",
                                padding: "6px 10px",
                                color: "#000",
                            }}
                        >
                            <SchoolIcon sx={{ mr: 1, color: "#456ebb" }} />

                            {editingIndex === i ? (
                                <TextField
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            const updated = [...goals];
                                            updated[i] = editingText;
                                            setGoals(updated);
                                            setEditingIndex(null);
                                        }
                                    }}
                                    size="small"
                                    sx={{
                                        flexGrow: 1,
                                        "& .MuiInputBase-root": {
                                            backgroundColor: "#e8f0fe",
                                        },
                                    }}
                                />
                            ) : (
                                <Typography sx={{ flexGrow: 1 }}>{g}</Typography>
                            )}

                            <EditIcon
                                sx={{ color: "#14B8A6", cursor: "pointer", ml: 1 }}
                                onClick={() => {
                                    setEditingIndex(i);
                                    setEditingText(g);
                                }}
                            />
                        </Box>
                    ))}
                </Stack>

                {/* ✅ NEW GOAL INPUT (hidden when 3 goals exist) */}
                {goals.length < 3 && (
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Write your goal here..."
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                            InputProps={{
                                endAdornment: <EditIcon sx={{ color: "#456ebb" }} />,
                                sx: {
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    height: "40px",
                                },
                            }}
                        />

                        <IconButton
                            onClick={addGoal}
                            sx={{
                                backgroundColor: "#14b8a6",
                                color: "white",
                                width: "40px",
                                height: "40px",
                                "&:hover": { backgroundColor: "#0e8f81" },
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Stack>
                )}

                {/* ✅ TIME PICKER */}
                <Typography sx={{ mt: 4, fontSize: "18px", textAlign: "center" }}>
                    I expect this session to take...
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
                >
                    <TextField
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(validateHours(e.target.value))}
                        sx={{
                            width: "80px",
                            backgroundColor: "white",
                            borderRadius: "10px",
                            "& input": {
                                textAlign: "center",
                                fontSize: "24px",
                                fontWeight: "bold",
                            },
                        }}
                    />

                    <Typography sx={{ fontSize: "30px", color: "white" }}>:</Typography>

                    <TextField
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(validateMinutes(e.target.value))}
                        sx={{
                            width: "80px",
                            backgroundColor: "white",
                            borderRadius: "10px",
                            "& input": {
                                textAlign: "center",
                                fontSize: "24px",
                                fontWeight: "bold",
                            },
                        }}
                    />
                </Stack>

                {/* ✅ DONE BUTTON */}
                <Button
                    variant="contained"
                    onClick={handleCreate}
                    sx={{
                        backgroundColor: "#14b8a6",
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        borderRadius: "10px",
                        px: 3,
                        "&:hover": {
                            backgroundColor: "#0e8f81",
                        },
                    }}
                >
                    Done
                </Button>
            </DialogContent>
        </Dialog>
    );
}

