package dk.StudyBobby.backend.dto.academicSessionRequests;

import java.util.List;

public class DeleteRequest {

    private Long academicSessionId; // we only need the session ID to be able to delete it from the database
    private Long userId;
 
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
}

