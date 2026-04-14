package dk.StudyBobby.backend.controllers;

import dk.StudyBobby.backend.dto.goalRequests.GoalEditRequest;
import dk.StudyBobby.backend.dto.goalRequests.GoalDeleteRequest;
import dk.StudyBobby.backend.dto.goalRequests.GoalCreateRequest;
import dk.StudyBobby.backend.entities.AcademicSession;
import dk.StudyBobby.backend.services.GoalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dk.StudyBobby.backend.entities.Goal;
import dk.StudyBobby.backend.repositories.GoalRepository;
import org.springframework.web.server.ResponseStatusException;

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
    // we will probably never use this and it is probably dumb
    @Operation(summary = "Get all goals", description = "Return all goals in DB")
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all goals")
    })
    @GetMapping
    public List<Goal> getAll() {
        return service.getAll();
    }

    // GET all goals related to a specific user
    // we will also probably never use this and it is also probably dumb
    @Operation(summary = "Get all goals by user id", description = "Return all a user's goals to the user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all goals for this User"),
    })
    @GetMapping("/user/{userId}")
    public List<Goal> getByUserId(@PathVariable Long userId){
        return service.getByUserId(userId);
    }

    // GET all goals related to a specific academic session
    @Operation(summary = "Get all goals by academic session id", description = "Return all a user's goals by academic session id to the user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all goals for this Academic Session"),
    })
    @GetMapping("/academic-session/{sessionId}")
    public List<Goal> getByAcademicSessionId(@PathVariable Long sessionId){
        return service.getByAcademicSessionId(sessionId);
    }

    // PUT edit goals
    @Operation(summary = "Edit the Goal", description = "Edit this goal for this user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Goal successfully edited"),
            @ApiResponse(responseCode = "404", description = "Goal not found")
    })
    @PutMapping
    public ResponseEntity<Goal> edit(@RequestBody GoalEditRequest request) {
        try {
            return ResponseEntity.ok(service.edit(request));
        } catch (ResponseStatusException exception) {
            return ResponseEntity.status(exception.getStatusCode()).build();
        }
    }

    @Operation(summary = "Delete an academic session", description = "Delete an academic session by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Academic Session successfully deleted"),
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteGoal(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(id);
    }

}