package EshopProject.EshopBackend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContentController {

    @GetMapping("/home")
    public String handleWelcome() {
        return "home";
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
