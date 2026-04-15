package dk.StudyBobby.backend.controllers;

import dk.StudyBobby.backend.dto.userRequests.UserCreateRequest;
import dk.StudyBobby.backend.dto.userRequests.UserDTO;
import dk.StudyBobby.backend.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dk.StudyBobby.backend.entities.User;
import dk.StudyBobby.backend.repositories.UserRepository;
import org.springframework.web.server.ResponseStatusException;
import dk.StudyBobby.backend.dto.userRequests.LoginRequest;

import java.util.List;
import java.util.Optional;

// controllers are endpoints. They are what we can call from the frontend to do things.
// They usually talk to the repositories to get data from the database, and then return that data to the frontend.
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // GET all users
    @Operation(summary = "Gets all users", description = "Returns all users in the database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
    })
    @GetMapping
    // we return userDTO here so we aren't ALSO returning the password to the user
    public List<UserDTO> getAll() {
        return service.getAll();
    }

    // GET user by id
    // @Operation isn't essential to include, but it will add this summary and description
    // to the Swagger webpage, so we can see and understand it more easily
    @Operation(summary = "Finds a user with given id", description = "Finds a user in the database with the provided id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User found, returns object"),
            @ApiResponse(responseCode = "404", description = "User was not found"),
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId){
        Optional<UserDTO> user = service.getUserById(userId);
        if (user.isPresent()) {
            // we return .ok, which is status code 200 (see above ApiResponse)
            return ResponseEntity.ok(user.get());
        }
        else
            // we return "notFound", which is status code 404 (see above ApiResponse)
            return ResponseEntity.notFound().build();
    }


    // POST create user
    @Operation(summary = "Creates a user", description = "Creates a user in the database")
    @ApiResponses(value = {
            // we are only doing code 200, because in the UserService file, in our "create" block,
            // we have no validation rules. We have no checks etc. so the only thing that can happen is success,
            // which is status code 200
            @ApiResponse(responseCode = "200", description = "Successfully created, returns id"),
    })
    @PostMapping
    public ResponseEntity<Long> create(@RequestBody UserCreateRequest request) {
        var user = service.create(request);
        // again, we are only returning .ok as a possibility, because we have no other
        // checks. The only thing that can happen is success (look at UserService "create" - there are no checks)
        return ResponseEntity.ok(user.getId());
    }

    // POST Log in user 
    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequest request) {
        try {
            UserDTO user = service.login(request);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}