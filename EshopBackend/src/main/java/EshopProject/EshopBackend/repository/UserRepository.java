package EshopProject.EshopBackend.repository;

import EshopProject.EshopBackend.model.appUser;
import org.springframework.data.repository.CrudRepository;

// or extends CrudRepository,doesn't provide methods for implementing pagination and sorting.
//public interface UserRepository extends JpaRepository<User, Long> {
public interface UserRepository extends CrudRepository<appUser, Long> {
}
