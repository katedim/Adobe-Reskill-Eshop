package EshopProject.EshopBackend.controller;

import EshopProject.EshopBackend.model.appUser;
import EshopProject.EshopBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public appUser createUser(@RequestBody appUser user) {
        return userService.createUser(user);
    }

    @GetMapping("/allUsers")
    public List<appUser> getAllUsers() {
        return userService.getUsersList();
    }

    @GetMapping("/users/{userId}")
    public Optional<appUser> getUser(@PathVariable("userId") Long userId) {
        return userService.getUserById(userId);
    }

    @PutMapping("/users/{userId}")
    public appUser updateUser(@RequestBody appUser user,@PathVariable("userId") Long userId) {
        return userService.updateUser(user, userId);
    }

    @DeleteMapping("/users/{userId}")
    public String deleteUserById(@PathVariable("userId") Long userId) {
        userService.deleteUserById(userId);
        return "Deleted Successfully";
    }
}
