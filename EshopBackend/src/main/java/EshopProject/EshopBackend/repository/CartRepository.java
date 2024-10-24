package EshopProject.EshopBackend.repository;

import EshopProject.EshopBackend.model.Cart;
import EshopProject.EshopBackend.model.appUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUser(appUser user);
}
