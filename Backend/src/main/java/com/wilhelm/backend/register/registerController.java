package com.wilhelm.backend.register;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://fitness-app-amber-xi-29.vercel.app",
})
@RestController
public class registerController {
    private final JdbcTemplate jdbc;

    public registerController(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    @PostMapping("/register")
    public String register(@RequestBody registerRequest body){
        String sql = "insert into public.user (email, phone_number, password) values (?, ?, ?)";
        jdbc.update(sql, body.getEmail(), body.getPhoneNumber(), body.getPassword());
        return "ok";
    }
}
