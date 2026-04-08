// package is the current folder for this file
package dk.StudyBobby.backend.dto.academicSessionRequests;

// importing tools from our own packages
import dk.StudyBobby.backend.dto.goalRequests.GoalCreateRequest;
import dk.StudyBobby.backend.enums.SessionState;
import dk.StudyBobby.backend.enums.SessionType;

// importing tools from pre-existing packages
import java.util.List;

// Creating class for transferring data for editing existing Academic Session
public class EditRequest {
    // INSTANCE VARIABLES (the data that is needed for this DTO)
    private Long academicSessionId;
    private Long userId;
    private String title;
    private SessionType sessionType;
    private SessionState state;
    private Long duration;

    // Also part of instance variables
    // but is a list of goals of other DTO class GoalCreateRequest
    private List<GoalCreateRequest> goals;

    // METHODS - GETTERS AND SETTERS
    // get the current Academic Session's ID
    public Long getAcademicSessionId() {
        return academicSessionId;
    }

    // set the current Academic Session's ID
    public void setAcademicSessionId(Long academicSessionId) {
        this.academicSessionId = academicSessionId;
    }

    // get the current title of Academic Session
    public String getTitle() {
        return title;
    }

    // set the title of Academic Session
    public void setTitle(String title) {
        this.title = title;
    }

    // get the session type of Academic Session
    // Datatype "SessionType" can be found in enums folder
    public SessionType getSessionType() {
        return sessionType;
    }

    // set the session type of Academic Session
    public void setSessionType(SessionType sessionType) {
        this.sessionType = sessionType;
    }

    // get the session state of Academic Session
    // Datatype "SessionState" can be found in enums folder
    public SessionState getState() {
        return state;
    }

    // set the session state of Academic Session
    public void setState(SessionState state) {
        this.state = state;
    }

    // get the expected duration of Academic Session
    public Long getDuration() {
        return duration;
    }

    // set the expected duration of Academic Session
    public void setDuration(Long duration) {
        this.duration = duration;
    }

    // get the list of goals for Academic Session
    public List<GoalCreateRequest> getGoals() {
        return goals;
    }

    // set the list of goals for Academic Session
    public void setGoals(List<GoalCreateRequest> goals) {
        this.goals = goals;
    }

    // get the User's ID for Academic Session
    public Long getUserId() {
        return userId;
    }

    // set the User's ID for Academic Session
    public void setUserId(Long userId) {
        this.userId = userId;
    }

}