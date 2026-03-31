package dk.StudyBobby.backend.controllers;

import dk.StudyBobby.backend.dto.CreateRequest;
import dk.StudyBobby.backend.dto.GoalRequest;
import dk.StudyBobby.backend.entities.Goal;
import dk.StudyBobby.backend.entities.User;
import dk.StudyBobby.backend.repositories.GoalRepository;
import dk.StudyBobby.backend.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;
import dk.StudyBobby.backend.entities.AcademicSession;
import dk.StudyBobby.backend.repositories.AcademicSessionsRepository;
import dk.StudyBobby.backend.dto.EditRequest

import java.util.List;
import java.util.Optional;

// controllers are endpoints. They are what we can call from the frontend to do things.
// They usually talk to the repositories to get data from the database, and then return that data to the frontend.
@RestController
@RequestMapping("/api/academicSessions")
public class AcademicSessionController {

    private final UserRepository userRepo;
    private final AcademicSessionsRepository repo;
    private final GoalRepository goalRepo;

    public AcademicSessionController(UserRepository userRepo, AcademicSessionsRepository repo, GoalRepository goalRepo) {

        this.userRepo = userRepo;
        this.repo = repo;
        this.goalRepo = goalRepo;
    }

    // GET all academic sessions
    @GetMapping
    public List<AcademicSession> getAll() {
        return repo.findAll();
    }

    // POST create academic session
    @PostMapping
    public AcademicSession create(@RequestBody CreateRequest request) {

        if (request.getGoals() == null || request.getGoals().isEmpty()) {
            throw new RuntimeException("At least one goal is required");
        }

        Optional<User> user = userRepo.findById(request.getUserId());
        if (user.isEmpty()) throw new RuntimeException("User does not exist");

        AcademicSession session = new AcademicSession();
        session.setUser(user.get());
        session.setTitle(request.getTitle());
        session.setSessionType(request.getSessionType());
        session.setState(request.getState());
        session.setCreatedAt(java.time.LocalDateTime.now());
        session.setDuration(java.time.Duration.ofMinutes(request.getDuration()));

        session = repo.save(session); // must save first to get ID

        for (GoalRequest g : request.getGoals()) {
            Goal goal = new Goal();
            goal.setGoal(g.getGoal());
            goal.setAcademicSession(session);
            goalRepo.save(goal);
        }

        return session; // should be HTTP code
    }
    
    @PutMapping("/{id}")
    public AcademicSession edit(@RequestBody EditRequest request) {
        Optional<AcademicSession> academicSession = repo.findById(request.getAcademicSessionId());
        if (academicSession.isEmpty()) throw new RuntimeException("Academic session does not exist");

        AcademicSession session = academicSession.get();
        session.setTitle(request.getTitle());
        session.setSessionType(request.getSessionType());
        session.setState(request.getState());
        session.setDuration(java.time.Duration.ofMinutes(request.getDuration()));

        session = repo.save(session);

        for (GoalRequest g : request.getGoals()) {
            Goal goal = new Goal();
            goal.setGoal(g.getGoal());
            goal.setAcademicSession(session);
            goalRepo.save(goal);
        }

        return session;  // should be HTTP code

    }

    @DeleteMapping("/{id}")
        public String deleteAcademicSession(@PathVariable Long id) {
            return "AcademicSession with" + id + "succesfully deleted."
        }
    }

}



