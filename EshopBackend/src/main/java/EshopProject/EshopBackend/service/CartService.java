package EshopProject.EshopBackend.service;

import EshopProject.EshopBackend.model.Cart;

public interface CartService {
    Cart saveCart(Cart cart);

    Cart getCartByUser(Long userId);

    Cart getCartById(Long cartId);

    Cart emptyCart(Long cartId);
}
