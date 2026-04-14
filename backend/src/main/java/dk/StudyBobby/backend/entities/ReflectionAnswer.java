package dk.StudyBobby.backend.entities;

import jakarta.persistence.*;

@Entity // An entity is the same as a table in the database, and each instance of this class will be a row in that table.
public class ReflectionAnswer {
    // Every time we see "@something", think of it as magic that tells the framework to do something special with this field or class. 
    // In this case, "@Entity" tells Spring that this class should be stored in the database as a table.
    @Id
    private Long goalId;

    @OneToOne
    @MapsId  // Maps this entity's id to the Goal's id
    @JoinColumn(name = "goalId")  // Foreign key column name
    private Goal goal;

    private String reflectionAnswer1;

    private String reflectionAnswer2;

    private String reflectionAnswer3;

    // Constructors
    public ReflectionAnswer() {}

    public ReflectionAnswer(Goal goal, String reflectionAnswer1, String reflectionAnswer2, String reflectionAnswer3) {
        this.goal = goal;
        this.reflectionAnswer1 = reflectionAnswer1;
        this.reflectionAnswer2 = reflectionAnswer2;
        this.reflectionAnswer3 = reflectionAnswer3;
    }

    // Getters & setters
    public Goal getGoal() {
        return goal;
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
    }

    public Long getGoalId() { return goalId; }

    public String getReflectionAnswer1() { return reflectionAnswer1; }

    public void setReflectionAnswer1(String reflectionAnswer1) { this.reflectionAnswer1 = reflectionAnswer1; }

    public String getReflectionAnswer2() { return reflectionAnswer2; }

    public void setReflectionAnswer2(String reflectionAnswer2) { this.reflectionAnswer2 = reflectionAnswer2; }

    public String getReflectionAnswer3() { return reflectionAnswer3; }

    public void setReflectionAnswer3(String reflectionAnswer3) { this.reflectionAnswer3 = reflectionAnswer3 ; }
}