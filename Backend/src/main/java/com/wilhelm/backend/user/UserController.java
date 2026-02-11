package com.wilhelm.backend.user;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://fitness-app-amber-xi-29.vercel.app","https://liftlog.no"
})
@RestController
public class UserController {

    private final JdbcTemplate jdbc;

    public UserController(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    @GetMapping("/get-users")
    public ResponseEntity<?> getUsers(@RequestHeader("Authorization") String auth){
        if (auth == null || auth.isBlank()){
            return ResponseEntity.status(401).body(Map.of("status", "missing_token"));
        }
        String token = auth.startsWith("Bearer ") ? auth.substring(7) : auth;
        if (token.isBlank()){
            return ResponseEntity.status(401).body(Map.of("status", "missing_token"));
        }
        String sql ="SELECT u.first_name, u.last_name FROM public.user AS u JOIN public.session_token AS s ON s.token = ? WHERE u.user_id <> s.user_id";
        var rows = jdbc.queryForList(sql, token);
        return ResponseEntity.ok(rows);
    } 

    @GetMapping("/get-me")
        public ResponseEntity<?> getMe(@RequestHeader("Authorization") String auth){
        if (auth == null || auth.isBlank()){
            return ResponseEntity.status(401).body(Map.of("status", "missing_token"));
        }
        String token = auth.startsWith("Bearer ") ? auth.substring(7) : auth;
        if (token.isBlank()){
            return ResponseEntity.status(401).body(Map.of("status", "missing_token"));
        }
        String sql ="SELECT email, first_name, last_name, phone_number FROM public.user AS u JOIN public.session_token AS s ON s.token = ? WHERE u.user_id = s.user_id";
        var rows = jdbc.queryForList(sql, token);
        System.out.println(rows);
        return ResponseEntity.ok(rows);
    } 
}
