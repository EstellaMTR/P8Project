package dk.StudyBobby.backend.controllers;

import dk.StudyBobby.backend.dto.goalRequests.GoalEditRequest;
import dk.StudyBobby.backend.dto.goalRequests.GoalDeleteRequest;
import dk.StudyBobby.backend.dto.goalRequests.GoalCreateRequest;
import dk.StudyBobby.backend.entities.AcademicSession;
import dk.StudyBobby.backend.services.GoalService;
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

//    //private final GoalRepository repo;
//
//    //public GoalController(GoalRepository repo) {
//        this.repo = repo;
//    }

    private final GoalService service;

    public GoalController(GoalService service) {
        this.service = service;
    }

    // GET all goals
    @GetMapping
    public List<Goal> getAll() {
        return service.getAll();
    }


    // PUT edit goals
    @PutMapping("/{id}")
    public Goal edit(@RequestBody GoalEditRequest request, @PathVariable Long id) {
        return service.edit(request);  // should be HTTP code
    }

    @DeleteMapping("/{id}")
    public String deleteGoal(@PathVariable Long id) {
        service.delete(id);
        return "Goal with ID: " + id + " successfully deleted.";
    }

}