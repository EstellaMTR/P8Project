import { useEffect, useState } from "react";
import { Button, Box, Typography, Paper, Card, CardActions, CardContent, List } from "@mui/material";
import CreateSessionPopUp from "../components/CreateSessionPopUp/CreateSessionPopUp.jsx"; //this is our popup component
import SessionCard from "../components/SessionCard/SessionCard.jsx"; //this is our session card component
import { HamburgerMenu } from "../components/HamburgerMenu/HamburgerMenu.jsx";
import AcademicSessionCard from "../components/Cards/academicSessionCard.jsx";
// import {UserControllerApi} from "../api/src/api/UserControllerApi.js"
import {CreateRequest, UserControllerApi} from "../api/src/index.js"
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

    const [editingSession, setEditingSession] = useState(false);

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

                // Delete
            const handleDelete = (id) => {
                setSessions(prev => prev.filter(s => s.id !== id));
            };

            // Finish
            const handleFinish = (id) => {
                setSessions(prev =>
                prev.map(s =>
                    s.id === id ? { ...s, completed: true } : s
                )
                );
            };

            // Edit
            const handleEdit = (session) => {
                setEditingSession(session);
                setOpen(true);
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
            onCreate={handleSave}
            session={editingSession}
            />

            <List>
                {sessions.map((session) => (
                    // <AcademicSessionCard key={session.id} session={session} />
                     <Paper key={session.id} sx={{ p: 2, mt: 2 }}>
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
            </>
        }>
        </BackgroundBox>
        
        <BackgroundBox cardContent={
            <>
            <Typography variant="h4" >Ready for Reflection</Typography>
            <List>
                {sessions.map((session) => (
                    <AcademicSessionCard key={session.id} session={session} />
                ))}
            </List>
            </>
        }>
        </BackgroundBox>
    </Box>

    </>
}


