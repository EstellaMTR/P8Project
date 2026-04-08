// package is the current folder for this file
package dk.StudyBobby.backend.controllers;

// importing tools from our own packages
import dk.StudyBobby.backend.dto.academicSessionRequests.ChangeStateRequest;
import dk.StudyBobby.backend.dto.academicSessionRequests.CreateRequest;
import dk.StudyBobby.backend.services.AcademicSessionService;
import dk.StudyBobby.backend.entities.AcademicSession;
import dk.StudyBobby.backend.dto.academicSessionRequests.EditRequest;

// importing tools from pre-existing packages
import org.springframework.web.bind.annotation.*;
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
    @GetMapping
    public List<AcademicSession> getAll() {
        return service.getAll();
    }

    // Taking JSON body from HTTP request and POSTING it into CreateRequest DTO
    // Then handing the DTO to service
    // After service has handled it, returning newly created Academic Session
    @PostMapping
    public AcademicSession create(@RequestBody CreateRequest request) { // @RequestBody pulls data out of JSON body
        return service.create(request);
    }

    // Taking changed JSON body from HTTP request and PUTTING it into EditRequest DTO
    // Then handing the DTO to service
    @PutMapping
    public AcademicSession edit(@RequestBody EditRequest request) {
        // After service has handled it, returning changed Academic Session
        return service.edit(request);
    }
    // SHOULD WE ALSO HAVE ID AS PARAMETER ABOVE?? //

    // V V V V !!!NOT DONE!!! V V V V //
    // Capturing the ID of the Academic Session from the HTTP request to identify specific session
    // Taking changed JSON body from HTTP request and PUTTING it into ChangeStateRequest DTO
    // Then handing the DTO to service
    @PutMapping("/{id}/changeState")
    public AcademicSession edit(@RequestBody ChangeStateRequest request, @PathVariable Long id) {
        // After service has handled it, returning changed Academic Session
        return service.changeState(request);
    }

    // Capturing the ID of the Academic Session from the HTTP request to identify specific session
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        // Then DELETING the Academic Session through the service
        service.delete(id);
        // ...and returning success message
        return "AcademicSession with ID:" + id + " successfully deleted.";
    }
}