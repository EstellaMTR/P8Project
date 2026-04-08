package dk.StudyBobby.backend.controllers;

import dk.StudyBobby.backend.dto.reflectionAnswerRequests.ReflectionAnswerCreateRequest;
import dk.StudyBobby.backend.entities.AcademicSession;
import dk.StudyBobby.backend.entities.Goal;
import dk.StudyBobby.backend.entities.User;
import dk.StudyBobby.backend.repositories.GoalRepository;
import dk.StudyBobby.backend.services.ReflectionAnswerService;
import org.springframework.web.bind.annotation.*;
import dk.StudyBobby.backend.entities.ReflectionAnswer;
import dk.StudyBobby.backend.repositories.ReflectionAnswerRepository;

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
    @GetMapping
    public List<ReflectionAnswer> getAll() {
        return service.getAll();
    }

    // GET all reflection answers related to a specific user
    @GetMapping("/{userId}")
    public List<ReflectionAnswer> getByUserId(@PathVariable Long userId) {
        return service.getByUserID(userId);
    }

    // POST create reflection answer    
    @PostMapping
    public ReflectionAnswer create(@RequestBody ReflectionAnswerCreateRequest request) {
        return service.create(request);

    }
}