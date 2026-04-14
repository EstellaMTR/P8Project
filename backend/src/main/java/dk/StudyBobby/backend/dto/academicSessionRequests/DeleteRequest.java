
// WE ARE NOT EVEN USING DELETE REQUEST?
// SHOULD WE DELETE DELETE REQUEST!? XD

// package is the current folder for this file
package dk.StudyBobby.backend.dto.academicSessionRequests;


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

