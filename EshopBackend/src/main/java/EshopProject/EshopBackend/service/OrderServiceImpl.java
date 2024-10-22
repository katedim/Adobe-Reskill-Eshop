package EshopProject.EshopBackend.service;

import EshopProject.EshopBackend.model.Order;
import EshopProject.EshopBackend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

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
}
