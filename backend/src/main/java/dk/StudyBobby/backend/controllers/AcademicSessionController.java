package dk.StudyBobby.backend.controllers;

import org.springframework.web.bind.annotation.*;
import dk.StudyBobby.backend.entities.User;
import dk.StudyBobby.backend.repositories.UserRepository;

import java.util.List;
// controllers are endpoints. They are what we can call from the frontend to do things. 
// They usually talk to the repositories to get data from the database, and then return that data to the frontend.
@RestController
@RequestMapping("/api/academicSessions")
public class AcademicSessionController {

    private final AcademicSessionsRepository repo;

    public AcademicSessionController(AcademicSessionsRepository repo) {
        this.repo = repo;
    }

    // GET all academic sessions
    @GetMapping
    public List<AcademicSession> getAll() {
        return repo.findAll();
    }

    // POST create academic session
    @PostMapping
    public AcademicSession create(@RequestBody AcademicSession session) {
        return repo.save(session);
    }
}