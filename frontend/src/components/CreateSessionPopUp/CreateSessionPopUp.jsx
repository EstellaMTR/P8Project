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
    ToggleButtonGroup,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School";
import FlagIcon from '@mui/icons-material/Flag';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { useState, useEffect } from "react";

export default function CreateSessionPopUp({ open, onClose, onCreate, session }) {

    // ✅ Initial state for reset
    const initialState = {
        title: "New Session",
        type: "",
        goals: [],
        hours: "00",
        minutes: "00",
    };

    const [title, setTitle] = useState(initialState.title);
    const [type, setType] = useState(initialState.type);
    const [goals, setGoals] = useState(initialState.goals);
    const [inputVisible, setInputVisible] = useState(false); // ✅ controls goal input field visibility
    const [newGoal, setNewGoal] = useState("");
    const [hours, setHours] = useState(initialState.hours);
    const [minutes, setMinutes] = useState(initialState.minutes);

    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
    if (session) {
        setTitle(session.title);
        setType(session.type);
        setGoals(session.goals);
        setHours(session.duration?.hours || "00");
        setMinutes(session.duration?.minutes || "00");
    } else {
        // If no session is passed, reset to initial state (create mode)
        resetPopup();
    }
}, [session]);

    // ✅ Reset everything
    const resetPopup = () => {
        setTitle(initialState.title);
        setType(initialState.type);
        setGoals(initialState.goals);
        setInputVisible(false);
        setNewGoal("");
        setHours(initialState.hours);
        setMinutes(initialState.minutes);
        setEditingIndex(null);
        setEditingText("");
    };

    const handleClose = () => {
        resetPopup();
        onClose();
    };

    // ✅ Save session
    const handleSave = () => {
        const data = {
            id: session?.id || crypto.randomUUID(),
            title,
            type,
            goals,
            estimatedTime: `${hours} h ${minutes} m`,
            status: session?.status || "planned",
            createdAt: session?.createdAt || Date.now(),
        };

        onCreate(data);   // parent decides if it's create or update
        resetPopup();
        onClose();
    };

    // ✅ Add new goal
    const addGoal = () => {
        if (newGoal.trim() === "") return;

        const updated = [...goals, newGoal];
        setGoals(updated);
        setNewGoal("");
        setInputVisible(false); // ✅ CLOSE the input field after saving
    };

    // ✅ Validate time fields
    const validateHours = (v) => v < 0 ? "00" : v > 24 ? "24" : v.toString().padStart(2, "0");
    const validateMinutes = (v) => v < 0 ? "00" : v > 59 ? "59" : v.toString().padStart(2, "0");

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            fullScreen={false}
            PaperProps={{
                sx: {
                    backgroundColor: "#456ebb",
                    borderRadius: "20px",
                    padding: "20px",
                    width: "100%",
                    maxWidth: "520px",
                    margin: "0 auto",
                },
            }}
        >

            {/* ✅ HEADER */}
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "white",
                }}
            >
                <TextField
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    InputProps={{
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
                <IconButton onClick={handleClose} sx={{ color: "white", ml: 2 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ color: "white" }}>

                {/* ✅ SESSION TYPE */}
                <Typography sx={{ mt: 1, fontSize: "18px" }}>
                    Pick a session type
                </Typography>

                <ToggleButtonGroup
                    value={type}
                    exclusive
                    onChange={(e, newType) => newType && setType(newType)}
                    sx={{ mt: 2, display: "flex", gap: 2 }}
                >
                    {[
                        { value: "Lecture", icon: <MenuBookIcon /> },
                        { value: "Study", icon: <SchoolIcon /> },
                        { value: "Writing", icon: <EditNoteIcon /> },
                    ].map((item) => (
                        <ToggleButton
                            key={item.value}
                            value={item.value}
                            sx={{
                                borderRadius: "999px !important",
                                padding: "8px 22px",
                                minWidth: "130px",
                                border: "2px solid #456ebb",
                                backgroundColor: "white",
                                color: "#2e2e2e",

                                "&.Mui-selected": {
                                    backgroundColor: "#14B8A6 !important",
                                    color: "#ffffff !important",
                                    borderColor: "#14B8A6 !important",
                                },
                                "&.Mui-selected:hover": {
                                    backgroundColor: "#0E8F81 !important",
                                },
                                "&:hover": {
                                    backgroundColor: "#f3f3f3",
                                },
                            }}
                        >
                            {item.icon}&nbsp;{item.value}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>

                {/* ✅ GOALS */}
                <Typography sx={{ mt: 3, fontSize: "18px" }}>
                    My goals for this session are...
                </Typography>

                {/* ✅ Render existing goals */}
                <Stack spacing={1} sx={{ mt: 2 }}>
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
                            <FlagIcon sx={{ mr: 1, color: "#456ebb" }} />

                            {editingIndex === i ? (
                                <TextField
                                    autoFocus
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
                                    sx={{
                                        flexGrow: 1,
                                        "& .MuiInputBase-root": {
                                            backgroundColor: "#E6F0FF",
                                            borderRadius: "6px",
                                        },
                                    }}
                                />
                            ) : (
                                <Typography sx={{ flexGrow: 1 }}>{g}</Typography>
                            )}

                            <EditIcon
                                onClick={() => {
                                    setEditingIndex(i);
                                    setEditingText(g);
                                }}
                                sx={{ color: "#14B8A6", cursor: "pointer", ml: 1 }}
                            />
                        </Box>
                    ))}
                </Stack>

                {/* ✅ INPUT FIELD FOR NEW GOAL */}
                {(inputVisible || goals.length === 0) && goals.length < 3 && (
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            autoFocus
                            placeholder="Write your goal here..."
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addGoal()}
                            InputProps={{
                                endAdornment: <EditIcon sx={{ color: "#456ebb" }} />,
                                sx: {
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    height: "40px",
                                },
                            }}
                        />
                    </Stack>
                )}

                {/* ✅ + BUTTON CENTERED */}
                {goals.length < 3 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <IconButton
                            onClick={() => setInputVisible(true)}
                            sx={{
                                backgroundColor: "#14b8a6",
                                color: "white",
                                width: "45px",
                                height: "45px",
                                "&:hover": { backgroundColor: "#0e8f81" },
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                )}

                {/* ✅ TIME PICKER */}
                <Typography sx={{ mt: 4, textAlign: "center", fontSize: "18px" }}>
                    I expect this session to take...
                </Typography>

                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
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
                    onClick={handleSave}
                    sx={{
                        backgroundColor: "#14b8a6",
                        mt: 4,
                        float: "right",
                        borderRadius: "10px",
                        px: 3,
                        "&:hover": { backgroundColor: "#0e8f81" },
                    }}
                >
                    Done
                </Button>

            </DialogContent>
        </Dialog>
    );
}





