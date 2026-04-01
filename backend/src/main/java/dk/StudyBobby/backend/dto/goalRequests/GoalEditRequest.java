package dk.StudyBobby.backend.dto.goalRequests;

import dk.StudyBobby.backend.entities.AcademicSession;

public class GoalEditRequest {
    private Long academicSessionId;

    private Long goalId;

    private String goal;

    public Long getAcademicSessionId() {
        return academicSessionId;
    }
    public void setAcademicSessionId(Long academicSessionId){
        this.academicSessionId = academicSessionId;
    }
    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public Long getGoalId() {
        return goalId;
    }
    public void setGoalId(Long goalId) {
        this.goalId = goalId;
    }


}
