import { useEffect, useState } from "react";
import { Button, Box, Typography, Paper, Card, CardActions, CardContent, List } from "@mui/material";
import CreateSessionPopUp from "../components/CreateSessionPopUp/CreateSessionPopUp.jsx"; //this is our popup component
import ReflectionPopUp from "../components/ReflectionPopUp/ReflectionPopUp.jsx";
import SessionCard from "../components/SessionCard/SessionCard.jsx"; //this is our session card component
import { HamburgerMenu } from "../components/HamburgerMenu/HamburgerMenu.jsx";
import AcademicSessionCard from "../components/Cards/academicSessionCard.jsx";
// import {UserControllerApi} from "../api/src/api/UserControllerApi.js"
import { ChangeStateRequest, CreateRequest, EditRequest, UserControllerApi } from "../api/src/index.js"
import { AcademicSessionControllerApi } from "../api/src/index.js"
import BackgroundBox from "../components/Cards/BackgroundBox.jsx";
import { ReflectionAnswerControllerApi, ReflectionAnswerCreateRequest } from "../api/src/index.js";


// HOW TO TALK TO THE SERVER AND GET THINGS FROM IT
// useEffect(() => {
//     new UserControllerApi().getAll((error, data, response) => {
//     if (error) {
//     console.error(error);
//     } else {
//     console.log('API called successfully. Returned data: ' + data[0].id);
//     }
//     });
// },[]);

// JSON.stringify


export default function Homepage({ user }) {
    const userId = user.id;

    const [name, setName] = useState("");

    const [sessions, setSessions] = useState([]);

    const [editingSession, setEditingSession] = useState(null);

    const [open, setOpen] = useState(false);

    const [reflectionOpen, setReflectionOpen] = useState(false);

    const [reflectionSession, setReflectionSession] = useState(null);



    const handleSave = (session) => {
        const createRequest = new CreateRequest()

        createRequest.title = session.title

        createRequest.userId = userId

        createRequest.goals = session.goals

        createRequest.sessionType = session.sessionType

        createRequest.duration = session.duration

        createRequest.state = "CREATED"

        console.log("Session received from popup:", JSON.stringify(session));
        new AcademicSessionControllerApi().create2(createRequest, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                //for (let i = 0; i < data)
                setSessions(prev => [...prev, data]);
                console.log('API called successfully. Saved session data: ' + JSON.stringify(data));
            }
        });
    }

    // Edit
    const handleEdit = (session) => {
        console.log("Editing session with id: " + session.id);
        console.log(JSON.stringify(session));
        setEditingSession(session);
        setOpen(true);
        return;
    }

    const handleEditSave = (session) => {
        const editRequest = new EditRequest();
        editRequest.userId = userId;
        editRequest.academicSessionId = session.id;
        editRequest.title = session.title;
        editRequest.goals = session.goals;
        editRequest.sessionType = session.sessionType;
        editRequest.duration = session.duration;
        editRequest.state = session.state;

        new AcademicSessionControllerApi().edit1(editRequest, (error, data, response) => {
            if (error) {
                console.log(JSON.stringify(data));
                console.error(error);
            } else {
                setSessions(prev =>
                    prev.map(s =>
                        s.id === session.id ? data : s
                    )
                );
                console.log('API called successfully. Edited session data: ' + JSON.stringify(data));
            }
            // setEditingSession(session);
            // setOpen(true);
        });
    }

    // Delete
    const handleDelete = (id) => {
        new AcademicSessionControllerApi().callDelete(id, (error, data, response) => {
            if (error) {
                console.error(error);
            }
            else {
                console.log("Academic Session was deleted succesfully!")
                setSessions(prev => prev.filter(s => s.id !== id));
            }
        }

        )
    };

    // Change State
    const changeState = (id) => {
        const changeStateRequest = new ChangeStateRequest();
        changeStateRequest.academicSessionId = id;

        new AcademicSessionControllerApi().edit2(changeStateRequest, (error, data, response) => {
            if (error) {
                console.log(JSON.stringify(data));
                console.error(error);
            } else {
                console.log("Changed state to: " + data.state);
                setSessions(prev =>
                    prev.map(s =>
                        s.id === id ? data : s
                    )
                );
            }
        })
    };

    const handleFinish = (session) => {
        changeState(session.id);
        setReflectionSession(session);
        setReflectionOpen(true);
    }


    const handleStartReflection = (session) => {
        changeState(session.id)
        setReflectionSession(session);
        setReflectionOpen(true);
    };

    const handleSaveReflection = (sessionWithReflections) => {

        const { reflections } = sessionWithReflections;

        reflections.forEach((reflection) => {
            const request = new ReflectionAnswerCreateRequest();
            request.goalId = reflection.goal.id;
            request.reflectionAnswer1 = reflection.answers.q1;
            request.reflectionAnswer2 = reflection.answers.q2;
            request.reflectionAnswer3 = String(reflection.rating);

            new ReflectionAnswerControllerApi().create1(request, (error, data, response) => {
                if (error) {
                    console.error("Failed to save reflection:", error);
                } else {
                    console.log("Reflection saved:", JSON.stringify(data));
                }
            });
        });
    };




    useEffect(() => {
        new UserControllerApi().getUserById(userId, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                setName(data.name)
                console.log('API called successfully. Returned name: ' + data.name);
            }
        });
    }, [])

    useEffect(() => {
        new AcademicSessionControllerApi().getByUserId2(userId, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                //for (let i = 0; i < data)
                setSessions(data)
                console.log('API called successfully. Returned sessions: ' + JSON.stringify(data));
                console.log("Full raw session:", JSON.stringify(data[0]));
            }
        });
    }, [])

    //     useEffect(() => {
    //     new AcademicSessionControllerApi().getBy(userId, (error, data, response) => {
    //     if (error) {
    //         console.error(error);
    //     } else {
    //         //for (let i = 0; i < data)
    //         setSessions(data)
    //         console.log('API called successfully. Returned sessions: ' + JSON.stringify(data));
    //     }
    //     });
    // },[])








    return <>

        <HamburgerMenu />

        <Box sx={{ display: "flex", justifyContent: "center", m: 2, }}>
            <h1> Hello {name}!</h1>
        </Box>

        <Box sx={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
        }}>
            <BackgroundBox
                header={
                    <>
                        <Typography variant="h4">Planned Sessions</Typography>

                        {/* Create button */}
                        <Button
                            onClick={() => {
                                setEditingSession(null);
                                setOpen(true);
                            }}
                            sx={{
                                padding: "12px",
                                borderRadius: "12px",
                                bgcolor: "#14B8A6",
                                color: "white",
                                fontSize: "16px",
                                padding: 1,
                                textTransform: "none",
                                marginBottom: "0px",
                                marginTop: "20px",
                                px: 1.5,
                                boxShadow: "0px 2px 4px rgba(0,0,0,0.15)",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    bgcolor: "#14B8A6",
                                    boxShadow: "0px 4px 8px rgba(0,0,0,0.25)",
                                }
                            }}
                        >
                            + New Session
                        </Button>

                        {/* Popup */}
                        <CreateSessionPopUp
                            open={open}
                            onClose={() => {
                                setOpen(false);
                                setEditingSession(null);
                            }}
                            onEdit={handleEditSave}
                            onCreate={handleSave}
                            session={editingSession}
                        />
                    </>
                }
            >
                <List>
                    {sessions.filter(session => session.state === "CREATED").map((session) => (
                        // <AcademicSessionCard key={session.id} session={session} />
                        <Paper key={session.id} sx={{ borderRadius: "16px", mt: 2, textAlign: "left", ml: 1, }}>
                            <SessionCard
                                session={session}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onFinish={handleFinish}
                                onStartReflection={handleStartReflection}
                            />
                        </Paper>
                    ))}
                </List>
            </BackgroundBox>

            <BackgroundBox
                header={
                    <>
                        <Typography variant="h4">Finished Sessions</Typography>

                        <ReflectionPopUp
                            open={reflectionOpen}
                            onClose={() => setReflectionOpen(false)}
                            session={reflectionSession}
                            onSave={handleSaveReflection}
                        />
                    </>
                }
            >
                <List>
                    {sessions.filter(session => session.state === "PENDING_REFLECTION" || session.state === "ARCHIVED").map((session) => (
                        // <AcademicSessionCard key={session.id} session={session} />
                        <Paper key={session.id} sx={{ borderRadius: "16px", textAlign: "left", mt: 2, ml: 1, }}>
                            <SessionCard
                                session={session}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onFinish={handleFinish}
                                onStartReflection={handleStartReflection}
                            />
                        </Paper>
                    ))}
                </List>
            </BackgroundBox>
        </Box>
    </>
}