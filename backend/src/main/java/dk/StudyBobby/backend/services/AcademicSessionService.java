// package is the current folder for this file
package dk.StudyBobby.backend.services;

// importing tools from our own packages
import dk.StudyBobby.backend.dto.academicSessionRequests.ChangeStateRequest;
import dk.StudyBobby.backend.dto.academicSessionRequests.CreateRequest;
import dk.StudyBobby.backend.dto.academicSessionRequests.EditRequest;
import dk.StudyBobby.backend.dto.goalRequests.GoalCreateRequest;
import dk.StudyBobby.backend.entities.AcademicSession;
import dk.StudyBobby.backend.entities.Goal;
import dk.StudyBobby.backend.entities.User;
import dk.StudyBobby.backend.enums.SessionState;
import dk.StudyBobby.backend.repositories.AcademicSessionsRepository;
import dk.StudyBobby.backend.repositories.GoalRepository;
import dk.StudyBobby.backend.repositories.UserRepository;

// importing tools from pre-existing packages
import jakarta.validation.constraints.Null;
import org.apache.commons.lang3.ObjectUtils;
import org.hibernate.Session;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// Marking the class as a SERVICE for handling the backend code logic
@Service
// Creating class for servicing the backend code logic
public class AcademicSessionService {

    // declaring dependencies on repositories for all related to Academic Sessions
    private final UserRepository userRepo;
    private final AcademicSessionsRepository sessionRepo;
    private final GoalRepository goalRepo;

    /** CONSTRUCTOR: Injecting repositories into service
     * @param userRepo repository for user data
     * @param sessionRepo repository for Academic Session data
     * @param goalRepo repository for goal data
     */
    public AcademicSessionService(UserRepository userRepo, AcademicSessionsRepository sessionRepo, GoalRepository goalRepo) {
        this.userRepo = userRepo;
        this.sessionRepo = sessionRepo;
        this.goalRepo = goalRepo;
    }

    /**
     * Handling the creation of an Academic Session
     * @param request passed specific CreateRequest DTO
     * @return ?
     */
    public AcademicSession create(CreateRequest request) {

        // Make sure that at least one goal is passed
        if (request.getGoals() == null || request.getGoals().isEmpty()) {
            throw new RuntimeException("At least one goal is required");
        }

        // Find matching user ID in repo, to make sure user exists
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User does not exist"));

        // If above validation is successfully gone through
        // then create the Academic Session...
        AcademicSession session = new AcademicSession();
        // ... and set the following for the created Academic Session
        session.setUser(user);
        session.setTitle(request.getTitle());
        session.setSessionType(request.getSessionType());
        session.setState(request.getState());
        session.setCreatedAt(LocalDateTime.now());
        session.setDuration(Duration.ofMinutes(request.getDuration()));

        // Save the newly created Academic Session in the Academic Session repo
        session = sessionRepo.save(session);

        // For-each Loop that sets each goal, depending on how many goals are passed from DTO
        List<Goal> goals = new ArrayList<>();

        for (GoalCreateRequest g : request.getGoals()) {
            Goal goal = new Goal();
            goal.setGoal(g.getGoal());
            goal.setAcademicSession(session);

            goals.add(goal);
        }

        session.setGoals(goals);
        sessionRepo.save(session); // cascade saves goals

        // This should be a HTTP code that can be sent back and understood by controller
        return session;
    }

    /**
     * Handling the request of editing an existing Academic Session
     * @param request passed specific EditRequest DTO
     * @return ?
     */
    public AcademicSession edit(EditRequest request) {

        // Defining current Academic Session by finding it in Academic Session repo
        AcademicSession session = sessionRepo.findById(request.getAcademicSessionId())
                // ...and handling if it does not exist in repo
                .orElseThrow(() -> new RuntimeException("Academic session does not exist"));

        // updating the following
        session.setTitle(request.getTitle());
        session.setSessionType(request.getSessionType());
        session.setState(request.getState());
        session.setDuration(Duration.ofMinutes(request.getDuration()));

        // saving update of Academic Session in Academic Session repo
        session = sessionRepo.save(session);

        // For-each Loop that updates each goal, depending on how many goals are passed from DTO
        for (GoalCreateRequest g : request.getGoals()) {
            Goal goal = new Goal();
            goal.setGoal(g.getGoal());
            goal.setAcademicSession(session);
            goalRepo.save(goal);
        }

        // This should be a HTTP code that can be sent back and understood by controller
        return session;
    }

    /**
     * Handling the manual change of sessionState
     * @param request passed specific ChangeStateRequest DTO
     * @return ?
     */
    public AcademicSession changeState(ChangeStateRequest request) {

        // Defining current Academic Session by finding it in Academic Session repo
        AcademicSession session = sessionRepo.findById(request.getAcademicSessionId())
                // ...and handling if it does not exist in repo
                .orElseThrow(() -> new RuntimeException("Academic session does not exist"));

        // get the current state
        SessionState state = session.getState();

        // if state is "NULL" from the start then set state to "CREATED"
        if (state == null) {
            session.setState(SessionState.CREATED);
        }

        // if state is "created" then set state to "pending reflecion state"
        else if (state == SessionState.CREATED) {
            session.setState(SessionState.PENDING_REFLECTION);

        }
        // if state is "pending reflection state" and then set the state to "archived"
        else if (state == SessionState.PENDING_REFLECTION) {
            session.setState(SessionState.ARCHIVED);
        }

        // saving update of Academic Session in Academic Session repo
        session = sessionRepo.save(session);

        // This should be a HTTP code that can be sent back and understood by controller
        return session;

    }


    /**
     * Handling the deletion of a whole Academic Session
     * @param id specific Academic Session ID
     */
    public void delete(Long id) {
        sessionRepo.deleteById(id);
    }

    /**
     * Handling the fetching of all Academic sessions
     * @return list of all Academic Sessions in Academic Session repo
     */
    public List<AcademicSession> getAll() {
        return sessionRepo.findAll();
    }

    /**
     * Handling the fetching of Academic sessions by UserId
     * @return list of all Academic Sessions in Academic Session repo by UserId
     */
    public List<AcademicSession> getByUserId(Long userId) {
        return sessionRepo.findByUser_Id(userId);
    }
}
