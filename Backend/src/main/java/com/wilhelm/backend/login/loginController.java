package com.wilhelm.backend.login;

import java.util.UUID;
import java.util.Map;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "https://fitness-app-amber-xi-29.vercel.app/")
@RestController
public class loginController {

    public loginController(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    private final JdbcTemplate jdbc;


    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> register(@RequestBody loginRequest body){
        System.out.println("Login request hit the backend for: " + "email:" + body.getEmail() + " Password: " + body.getPassword());
        String sql = "select user_id from public.\"user\" where email = ? and password = ?";
        Long userId; 
        try {
            userId = jdbc.queryForObject(sql, Long.class, body.getEmail(), body.getPassword());
        } catch(EmptyResultDataAccessException e){return ResponseEntity.ok(Map.of("status", "invalid"));}

        System.out.println("user id: " + userId);
        String user_token = generateToken();
        storeToken(user_token, userId);
        return ResponseEntity.ok(Map.of( //returns the new token to the frontend for the client to store and later use on requests
            "status", "ok",
            "token", user_token
            ));
    }

    private String generateToken(){  //generating a UUID randomized token
        return UUID.randomUUID().toString();
    }

    private void storeToken(String token, Long userId){ //Storing the token to the database related to the userID
        jdbc.update("delete from public.session_token where user_id = ?", userId);
        String sql = "insert into public.session_token (token, user_id, expires_at) " +
             "values (?, ?, now() + interval '7 days')";
        jdbc.update(sql, token, userId);
    }
}