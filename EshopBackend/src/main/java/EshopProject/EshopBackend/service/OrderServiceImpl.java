package EshopProject.EshopBackend.service;

import EshopProject.EshopBackend.model.Order;
import EshopProject.EshopBackend.model.appUser;
import EshopProject.EshopBackend.repository.OrderRepository;
import EshopProject.EshopBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        try {
            List<Order> orderList = new ArrayList<>();
            orderRepository.findAll().forEach(orderList::add);

            if(orderList.isEmpty()) {
                return null;
            }
            else {
                return orderList;
            }
        }
        catch (Exception ex) {
            return null;
        }
    }


    @Override
    public List<Order> findOrdersByUserId(Long userId) {
        appUser user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));
        return orderRepository.findByUser(user); // Assuming you have a method in OrderRepository
    }

    @Override
    public Order updateOrder(Order order) {
        // Check if the order exists
        Optional<Order> updateOrder = orderRepository.findById(order.getId());
        if (updateOrder.isPresent()) {
            Order existingOrder = updateOrder.get();
            existingOrder.setState(order.getState());

            return orderRepository.save(existingOrder);
        } else {
            throw new RuntimeException("Order not found with id: " + order.getId());
        }
    }
}
