import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box, Stack, Rating, IconButton, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

const ReflectionQuestions = {
    rating: "To what extent did I meet the goal I set for this study session?",
    q1: "What made the task easier or more difficult than expected?",
    q2: "What should I change in my approach next time to improve my learning?",
};

export default function ReflectionPopUp({ open, onClose, session, onSave }) {

    if (!session || !session.goals) {
        return null;
    }

    const [step, setStep] = useState(0);
    const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
    const [reflections, setReflections] = useState([]);

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

    const currentReflection =
        reflections.length > 0
            ? reflections[currentGoalIndex]
            : null;

    const updateReflection = (index, updatedFields) => {
        setReflections(prev =>
            prev.map((r,i) => 
                i === index ? { ...r, ...updatedFields } : r
            )
        );
    };


    const isCurrentGoalComplete =
        currentReflection !== null &&
        currentReflection.rating !== null &&
        currentReflection.answers.q1.trim() !== "" &&
        currentReflection.answers.q2.trim() !== "";

    const isAllComplete = 
        reflections.length > 0 &&
        reflections.every(
            r =>
                r.rating !== null &&
                r.answers.q1.trim() !== "" &&
                r.answers.q2.trim() !== ""
    );

    const handleNext = () => {
        if (!isCurrentGoalComplete) return;
        if (currentGoalIndex < session.goals.length - 1) {
            setCurrentGoalIndex((i) => i + 1);
        }
    };

    const handlePrevious = () => {
        if (currentGoalIndex > 0) {
            setCurrentGoalIndex((i) => i - 1);
        }
    };

    const handleFinish = () => {
        if (!isAllComplete) return;

        onSave({
            ...session,
            reflections,
        });
        onClose();    
        };
    
    return (
        <Dialog
            open={open}
            onClose={() => {}}
            disableEscapeKeyDown
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle
                sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center" 
                }}
            >
                <Typography variant="h6">Reflection</Typography>
                <IconButton disabled>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {step === 0 && (
                    <Stack spacing={2}>
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
                                    borderRadius: 1,
                                    backgroundColor: "#f5f5f5",
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
            
            {step === 1 && currentReflection && (
                <Stack spacing={3}>
                    <Typography variant="subtitle1">
                        Reflection for goal
                    </Typography>

                    <Box
                        sx={{
                            p: 1,
                            borderRadius: 1,
                            backgroundColor: "#f5f5f5",
                    }}
             >
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

            <DialogActions>
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
                        >
                            Finish reflection
                        </Button>
                    )}
            </DialogActions>
        </Dialog>
    );
}
                        

                    

