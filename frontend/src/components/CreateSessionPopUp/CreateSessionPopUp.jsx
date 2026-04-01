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
    Tooltip,
    DialogActions,
    DialogContentText,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PsychologyIcon from "@mui/icons-material/Psychology";
import FlagIcon from "@mui/icons-material/Flag";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// To make sure values can change without error, we need to set up state for each input field and goal list
import { useState } from "react";

// Defines and exports a React component that takes the props open, onClose, and onCreate as its inputs
export default function CreateSessionPopUp({ open, onClose, onCreate }) {

    // Initial state for all fields - used for resetting the popup after creation or closing
    const initialState = {
        title: "",
        type: "",
        goals: [],
        hours: "00",
        minutes: "00",
    };

    // State variables for each input and section of the popup
    const [title, setTitle] = useState(initialState.title);
    const [type, setType] = useState(initialState.type);
    const [goals, setGoals] = useState(initialState.goals);
    const [inputVisible, setInputVisible] = useState(true); // Show input at 0 goals
    const [newGoal, setNewGoal] = useState("");
    const [hours, setHours] = useState(initialState.hours);
    const [minutes, setMinutes] = useState(initialState.minutes);

    // State for editing existing goals
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState("");

    // State for validation error modal
    const [errorOpen, setErrorOpen] = useState(false);

    const closeErrorModal = () => setErrorOpen(false);

    // Resets all fields and states to their initial values when the popup is closed or after a session is created
    const resetPopup = () => {
        setTitle(initialState.title);
        setType(initialState.type);
        setGoals(initialState.goals);
        setInputVisible(true);
        setNewGoal("");
        setHours(initialState.hours);
        setMinutes(initialState.minutes);
        setEditingIndex(null);
        setEditingText("");
        setErrorOpen(false);
    };

    // Handles closing the popup, ensuring that all fields are reset to their initial state
    const handleClose = () => {
        resetPopup();
        onClose();
    };

    // Validates that the user has selected a session type and added at least one goal before allowing session creation. If validation fails, it opens an error modal.
    const validateBeforeCreate = () => {
        if (type === "" || goals.length === 0) {
            setErrorOpen(true);
            return false;
        }
        return true;
    };

    // Adds a new goal to the goals list if the input is not empty, 
    // then resets the new goal input and hides it
    const addGoal = () => {
        if (newGoal.trim() === "") return;

        const updated = [...goals, newGoal];
        setGoals(updated);
        setNewGoal("");
        setInputVisible(false);
    };

    // Handles the creation of a new session. 
    // It first validates the input fields, and if validation passes, 
    // it calls the onCreate function with the new session data, resets the popup, and closes it.
    const handleCreate = () => {
        if (!validateBeforeCreate()) return;

        onCreate({
            title: title.trim(),
            type,
            goals,
            duration: { hours, minutes },
            status: "planned",
            createdAt: Date.now(),
        });

        resetPopup();
        onClose();
    };

    // When the user clicks the "+" button to add a new goal, 
    // this function checks if there's any text in the new goal input. 
    // If there is, it adds that goal to the list before showing the input field for the next goal.
    const handlePlusClick = () => {
        if (newGoal.trim() !== "") addGoal();
        setInputVisible(true);
    };

    // These two functions ensure that the hours and minutes inputs stay within valid ranges 
    // (0-24 for hours, 0-59 for minutes) and are always displayed as two digits (e.g., "01" instead of "1").
    const validateHours = (v) =>
        v < 0 ? "00" : v > 24 ? "24" : v.toString().padStart(2, "0");

    const validateMinutes = (v) =>
        v < 0 ? "00" : v > 59 ? "59" : v.toString().padStart(2, "0");


    // The JSX returned by this component defines the structure and appearance of the popup dialog, 
    // including all input fields, buttons, and their associated styles and behaviors.
    return (
        <>
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
            // The Dialog component from MUI is used to create a modal popup.
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
                    onChange={(e) => {
                        if (e.target.value.length <= 30) setTitle(e.target.value);
                    }}
                    placeholder="New Session"

                    // InputProps is used to style the TextField 
                    InputProps={{
                        sx: {
                            backgroundColor: "white",
                            borderRadius: "10px",
                            height: "45px",
                            "& input": {
                                textAlign: "center",
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: title === "" ? "#888" : "#000", // ✅ grey when empty
                            },
                        },
                    }}
                />

                // The close button in the top right corner of the popup, styled as a small circle with a white "X" icon.
                <IconButton
                    onClick={handleClose}
                    sx={{
                        color: "white",
                        backgroundColor: "#14B8A6",
                        ml: 2,
                        "&:hover": { backgroundColor: "#0E8F81" },
                        width: "32px",
                        height: "32px",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ color: "white" }}>

                // The session type selection section, 
                // which includes a title with a tooltip and a group of toggle buttons for selecting the session type.
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
                        textAlign: "center",
                    }}
                >
                    <Typography sx={{ fontSize: "18px" }}>
                        Pick a session type
                    </Typography>

                    <Tooltip title="(Add explanation text here later)" arrow>
                        <HelpOutlineIcon
                            sx={{ fontSize: 20, color: "#14B8A6", cursor: "pointer" }}
                        />
                    </Tooltip>
                </Box>

                // The ToggleButtonGroup component is used to create a group of toggle buttons for selecting the session type.
                <ToggleButtonGroup
                    value={type}
                    exclusive
                    onChange={(e, newType) => setType(newType)}
                    sx={{
                        mt: 2,
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {[
                        { value: "Lecture", icon: <MenuBookIcon /> },
                        { value: "Study", icon: <PsychologyIcon /> },
                        { value: "Writing", icon: <EditNoteIcon /> },
                    ].map((item) => (
                        <ToggleButton
                            key={item.value}
                            value={item.value}
                            sx={{
                                padding: "8px 22px",
                                minWidth: "130px",
                                backgroundColor: "white",
                                color: "#2e2e2e",
                                fontWeight: 500,
                                border: "2px solid #456ebb",

                                // To override MUI's default styles 
                                // and ensure the buttons are fully rounded with proper borders between them
                                borderRadius: "999px !important",
                                "&.MuiToggleButton-root": {
                                    borderRadius: "999px !important",
                                },
                                "&.MuiToggleButtonGroup-grouped:not(:first-of-type)": {
                                    borderRadius: "999px !important",
                                    borderLeft: "2px solid #456ebb",
                                },
                                "&.MuiToggleButtonGroup-grouped:not(:last-of-type)": {
                                    borderRadius: "999px !important",
                                    borderRight: "2px solid #456ebb",
                                },

                                // Styles for the selected state of the toggle buttons, 
                                // ensuring a distinct look when a button is selected
                                "&.Mui-selected": {
                                    backgroundColor: "#14B8A6 !important",
                                    color: "#ffffff !important",
                                    borderColor: "#14B8A6 !important",
                                },
                                "&.Mui-selected:hover": {
                                    backgroundColor: "#0E8F81 !important",
                                },

                                // Styles for the hover state of unselected buttons, 
                                // providing visual feedback when the user hovers over them
                                "&:hover": {
                                    backgroundColor: "#f3f3f3",
                                },
                            }}
                        >
                            {item.icon}&nbsp;{item.value}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>

                // The goals section, which includes a title with a tooltip, 
                a list of existing goals that can be edited, and an input field for adding new goals.
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        mt: 3,
                        textAlign: "center",
                    }}
                >
                    <Typography sx={{ fontSize: "18px" }}>
                        My goals for this session are...
                    </Typography>

                    <Tooltip title="(Add explanation text here later)" arrow>
                        <HelpOutlineIcon
                            sx={{ fontSize: 20, color: "#14B8A6", cursor: "pointer" }}
                        />
                    </Tooltip>
                </Box>
            

                // The list of existing goals, which are displayed in a stack with an edit icon next to each goal.
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
                                flexWrap: "wrap",
                                width: "100%",
                            }}
                        >
                            <FlagIcon sx={{ mr: 1, color: "#456ebb" }} />

                            // If the user is currently editing this goal, show a TextField to edit it. 
                            Otherwise, show the goal text.
                            {editingIndex === i ? (
                                <TextField
                                    autoFocus
                                    value={editingText}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 110) {
                                            setEditingText(e.target.value);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            const updated = [...goals];
                                            updated[i] = editingText;
                                            setGoals(updated);
                                            setEditingIndex(null);
                                        }
                                    }}
                                    multiline
                                    sx={{
                                        flexGrow: 1,
                                        "& .MuiInputBase-root": {
                                            backgroundColor: "#E6F0FF",
                                            borderRadius: "6px",
                                        },
                                    }}
                                />
                            ) : (
                                <Typography
                                    sx={{
                                        flexGrow: 1,
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {g}
                                </Typography>
                            )}

                            // The edit icon next to each goal, which allows the user to edit the goal when clicked.
                            <EditIcon
                                onClick={() => {
                                    setEditingIndex(i);
                                    setEditingText(g);
                                }}
                                sx={{
                                    color: "#14B8A6",
                                    cursor: "pointer",
                                    ml: 1,
                                }}
                            />
                        </Box>
                    ))}
                </Stack>

                // The input field for adding new goals, which is shown if the inputVisible state is true or if there are no goals yet, 
                and hidden if there are already 3 goals.
                {(inputVisible || goals.length === 0) && goals.length < 3 && (
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            autoFocus
                            placeholder="Write your goal here and press enter..."
                            value={newGoal}
                            onChange={(e) => {
                                if (e.target.value.length <= 110) {
                                    setNewGoal(e.target.value);
                                }
                            }}
                            onKeyDown={(e) => e.key === "Enter" && addGoal()}
                            multiline
                            InputProps={{
                                endAdornment: <FlagIcon sx={{ color: "#456ebb" }} />,
                                sx: {
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    minHeight: "40px",
                                    alignItems: "center",
                                },
                            }}
                        />
                    </Stack>
                )}

                // The "+" button for adding additional goals, which is shown if there are fewer than 3 goals.
                {goals.length < 3 && (
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                        {goals.length >= 1 && (
                            <Typography sx={{ mb: 1, fontSize: "16px" }}>
                                Add another goal
                            </Typography>
                        )}

                        <IconButton
                            onClick={handlePlusClick}
                            sx={{
                                backgroundColor: "#14B8A6",
                                color: "white",
                                width: "50px",
                                height: "50px",
                                "&:hover": { backgroundColor: "#0e8f81" },
                            }}
                        >
                            <AddIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                    </Box>
                )}


                // The session duration section, 
                which includes a title and input fields for hours and minutes, 
                as well as a "Done" button to create the session.
                <Typography
                    sx={{
                        mt: 4,
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: 500,
                    }}
                >
                    I expect this session to take...
                </Typography>

                // Labels for the hours and minutes input fields, displayed above them.
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 6,
                        mt: 2,
                        color: "#ffffff",
                    }}
                >
                    <Typography sx={{ fontSize: "16px" }}>Hours</Typography>
                    <Typography sx={{ fontSize: "16px" }}>Minutes</Typography>
                </Box>

                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    sx={{ mt: 1 }}
                >
                    // The input field for hours, which is styled to be centered and visually distinct
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

                    <Typography sx={{ fontSize: "30px", color: "white" }}>
                        :
                    </Typography>

                    // The input field for minutes, which is styled similarly to the hours input and ensures valid minute values.
                    <TextField
                        type="number"
                        value={minutes}
                        onChange={(e) =>
                            setMinutes(validateMinutes(e.target.value))
                        }
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

                // The "Done" button at the bottom of the popup, 
                which triggers the session creation process when clicked.
                <Button
                    variant="contained"
                    onClick={handleCreate}
                    sx={{
                        backgroundColor: "#14B8A6",
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

        // The error modal that is displayed if the user tries to create a session without selecting a type or adding goals.
        <Dialog
            open={errorOpen}
            onClose={closeErrorModal}
            PaperProps={{
                sx: {
                    backgroundColor: "#456ebb",
                    borderRadius: "16px",
                    padding: "20px",
                    width: "90%",
                    maxWidth: "380px",
                    textAlign: "center",
                },
            }}
        >
            <DialogContent>
                <DialogContentText
                    sx={{
                        color: "white",
                        fontSize: "17px",
                        fontWeight: 500,
                        mb: 2,
                    }}
                >
                    You have to choose a session type and set at least one goal for the session.
                </DialogContentText>

                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button
                        onClick={closeErrorModal}
                        sx={{
                            backgroundColor: "#14B8A6",
                            color: "white",
                            borderRadius: "10px",
                            px: 4,
                            "&:hover": { backgroundColor: "#0e8f81" },
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>

        </>
    );
}







