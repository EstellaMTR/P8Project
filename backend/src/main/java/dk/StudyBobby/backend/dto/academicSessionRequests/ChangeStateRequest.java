// package is the current folder for this file
package dk.StudyBobby.backend.dto.academicSessionRequests;

// importing tools from our own packages
import dk.StudyBobby.backend.enums.SessionState;

// Creating class for transferring data for changing the state of existing Academic Session
public class ChangeStateRequest {
    // INSTANCE VARIABLES (the data that is needed for this DTO)
    private Long academicSessionId;
    private SessionState state;

    // METHODS - GETTERS AND SETTERS
    public Long getAcademicSessionId() {
        return academicSessionId;
    }

    public void setAcademicSessionId(Long academicSessionId) {
        this.academicSessionId = academicSessionId;
    } 

    public SessionState getSessionState() {
        return state;
    }

    public void setSessionState(SessionState state) {
        this.state = state;
    }
}

