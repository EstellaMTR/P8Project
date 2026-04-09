package dk.StudyBobby.backend.services;

import dk.StudyBobby.backend.dto.userRequests.LoginRequest;
import dk.StudyBobby.backend.dto.userRequests.UserCreateRequest;
import dk.StudyBobby.backend.entities.User;
import dk.StudyBobby.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo){
        this.userRepo = userRepo;
    }

    // GET all users
    public List<User> getAll(){
        return userRepo.findAll();
    }

    // GET user by id
    public Optional<User> getUserById(Long userId){
        return userRepo.findById(userId);
    }

    // CREATE new user
    public User create(UserCreateRequest request) {
        User user = new User();

        user.setName(request.getName());
        user.setPassword(request.getPassword());

        user = userRepo.save(user);

        return user;
    }

    // VALIDATE login credentials
    public Long validate(LoginRequest request) {
        User user = userRepo.findByName(request.getName())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        return user.getId(); // we have to return the ID to frontend to give own session
    }





    // Get the name from their entry first
    // Get the list of names from name column in User table in DB
    // Compare the name entered to all names in name column of User table in DB
    // Get the password from their entry
    // Get corresponding password for matching name
    // If name matches, check if entered password matches corresponding password in
    // the row in which the user's name matched
    // Return HTTP code



}
