package dk.StudyBobby.backend.controllers;

import org.springframework.web.bind.annotation.*;
import dk.StudyBobby.backend.entities.User;
import dk.StudyBobby.backend.repositories.UserRepository;

import java.util.List;
// controllers are endpoints. They are what we can call from the frontend to do things. 
// They usually talk to the repositories to get data from the database, and then return that data to the frontend.
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    // GET all users
    @GetMapping
    public List<User> getAll() {
        return repo.findAll();
    }

    // POST create user
    @PostMapping
    public User create(@RequestBody User user) {
        return repo.save(user);
    }
}