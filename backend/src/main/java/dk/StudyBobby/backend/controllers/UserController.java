package dk.StudyBobby.backend.controllers;

import dk.StudyBobby.backend.dto.userRequests.UserCreateRequest;
import dk.StudyBobby.backend.services.UserService;
import org.springframework.web.bind.annotation.*;
import dk.StudyBobby.backend.entities.User;
import dk.StudyBobby.backend.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

// controllers are endpoints. They are what we can call from the frontend to do things.
// They usually talk to the repositories to get data from the database, and then return that data to the frontend.
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // GET all users
    @GetMapping
    public List<User> getAll() {
        return service.getAll();
    }

    // GET user by id
    @GetMapping("/user/{userId}")
    public Optional<User> getUserById(@PathVariable Long userId){
        return service.getUserById(userId);
    }


    // POST create user
    @PostMapping
    public User create(@RequestBody UserCreateRequest request) {
        return service.create(request);
    }
}