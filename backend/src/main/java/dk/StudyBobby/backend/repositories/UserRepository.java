package dk.StudyBobby.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import dk.StudyBobby.backend.entities.User;

import java.util.Optional;

// Repositories are like DAOs (Data Access Objects) - they are responsible for talking to the database and fetching/saving data.
// By extending JpaRepository, we get a lot of methods for free, like "findAll", "findById", "save", etc.
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String name);
}