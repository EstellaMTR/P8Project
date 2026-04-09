package dk.StudyBobby.backend.dto.goalRequests;
import dk.StudyBobby.backend.dto.academicSessionRequests.CreateRequest;
import dk.StudyBobby.backend.entities.Goal;

import java.util.List;

public class GoalCreateRequest {
    //private Long academicSessionId;
    private List<Goal> goals;
    private String goal;

    // Getters and Setters
//    public Long getAcademicSessionId() {
//        return academicSessionId;
//    }
//    public void setAcademicSessionId(Long academicSessionId){
//        this.academicSessionId = academicSessionId;
//    }
    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }
}