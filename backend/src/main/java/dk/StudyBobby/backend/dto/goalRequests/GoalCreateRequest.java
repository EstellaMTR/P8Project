package dk.StudyBobby.backend.dto.goalRequests;
import dk.StudyBobby.backend.dto.academicSessionRequests.CreateRequest;

public class GoalCreateRequest {
    private Long academicSessionId;

    private String goal;

    public Long getAcademicSessionId() {
        return academicSessionId;
    }

    public void setAcademicSessionId(Long academicSessionId){
        this.academicSessionId = academicSessionId;
    }
    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }
}