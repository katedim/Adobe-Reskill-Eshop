package EshopProject.EshopBackend.repository;

import EshopProject.EshopBackend.model.Order;
import EshopProject.EshopBackend.model.appUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserAndState(appUser user, Order.OrderState state);

    List<Order> findByUser(appUser user);
}