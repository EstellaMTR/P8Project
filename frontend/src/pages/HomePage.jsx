import { useEffect, useState } from "react";
import { Button, Box, Typography, Paper, Card, CardActions, CardContent } from "@mui/material";
import CreateSessionPopUp from "../components/CreateSessionPopUp/CreateSessionPopUp.jsx"; //this is our popup component
import SessionCard from "../components/SessionCard/SessionCard.jsx"; //this is our session card component
import { HamburgerMenu } from "../components/HamburgerMenu/HamburgerMenu.jsx";
import AdacemicSessionCard from "../components/Cards/academicSessionCard.jsx";
// import {UserControllerApi} from "../api/src/api/UserControllerApi.js"
import {UserControllerApi} from "../api/src/index.js"
import {AcademicSessionControllerApi} from "../api/src/index.js"


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

    <Card>
        <h1>Planned Sessions</h1>
        <ul>
            {sessions.map((session) => (
                <AdacemicSessionCard key={session.id} session={session} />
            ))}
        </ul>

    </Card>
    
    

    </>
}

//Testing
