package dk.StudyBobby.backend.dto.userRequests;

// UserDTO is used so that we can return a user without sending vulnerable information, such as the password
public class UserDTO {
    private Long id;

    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
