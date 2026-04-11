package dk.StudyBobby.backend.services;

import dk.StudyBobby.backend.dto.userRequests.UserDTO;
import dk.StudyBobby.backend.entities.User;
import org.springframework.stereotype.Service;

@Service
public class MapperService {
    public UserDTO toDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        return userDTO;
    }
}
