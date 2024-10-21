package EshopProject.EshopBackend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ContentController {


    @GetMapping("/home")
            public Map<String, String> handleWelcome() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome, you are authenticated!");
        return response;
    }

    @GetMapping("/admin/home")
    public String handleAdminWelcome() {
        return "Admin_home";
    }

    @GetMapping("/user/home")
    public String handleUserWelcome() {
        return "User_home";
    }
}
