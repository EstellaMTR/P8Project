package dk.StudyBobby.backend.services;

import dk.StudyBobby.backend.dto.goalRequests.GoalEditRequest;
import dk.StudyBobby.backend.entities.Goal;
import dk.StudyBobby.backend.repositories.GoalRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoalService  {

    private final GoalRepository goalRepo;

    public GoalService(GoalRepository goalRepo) {
        this.goalRepo = goalRepo;
    }

    // GET SERVICE
    public List<Goal> getAll() {
        return goalRepo.findAll();
    }


    // EDIT SERVICE
    public Goal edit(GoalEditRequest request) {
        Optional<Goal> goal = goalRepo.findById(request.getGoalId());
        if (goal.isEmpty()) throw new RuntimeException("Goal does not exist");

        Goal goalInfo = goal.get();
        goalInfo.setGoal(request.getGoal());

        goalInfo = goalRepo.save(goalInfo);

        return goalInfo;
    }

    // DELETE SERVICE
    public void delete(Long id) {
        goalRepo.deleteById(id);
    }




}
