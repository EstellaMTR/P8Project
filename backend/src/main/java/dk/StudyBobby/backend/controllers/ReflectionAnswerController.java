package dk.StudyBobby.backend.controllers;

import org.springframework.web.bind.annotation.*;
import dk.StudyBobby.backend.entities.ReflectionAnswer;
import dk.StudyBobby.backend.repositories.ReflectionAnswerRepository;

import java.util.List;
// controllers are endpoints. They are what we can call from the frontend to do things. 
// They usually talk to the repositories to get data from the database, and then return that data to the frontend.
@RestController
@RequestMapping("/api/reflection-answers")
public class ReflectionAnswerController {

    private final ReflectionAnswerRepository repo;

    public ReflectionAnswerController(ReflectionAnswerRepository repo) {
        this.repo = repo;
    }

    // GET all reflection answers
    @GetMapping
    public List<ReflectionAnswer> getAll() {
        return repo.findAll();
    }

    // POST create reflection answer    
    @PostMapping
    public ReflectionAnswer create(@RequestBody ReflectionAnswer reflectionAnswer) {
        return repo.save(reflectionAnswer);
    }
}