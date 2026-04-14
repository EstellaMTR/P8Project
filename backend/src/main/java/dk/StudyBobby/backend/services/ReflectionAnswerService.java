package dk.StudyBobby.backend.services;

import dk.StudyBobby.backend.dto.reflectionAnswerRequests.ReflectionAnswerCreateRequest;
import dk.StudyBobby.backend.entities.AcademicSession;
import dk.StudyBobby.backend.entities.Goal;
import dk.StudyBobby.backend.entities.ReflectionAnswer;
import dk.StudyBobby.backend.repositories.GoalRepository;
import dk.StudyBobby.backend.repositories.ReflectionAnswerRepository;
import dk.StudyBobby.backend.repositories.UserRepository;
import org.apache.catalina.User;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ReflectionAnswerService {

    private final ReflectionAnswerRepository reflectRepo;
    private final GoalRepository goalRepo;
    private final UserRepository userRepo;

    public ReflectionAnswerService(ReflectionAnswerRepository reflectRepo, GoalRepository goalRepo, UserRepository userRepo) {
        this.reflectRepo = reflectRepo;
        this.goalRepo = goalRepo;
        this.userRepo = userRepo;
    }

    // CREATE SERVICE
    public ReflectionAnswer create(ReflectionAnswerCreateRequest request) {
        if (request.getReflectionAnswer1() == null || request.getReflectionAnswer1().isEmpty()) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(400),"No reflection has been entered for reflection 1");
        }

        if (request.getReflectionAnswer2() == null || request.getReflectionAnswer2().isEmpty()) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(400), "No reflection has been entered for reflection 2");
        }

        if (request.getReflectionAnswer3() == null || request.getReflectionAnswer3().isEmpty()) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(400), "No reflection has been entered for reflection 3");
        }

        Optional<Goal> goal = goalRepo.findById(request.getGoalId());
        if (goal.isEmpty()) throw new ResponseStatusException(HttpStatusCode.valueOf(404), "Goal does not exist");

        ReflectionAnswer reflectionAnswer = new ReflectionAnswer();

        reflectionAnswer.setGoal(goal.get());
        reflectionAnswer.setReflectionAnswer1(request.getReflectionAnswer1());
        reflectionAnswer.setReflectionAnswer2(request.getReflectionAnswer2());
        reflectionAnswer.setReflectionAnswer3(request.getReflectionAnswer3());

        reflectRepo.save(reflectionAnswer);


        return reflectionAnswer;

    }


    // GET ALL SERVICE
    public List<ReflectionAnswer> getAll() {
        return reflectRepo.findAll();
    }

    // GET BY USER ID SERVICE
    public List<ReflectionAnswer> getByUserID(Long userId) {
        if (!userRepo.existsById(userId)) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(404), "User not found");
        }
        return reflectRepo.findByGoal_AcademicSession_UserId(userId);
    }

    // GET BY GOAL ID SERVICE
    public List<ReflectionAnswer> getByGoalID(Long goalId) {
        if (!goalRepo.existsById(goalId)) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(404), "Goal not found");
        }
        return reflectRepo.findByGoal_Id(goalId);
    }

}
