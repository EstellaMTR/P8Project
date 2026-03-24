package dk.StudyBobby.backend.endpoints;

import org.springframework.web.bind.annotation.*;

// The "RestController" means that the framework can find this class and knows it has endpoints in it. 
// The "RequestMapping" means that all endpoints in this class will start with "/api"
@RestController
@RequestMapping("/api")  // optional base path
public class HelloWorldController {

    // GET endpoint
    @GetMapping("/hello")
    public String hello(@RequestParam(name = "name", defaultValue = "World") String name) {
        return "Hello, " + name + "!";
    }

    // POST endpoint
    @PostMapping("/hello")
    public String helloPost(@RequestBody String name) {
        return "Hello, " + name + "!";
    }
}