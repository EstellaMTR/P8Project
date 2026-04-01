package dk.StudyBobby.backend.dto.academicSessionRequests;

import dk.StudyBobby.backend.enums.SessionState;
import dk.StudyBobby.backend.enums.SessionType;
import dk.StudyBobby.backend.dto.goalRequests.GoalCreateRequest;

import java.util.List;

public class CreateRequest {

    private Long userId;
    private String title;
    private SessionType sessionType;
    private SessionState state;
    private Long duration;

    private List<GoalCreateRequest> goals;

    // getters & setters


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public SessionType getSessionType() {
        return sessionType;
    }

    public void setSessionType(SessionType sessionType) {
        this.sessionType = sessionType;
    }

    public SessionState getState() {
        return state;
    }

    public void setState(SessionState state) {
        this.state = state;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }


    public List<GoalCreateRequest> getGoals() {
        return goals;
    }

    public void setGoals(List<GoalCreateRequest> goals) {
        this.goals = goals;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}