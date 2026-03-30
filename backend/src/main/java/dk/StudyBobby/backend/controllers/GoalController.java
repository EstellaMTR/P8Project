package dk.StudyBobby.backend.controllers;

import org.springframework.web.bind.annotation.*;
import dk.StudyBobby.backend.entities.Goal;
import dk.StudyBobby.backend.repositories.GoalRepository;

import java.util.List;
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

    // POST create goal
    @PostMapping
    public Goal create(@RequestBody Goal goal) {
        return repo.save(goal);
    }
}