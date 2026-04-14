// package is the current folder for this file
package dk.StudyBobby.backend.controllers;

// importing tools from our own packages
import dk.StudyBobby.backend.dto.academicSessionRequests.ChangeStateRequest;
import dk.StudyBobby.backend.dto.academicSessionRequests.CreateRequest;
import dk.StudyBobby.backend.services.AcademicSessionService;
import dk.StudyBobby.backend.entities.AcademicSession;
import dk.StudyBobby.backend.dto.academicSessionRequests.EditRequest;

// importing tools from pre-existing packages
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


// Marking the whole class as a CONTROLLER for handling HTTP requests
@RestController
// Setting the URL path for the entire controller (API lives here)
@RequestMapping("/api/academicSessions")
// Creating class for controlling HTTP requests for Academic Sessions
public class AcademicSessionController {

    // declaring dependency on service layer for Academic Sessions
    private final AcademicSessionService service;

    // CONSTRUCTOR: Injecting service into controller
    public AcademicSessionController(AcademicSessionService service) {
        this.service = service;
    }

    // Asking service to GET all Academic Sessions and return as JSON list
    @Operation(summary = "Get all Academic Sessions", description = "Return all Academic Sessions in DB")
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all Academic Sessions")
    })
    @GetMapping
    // we return the list of Sessions here instead of a ResponseEntity.xyz, because we have no validation checks
    // in our getAll() - so we can just return the getAll()
            // we will also probably never use this call, because there is no scenario in which a User
            // will ask to get all academic sessions in our database (we wouldn't allow them to access
            // everyones sessions) - so this method is probably dumb
    public List<AcademicSession> getAll() {
        return service.getAll();
    }

    // GET all academic sessions by userId
    @Operation(summary = "Get all academic sessions by user id", description = "Return all a user's academic sessions to the user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all academic sessions for this User"),
            @ApiResponse(responseCode = "404", description = "User with userId not found")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AcademicSession>> getByUserId(Long userId) {
        try {
            return ResponseEntity.ok(service.getByUserId(userId));
        } catch (ResponseStatusException exception) {
            return ResponseEntity.status(exception.getStatusCode()).build();
        }

    }

    // Taking JSON body from HTTP request and POSTING it into CreateRequest DTO
    // Then handing the DTO to service
    // After service has handled it, returning newly created Academic Session
    @Operation(summary = "Creating an Academic Session", description = "Creates an Academic Session for a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Academic Session created successfully"),
            @ApiResponse(responseCode = "400", description = "No goal entered - at least one goal is required"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PostMapping
    public ResponseEntity<AcademicSession> create(@RequestBody CreateRequest request) { // @RequestBody pulls data out of JSON body
        try {
            return ResponseEntity.ok(service.create(request));
        } catch (ResponseStatusException exception) {
            return ResponseEntity.status(exception.getStatusCode()).build();
        }
    }

    // Taking changed JSON body from HTTP request and PUTTING it into EditRequest DTO
    // Then handing the DTO to service
    @Operation(summary = "Edit the Academic Session", description = "Edit this academic session for this user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Session successfully edited"),
            @ApiResponse(responseCode = "404", description = "Academic Session not found")
    })
    @PutMapping
    public ResponseEntity<AcademicSession> edit(@RequestBody EditRequest request) {
        // After service has handled it, returning changed Academic Session
        try {
            return ResponseEntity.ok(service.edit(request));
        } catch (ResponseStatusException exception){
            return ResponseEntity.status(exception.getStatusCode()).build();
        }
    }
    // SHOULD WE ALSO HAVE ID AS PARAMETER ABOVE?? // no - we get it in the request code in the service for this

    // V V V V !!!NOT DONE!!! V V V V //
    // Capturing the ID of the Academic Session from the HTTP request to identify specific session
    // Taking changed JSON body from HTTP request and PUTTING it into ChangeStateRequest DTO
    // Then handing the DTO to service
    @Operation(summary = "Changing the state of an academic session", description = "Sending an edit request to change the state of the Academic Session")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully changed state of Academic Session"),
            @ApiResponse(responseCode = "404", description = "Academic Session not found")
    })
    @PutMapping("/changeState")// we dont need id passed here as we get it in the request code in the service
    public ResponseEntity<AcademicSession> edit(@RequestBody ChangeStateRequest request) {
        // After service has handled it, returning changed Academic Session
        try {
            return ResponseEntity.ok(service.changeState(request));
        } catch (ResponseStatusException exception) {
            return ResponseEntity.status(exception.getStatusCode()).build();
        }
    }

    // Capturing the ID of the Academic Session from the HTTP request to identify specific session
    @Operation(summary = "Delete an academic session", description = "Delete an academic session by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Academic Session successfully deleted"),
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        // Then DELETING the Academic Session through the service
            // because delete doesnt return anything (cause its deleted), we just return ResponseEntity.ok(id)
            // this returns the id of the object we just deleted, with status code 200
            service.delete(id);
            return ResponseEntity.ok(id);
    }
}