package dk.StudyBobby.backend.dto;

import java.util.List;

public class ChangeStateRequest {

    private Long academicSessionId; // we only need the session ID to be able to delete it from the database
    private Long userId;
    private SessionState state;
 
    // getters & setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

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

