package com.wilhelm.backend.register;

import org.springframework.web.bind.annotation.*;

@RestController
public class registerController {
    @PostMapping("/register")
    public String register(@RequestBody String body){
        System.out.println("REGISTER ENDPOINT HIT: " + body);
        return "ok";
    }
}
