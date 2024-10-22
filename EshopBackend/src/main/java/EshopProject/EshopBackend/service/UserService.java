package EshopProject.EshopBackend.service;

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
}
