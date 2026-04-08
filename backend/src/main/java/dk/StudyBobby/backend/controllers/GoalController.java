package dk.StudyBobby.backend.controllers;

import dk.StudyBobby.backend.dto.goalRequests.GoalEditRequest;
import dk.StudyBobby.backend.dto.goalRequests.GoalDeleteRequest;
import dk.StudyBobby.backend.dto.goalRequests.GoalCreateRequest;
import dk.StudyBobby.backend.entities.AcademicSession;
import org.springframework.web.bind.annotation.*;
import dk.StudyBobby.backend.entities.Goal;
import dk.StudyBobby.backend.repositories.GoalRepository;

import java.util.List;
import java.util.Optional;

// controllers are endpoints. They are what we can call from the frontend to do things.
// They usually talk to the repositories to get data from the database, and then return that data to the frontend.
@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalRepository repo;

    public GoalController(GoalRepository repo) {
        this.repo = repo;
    }

    // GET all goals
    @GetMapping
    public List<Goal> getAll() {
        return repo.findAll();
    }


    // PUT edit goals
    @PutMapping("/{id}")
    public Goal edit(@RequestBody GoalEditRequest request) {
        Optional<Goal> goal = repo.findById(request.getGoalId());
        if (goal.isEmpty()) throw new RuntimeException("Goal does not exist");

        Goal goalInfo = goal.get();
        goalInfo.setGoal(request.getGoal());

        goalInfo = repo.save(goalInfo);

        return goalInfo;  // should be HTTP code

    }

    @DeleteMapping("/{id}")
    public String deleteGoal(@PathVariable Long id) {
        repo.deleteById(id);
        return "AcademicSession with ID: " + id + " successfully deleted.";
    }

}