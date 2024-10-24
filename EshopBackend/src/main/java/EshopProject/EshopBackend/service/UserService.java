package EshopProject.EshopBackend.service;

import EshopProject.EshopBackend.model.Product;
import EshopProject.EshopBackend.model.appUser;

import java.util.List;
import java.util.Optional;

public interface UserService {

//    Create User
    appUser createUser (appUser user);

//    Get all Users
    List<appUser> getUsersList();

//    Get User By ID
    Optional<appUser> getUserById(Long userId);

//    Edit User
    appUser updateUser(appUser user, Long userId);

//    Delete User
    void deleteUserById(Long userId);

    appUser getUserByUsername(String username);

    // Add product to wishlist
    appUser addFavoriteProduct(Long userId, Long productId);

    // Remove product from wishlist
    appUser removeFavoriteProduct(Long userId, Long productId);

    List<Product> getFavoritesByUserId(Long userId);
}
