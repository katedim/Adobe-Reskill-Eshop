package EshopProject.EshopBackend.repository;

import EshopProject.EshopBackend.model.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order, Long> {

}
