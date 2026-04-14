package dk.StudyBobby.backend.controllers;

import dk.StudyBobby.backend.dto.reflectionAnswerRequests.ReflectionAnswerCreateRequest;
import dk.StudyBobby.backend.entities.AcademicSession;
import dk.StudyBobby.backend.entities.Goal;
import dk.StudyBobby.backend.entities.User;
import dk.StudyBobby.backend.repositories.GoalRepository;
import dk.StudyBobby.backend.services.ReflectionAnswerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dk.StudyBobby.backend.entities.ReflectionAnswer;
import dk.StudyBobby.backend.repositories.ReflectionAnswerRepository;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Ref;
import java.util.List;
import java.util.Optional;

// controllers are endpoints. They are what we can call from the frontend to do things.
// They usually talk to the repositories to get data from the database, and then return that data to the frontend.
@RestController
@RequestMapping("/api/reflection-answers")
public class ReflectionAnswerController {

    private final ReflectionAnswerService service;

    public ReflectionAnswerController(ReflectionAnswerService service) {
        this.service = service;
    }

    // GET all reflection answers
    @Operation(summary = "Get all Reflection Answers", description = "Return all Reflection Answers in DB")
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all Reflection Answers")
    })
    @GetMapping
    public List<ReflectionAnswer> getAll() {
        return service.getAll();
    }

    // GET all reflection answers related to a specific user
    @Operation(summary = "Get all reflection answers by user id", description = "Return all a user's reflection answers to the user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all reflection answers for this User"),
            @ApiResponse(responseCode = "404", description = "User with userId not found")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReflectionAnswer>> getByUserId(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(service.getByUserID(userId));
        } catch (ResponseStatusException exception) {
            return ResponseEntity.status(exception.getStatusCode()).build();
        }
    }

    // GET all reflection answers related to a specific goal
    @Operation(summary = "Get all reflection answers by goal id", description = "Return all a user's reflection answers to the user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all reflection answers for this goal"),
            @ApiResponse(responseCode = "404", description = "Goal with goalId not found")
    })
    @GetMapping("/goal/{goalId}")
    public ResponseEntity<List<ReflectionAnswer>> getByGoalId(@PathVariable Long goalId) {
        try {
            return ResponseEntity.ok(service.getByGoalID(goalId));
        } catch (ResponseStatusException exception) {
            return ResponseEntity.status(exception.getStatusCode()).build();
        }
    }

    // POST create reflection answer
    @Operation(summary = "Creating an Reflection Answer", description = "Creates Reflection Answer for a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reflection Answer created successfully"),
            @ApiResponse(responseCode = "400", description = "All reflection answers must be filled out"),
            @ApiResponse(responseCode = "404", description = "Goal not found")
    })
    @PostMapping
    public ResponseEntity<ReflectionAnswer> create(@RequestBody ReflectionAnswerCreateRequest request) {
        try {
            return ResponseEntity.ok(service.create(request));
        } catch (ResponseStatusException exception) {
            return ResponseEntity.status(exception.getStatusCode()).build();
        }
    }
}