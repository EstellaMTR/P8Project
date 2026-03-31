package dk.StudyBobby.backend.dto;

import java.util.List;

public class AcademicSessionAndGoalRequest {

    private Long userId;
    private String title;
    private String sessionType;
    private int state;
    private Long duration;

    private List<GoalRequest> goals;

    // getters & setters


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }


    public List<GoalRequest> getGoals() {
        return goals;
    }

    public void setGoals(List<GoalRequest> goals) {
        this.goals = goals;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}