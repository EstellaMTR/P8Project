import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";

export default function ReflectionPopUp({ open, onClose, session, onSave }) {
    const [reflection, setReflection] = useState("");

    useEffect(() => {
        if (session?.reflection) {
            setReflection(session.reflection);
        }
    }, [session]);

    const handleSave = () => {
        onSave(session.id, reflection);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Reflection for {session?.title}</DialogTitle>

            <DialogContent>
                <TextField
                    label="Write your reflection"
                    multiline
                    minRows={4}
                    fullWidth
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>
                    Save Reflection
                </Button>
            </DialogActions>
        </Dialog>
    );
}