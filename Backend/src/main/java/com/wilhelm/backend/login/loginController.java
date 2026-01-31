package com.wilhelm.backend.login;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import com.wilhelm.backend.login.loginRequest;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class loginController {

    public loginController(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    private final JdbcTemplate jdbc;

    @PostMapping("/login")
    public String register(@RequestBody loginRequest body){
        System.out.println("Login request hit the backend for: " + "email:" + body.getEmail() + " Password: " + body.getPassword());
        String sql = "select count(*) from public.\"user\" where email = ? and password = ?";
        Integer count = jdbc.queryForObject(sql, Integer.class, body.getEmail(), body.getPassword());
        System.out.println("Matches: " + count);
        if (count != null && count > 0) {
            return "ok";
        }
        return "invalid";
    }
}
