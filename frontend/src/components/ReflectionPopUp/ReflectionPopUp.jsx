/* Importing pre-buildt React components */
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box, Stack, Rating, IconButton, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
/* Importing React hooks, useState stores values, that can change over time
and useEffect runs code, when something changes e. g. when a session loads */
import { useState, useEffect } from "react";

/* Reflection questions for the user to answer after a study session - here saved as objects */
const ReflectionQuestions = {
    rating: "To what extent did I meet the goal I set for this study session?",
    q1: "What made the task easier or more difficult than expected?",
    q2: "What should I change in my approach next time to improve my learning?",
};

const sentimentIcons = {
    1: <SentimentVeryDissatisfiedIcon />,
    2: <SentimentDissatisfiedIcon />,
    3: <SentimentNeutralIcon />,
    4: <SentimentSatisfiedIcon />,
    5: <SentimentVerySatisfiedIcon />,
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{sentimentIcons[value]}</span>;
}

export default function ReflectionPopUp({ open, onClose, session, onSave }) {

    /* If there is no session or if the session does not have goals, return null (do not render anything) */
    if (!session || !session.goals) {
        return null;
    }

    /* State variables to manage the current step of the reflection process, the index of the current goal being reflected on, and the reflections themselves (which include the goal, rating, and answers to the questions) 
    The first const represents which step of the reflection process we are in (which page of the wizard the user is on) */
    const [step, setStep] = useState(0);
    /* The second const represents which goal the user is currently reflecting on (if there are multiple goals) */
    const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
    /* The third const is an array of reflections, where each reflection corresponds to a goal and contains the user's rating and answers to the reflection questions for that goal */
    const [reflections, setReflections] = useState([]);

    /* useEffect hook to initialize the reflections state when the session data is loaded or updated. 
    It checks if the session has goals and then maps over those goals to create an initial reflections array, 
    where each reflection object contains the goal, a null rating, and empty answers for the questions. 
    This ensures that the reflection process is set up correctly based on the goals of the session. 
    The dependency array [session] means that this effect will run whenever the session prop changes 
    (e.g., when a new session is loaded) */
    useEffect(() => {
        if (session?.goals) {
            setReflections(
                session.goals.map(goal => ({
                    goal,
                    rating: null,
                    answers: {
                        q1: "",
                        q2: "",
                    },
                }))
            );
            }
        }, [session]);

    /* This variable holds the reflection data for the current goal being reflected on, based on the currentGoalIndex. 
    If there are reflections available, it retrieves the reflection corresponding to the current goal index; otherwise, it sets it to null. 
    This allows the component to display and update the reflection information for the specific goal that the user is currently working on. */
    const currentReflection =
        reflections.length > 0
            ? reflections[currentGoalIndex]
            : null;

    /* This function is used to update the reflection data for a specific goal. 
    It takes in the index of the reflection to update and an object containing the updated fields (e.g., rating or answers). 
    The function uses the setReflections state updater to create a new reflections array, 
    where it maps over the existing reflections and updates the one at the specified index with the new fields, while keeping the other reflections unchanged. 
    This allows for efficient updates to the reflection data as the user interacts with the form. */
    const updateReflection = (index, updatedFields) => {
        setReflections(prev =>
            prev.map((r,i) => 
                i === index ? { ...r, ...updatedFields } : r
            )
        );
    };

    /* This variable checks if the reflection for the current goal is complete, meaning that the user has provided a rating and answered both reflection questions. 
    It checks if the currentReflection is not null, if the rating is not null, and if both answers (q1 and q2) are not empty (after trimming whitespace). 
    This is used to determine whether the user can proceed to the next goal or finish the reflection process, 
    ensuring that all necessary information has been provided for the current goal before allowing further actions. */
    const isCurrentGoalComplete =
        currentReflection !== null &&
        currentReflection.rating !== null &&
        currentReflection.answers.q1.trim() !== "" &&
        currentReflection.answers.q2.trim() !== "";

    /* This variable checks if all reflections are complete, meaning that the user has provided ratings and answers for all goals. 
    It checks if there are reflections available and if every reflection in the array has a non-null rating and non-empty answers for both questions. 
    This is used to determine whether the user can finish the reflection process, ensuring that all necessary information has been provided for each goal. */
    const isAllComplete = 
        reflections.length > 0 &&
        reflections.every(
            r =>
                r.rating !== null &&
                r.answers.q1.trim() !== "" &&
                r.answers.q2.trim() !== ""
    );

    /* This function handles the action when the user clicks the "Next Goal" button. 
    It first checks if the current goal's reflection is complete using the isCurrentGoalComplete variable. 
    If it is not complete, it returns early and does nothing. 
    If it is complete and there are more goals to reflect on (i.e., currentGoalIndex is less than the last index of the goals array), 
    it increments the currentGoalIndex by 1, allowing the user to move to the next goal's reflection. */
    const handleNext = () => {
        if (!isCurrentGoalComplete) return;
        if (currentGoalIndex < session.goals.length - 1) {
            setCurrentGoalIndex((i) => i + 1);
        }
    };

    /* This function handles the action when the user clicks the "Previous" button. 
    It checks if the currentGoalIndex is greater than 0, which means there are previous goals to go back to. 
    If so, it decrements the currentGoalIndex by 1, allowing the user to return to the previous goal's reflection. 
    This provides navigation functionality for the user to review and edit their reflections on previous goals. */
    const handlePrevious = () => {
        if (currentGoalIndex > 0) {
            setCurrentGoalIndex((i) => i - 1);
        }
    };

    /* This function handles the action when the user clicks the "Finish reflection" button. 
    It first checks if all reflections are complete using the isAllComplete variable. 
    If not all reflections are complete, it returns early and does nothing. 
    If all reflections are complete, it calls the onSave function (passed in as a prop) 
    with an object that includes the original session data along with the updated reflections. 
    After saving, it calls the onClose function to close the reflection pop-up. 
    This function ensures that the user's reflections are saved properly before closing the dialog, 
    and it prevents closing the dialog if there are incomplete reflections. */
    const handleFinish = () => {
        if (!isAllComplete) return;

        onSave({
            ...session,
            reflections,
        });
        onClose();    
        };
    
    const durationHours = session.duration.hours ?? 0;
    const durationMinutes = session.duration.minutes ?? 0;
    
    return (
        <>
            {/* 
            The onClose is set to an empty function to prevent the dialog 
            from closing when the user clicks outside of it or presses escape. 
            This ensures the user must complete the reflection or explicitly 
            click a button to close it.
        */}

        <Dialog
            open={open}
            onClose={() => {}}
            disableEscapeKeyDown
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    backgroundColor: "#456ebb",
                    borderRadius: "20px",
                    color: "white",
                    padding: 2,
                },
            }}
        >
            <DialogTitle
                sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center" 
                }}
            >
                <Typography component= "span" variant="h6">
                    Reflection
                </Typography>
                <IconButton disabled>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {/* If the user is on the first step of the reflection process (step === 0), it displays an overview of the session, including the title, type, goals, and estimated duration. 
                It uses Material-UI components to structure and style the content, such as Stack for spacing, Typography for text, and Box for styling the goals and duration. 
                This provides the user with a clear summary of their study session before they begin reflecting on each goal. */}
                {step === 0 && (
                    <Stack spacing={3}
                    alignItems="center"
                    textAlign="center">
                        <Typography variant="subtitle1">
                            {session.title} - {session.type}
                        </Typography>

                        <Typography>
                            Your goals for this session were:   
                        </Typography>

                        {session.goals.map((goal, i) => (
                            <Box 
                                key={i} 
                                sx={{ 
                                    p: 1,
                                    borderRadius: "999px",
                                    backgroundColor: "white",
                                    color: "#456ebb",
                                    px: 2,
                                    py: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    minWidth: "80%",
                                    justifyContent: "center",
                                }}
                        >
                                {goal}
                            </Box>
                        ))}

                        <Typography sx={{ mt: 2 }}>
                            You estimated this session to take:
                        </Typography>

                        <Box
                            sx={{
                                p: 1,
                                borderRadius: 1,
                                backgroundColor: "#f5f5f5",
                                width: "fit-content",
                            }}
                        >
                            {session.duration.hours} hours and{" "}
                            {session.duration.minutes} minutes
                        </Box>
                    </Stack>
                )}
            {/* If the user is on the second step of the reflection process (step === 1) and there is a current reflection available, it displays the reflection form for the current goal. 
                This includes the goal being reflected on, the rating question with a Rating component for user input, and two TextField components for the user to answer the reflection questions. */}
            {step === 1 && currentReflection && (
                <Stack spacing={3}
                alignItems="center"
                textAlign="center">
                    <Typography variant="subtitle1">
                        Reflection for goal
                    </Typography>

                    <Box
                        sx={{
                            p: 1,
                            borderRadius: "999px",
                            backgroundColor: "white",
                            color: "#456ebb",
                            width: "fit-content",
                            px: 2,
                            py: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                    }}
             >
                    <FlagIcon />
                     {session.goals[currentGoalIndex]}
                </Box>
                
                <Typography>
                    {ReflectionQuestions.rating}
                </Typography>

                <Rating
                    value={currentReflection.rating}
                    onChange={(e, newValue) =>
                        updateReflection(currentGoalIndex, {
                            rating: newValue,
                    })
                    }
                    max={5}
                    IconContainerComponent={IconContainer}
                    sx= {{ color: "white" }}
                    highlightSelectedOnly
                />

                <TextField
                    label={ReflectionQuestions.q1}
                    multiline
                    minRows={3}
                    value={currentReflection.answers.q1}
                    onChange={(e) =>
                        updateReflection(currentGoalIndex, {
                            answers: {
                                ...currentReflection.answers,
                                q1: e.target.value,
                            },
                        })
                    }
                    fullWidth
                />

                <TextField
                    label={ReflectionQuestions.q2}
                    multiline
                    minRows={3}
                    value={currentReflection.answers.q2}
                    onChange={(e) =>
                        updateReflection(currentGoalIndex, {
                            answers: {
                                ...currentReflection.answers,
                                q2: e.target.value,
                            },
                        })
                    }
                    fullWidth            
                />  
                </Stack>
            )}

            </DialogContent>

            <DialogActions
                sx={{
                    justifyContent: "center",
                    gap: 2,
                    paddingBottom: 2,
                }}
                >
                {step === 1 && (
                    <Button
                        onClick={handlePrevious}
                        disabled={currentGoalIndex === 0}
                    >
                        Previous
                    </Button>
                )}
                
                {step === 0 && (
                    <Button
                        variant="contained"
                        onClick={() => setStep(1)}
                        disabled={reflections.length === 0}
                    >
                        Start Reflection
                    </Button>
                )}
                
                {step === 1 &&
                    currentGoalIndex < session.goals.length - 1 && (
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            disabled={!isCurrentGoalComplete}
                        >
                            Next Goal
                        </Button>
                    )}

                {step === 1 &&
                    currentGoalIndex === session.goals.length - 1 && (
                        <Button
                            variant="contained"
                            onClick={handleFinish}
                            disabled={!isAllComplete}
                            sx= {{
                                backgroundColor: "#14B8A6",
                                color: "white",
                                borderRadius: "999px",
                                px: 3,
                            }}
                        >
                            Finish reflection
                        </Button>
                    )}
            </DialogActions>
        </Dialog>
    </>
);
}