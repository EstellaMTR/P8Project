package dk.StudyBobby.backend.services;

import dk.StudyBobby.backend.dto.userRequests.LoginRequest;
import dk.StudyBobby.backend.dto.userRequests.UserCreateRequest;
import dk.StudyBobby.backend.dto.userRequests.UserDTO;
import dk.StudyBobby.backend.entities.User;
import dk.StudyBobby.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserService {

    private final UserRepository userRepo;
    private final MapperService mapper;

    public UserService(UserRepository userRepo, MapperService mapper){
        this.userRepo = userRepo;
        this.mapper = mapper;
    }

    // GET all users
    public List<UserDTO> getAll(){
        // the next line says:
        // find everything
        // go through each element
        // call the method "toDTO" on it
        // collect the result in a list
        // We do this because our above return type is a List
        return userRepo.findAll().stream()
                .map(user -> mapper.toDTO(user))
                .toList();
    }

    // GET user by id
    public Optional<UserDTO> getUserById(Long userId){
        // here we jsut call map because map has a built in map function that can handle it.
        return userRepo.findById(userId).map(user -> mapper.toDTO(user));
    }

    // CREATE new user
    public UserDTO create(UserCreateRequest request) {
        User user = new User();

        user.setName(request.getName());
        user.setPassword(request.getPassword());

        user = userRepo.save(user);

        return mapper.toDTO(user);
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
