import { useEffect, useState } from "react";
import { Button, Box, Typography, Paper, Card, CardActions, CardContent, List } from "@mui/material";
import CreateSessionPopUp from "../components/CreateSessionPopUp/CreateSessionPopUp.jsx"; //this is our popup component
import SessionCard from "../components/SessionCard/SessionCard.jsx"; //this is our session card component
import { HamburgerMenu } from "../components/HamburgerMenu/HamburgerMenu.jsx";
import AcademicSessionCard from "../components/Cards/academicSessionCard.jsx";
// import {UserControllerApi} from "../api/src/api/UserControllerApi.js"
import {ChangeStateRequest, CreateRequest, EditRequest, UserControllerApi} from "../api/src/index.js"
import {AcademicSessionControllerApi} from "../api/src/index.js"
import BackgroundBox from "../components/Cards/BackgroundBox.jsx";


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


export default function Homepage() {
    const userId = 1;
    
    const [name, setName] = useState("");

    const [sessions, setSessions] = useState([]);

    const [editingSession, setEditingSession] = useState(null);

    const [open, setOpen] = useState(false);

    const handleSave = (session) => { 
        const createRequest = new CreateRequest()

        createRequest.title = session.title

        createRequest.userId = userId

        createRequest.goals = session.goals

        createRequest.sessionType = session.sessionType 

        createRequest.duration = session.duration

        createRequest.state = "CREATED"

        
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
            new AcademicSessionControllerApi().callDelete(id,(error, data, response) => {
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

       

        const handleStartReflection = (session) => {
            setReflectionSession(session);
            setReflectionOpen(true);
        };

        const handleSaveReflection = (id, reflectionText) => {
            setSessions(prev =>
                prev.map(s =>
                    s.id === id ? { ...s, reflection: reflectionText } : s
                )
            );
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
    },[])

    useEffect(() => {
        new AcademicSessionControllerApi().getByUserId2(userId, (error, data, response) => {
        if (error) {
            console.error(error);
        } else {
            //for (let i = 0; i < data)
            setSessions(data)
            console.log('API called successfully. Returned sessions: ' + JSON.stringify(data));
        }
        });
    },[])

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

    <h1> Hello {name}</h1>

    <Box sx={{
        display: "flex",
        gap: 20,
        justifyContent: "center",
    }}>
        <BackgroundBox cardContent={
            <>
            <Typography variant="h4" >Planned Sessions</Typography>
            {/* Create button */}
            <button
                onClick={() => {
                setEditingSession(null);
                setOpen(true);
                }}
                style={{
                padding: "10px 16px",
                borderRadius: "10px",
                background: "#14B8A6",
                color: "white",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                marginBottom: "20px"
                }}
            >
                + New Session
            </button>
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

            <List>
                {sessions.filter(session => session.state === "CREATED").map((session) => (
                    // <AcademicSessionCard key={session.id} session={session} />
                     <Paper key={session.id} sx={{ p: 2, mt: 2 }}>
                            <SessionCard
                              session={session}
                              onEdit={handleEdit}
                              onDelete={handleDelete}
                              onFinish={changeState}
                              onStartReflection={handleStartReflection}
                            />
                            </Paper>
                ))}
            </List>
            </>
        }>
        </BackgroundBox>
        
        <BackgroundBox cardContent={
            <>
            <Typography variant="h4" >Ready for Reflection</Typography>
            <List>
                 {sessions.filter(session => session.state === "PENDING_REFLECTION").map((session) => (
                    // <AcademicSessionCard key={session.id} session={session} />
                     <Paper key={session.id} sx={{ p: 2, mt: 2 }}>
                            <SessionCard
                              session={session}
                              onEdit={handleEdit}
                              onDelete={handleDelete}
                              onFinish={changeState}
                              onStartReflection={handleStartReflection}
                            />
                            </Paper>
                ))}
            </List>
            </>
        }>
        </BackgroundBox>
    </Box>

    </>
}


