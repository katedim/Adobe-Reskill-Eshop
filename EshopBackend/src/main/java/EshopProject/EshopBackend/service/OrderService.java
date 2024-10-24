package EshopProject.EshopBackend.service;

import EshopProject.EshopBackend.model.Order;

import java.util.List;

public interface OrderService {

//    Create Order
    Order createOrder(Order order);

//    Get all Orders
    List<Order> getAllOrders();

    List<Order> findOrdersByUserId(Long userId);

    Order updateOrder(Order order);

}
