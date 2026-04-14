package dk.StudyBobby.backend.dto.reflectionAnswerRequests;

public class ReflectionAnswerCreateRequest {
    private Long goalId;
    private String reflectionAnswer1;
    private String reflectionAnswer2;
    private String reflectionAnswer3;


    public Long getGoalId() {
        return goalId;
    }

    public void setGoalId(Long goalId) {
        this.goalId = goalId;
    }

    public String getReflectionAnswer1() {
        return reflectionAnswer1;
    }

    public void setReflectionAnswer1(String reflectionAnswer1) {
        this.reflectionAnswer1 = reflectionAnswer1;
    }

    public String getReflectionAnswer2() {
        return reflectionAnswer2;
    }

    public void setReflectionAnswer2(String reflectionAnswer2) {
        this.reflectionAnswer2 = reflectionAnswer2;
    }

    public String getReflectionAnswer3() {
        return reflectionAnswer3;
    }

    public void setReflectionAnswer3(String reflectionAnswer3) {
        this.reflectionAnswer3 = reflectionAnswer3;
    }
}
