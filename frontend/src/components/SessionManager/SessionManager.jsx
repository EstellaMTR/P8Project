import { useState } from "react";
import SessionCard from "../SessionCard/SessionCard.jsx"; 
import CreateSessionPopUp from "../CreateSessionPopUp/CreateSessionPopUp.jsx";


export default function SessionManager() {
    const [sessions, setSessions] = useState([]);
    const [editingSession, setEditingSession] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [reflectionOpen, setReflectionOpen] = useState(false);
    const [reflectionSession, setReflectionSession] = useState(null);
    
    // Open popup for creating a new session
    const handleCreateNew = () => {
        setEditingSession(null);      // no session = create mode
        setIsPopupOpen(true);
    };

    // Open popup for editing an existing session
    const handleEdit = (session) => {
        setEditingSession(session);   // pass session to popup
        setIsPopupOpen(true);
    };

    // Save (both create + update)
    const handleSave = (sessionData) => {
        if (editingSession) {
            // Update existing session
            setSessions(prev =>
                prev.map(s => s.id === sessionData.id ? sessionData : s)
            );
        } else {
            // Create new session
            setSessions(prev => [
                ...prev,
                { ...sessionData, id: crypto.randomUUID() }
            ]);
        }

        setEditingSession(null);
        setIsPopupOpen(false);
    };

    // Delete a session
    const handleDelete = (id) => {
        setSessions(prev => prev.filter(s => s.id !== id));
    };

    // Mark session as finished
    const handleFinish = (id) => {
        setSessions(prev =>
            prev.map(s =>
                s.id === id ? { ...s, completed: true } : s
            )
        );
    };

    const handleStartReflection = (session) => {
        setReflectionSession(session);
        setReflectionOpen(true);
    
    };

    const handleSaveReflection = (updatedSession) => {
        setSessions(prev =>
            prev.map(s =>
                s.id === updatedSession.id 
                ? {
                    ...s,
                    reflections: updatedSession.reflections,
                    reflected: true,
                    completed: true
                }   
                : s
            )
        );
        setReflectionOpen(false);
        setReflectionSession(null);
    };

    return (
        <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>

            {/* Popup */}
            <CreateSessionPopUp
                open={isPopupOpen}
                onClose={() => {
                    setIsPopupOpen(false);
                    setEditingSession(null);
                }}
                onCreate={handleSave}
                session={editingSession}   // null = create mode
            />

            {/* Button to create new session */}
            <button
                onClick={handleCreateNew}
                style={{
                    margin: "20px 0",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    background: "#14B8A6",
                    color: "white",
                    border: "none",
                    fontSize: "16px",
                    cursor: "pointer"
                }}
            >
                + New Session
            </button>

            {/* Render all sessions */}
            {sessions.map((session) => (
                <SessionCard
                    key={session.id}
                    session={session}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onFinish={handleFinish}
                    onStartReflection={handleStartReflection}
                />
            ))}
        </div>
    );
}