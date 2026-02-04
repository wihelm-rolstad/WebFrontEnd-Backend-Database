package com.wilhelm.backend.weight;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "https://fitness-app-amber-xi-29.vercel.app")
@RestController
public class weightController {

    private final JdbcTemplate jdbc;

    public weightController(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    @PostMapping("/register-weight")
    public ResponseEntity<Map<String,String>> registerWeight(@RequestBody registerWeightRequest body){
            if(!(body.getSessionToken().equals("null"))){
                System.out.println("Weight register hit the backend");
                String sql = "INSERT INTO public.weight (user_id, weight, recorded_at) SELECT st.user_id, ?, ? FROM public.session_token AS st WHERE st.token=? and st.expires_at > now() and st.revoked_at is null;";
                int rows = jdbc.update(sql, body.getWeight(), body.getDate(), body.getSessionToken());
                System.out.println("number of rows effected: " + rows);
                return ResponseEntity.ok(Map.of("status", "ok"));
            } else {
                return ResponseEntity.ok(Map.of("status", "invalid"));
            }
    }

    @GetMapping("/get-weights")
    public ResponseEntity<?> getWeights(@RequestHeader("Authorization") String auth){
        if (auth == null || auth.isBlank()){
            return ResponseEntity.status(401).body(Map.of("status", "missing_token"));
        }
        String token = auth.startsWith("Bearer ") ? auth.substring(7) : auth;
        if (token.isBlank()){
            return ResponseEntity.status(401).body(Map.of("status", "missing_token"));
        }
        String sql = "SELECT weight, recorded_at FROM public.weight WHERE user_id = (SELECT user_id FROM public.session_token WHERE token = ?)";
        var rows = jdbc.queryForList(sql, token);
        if (rows.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("status", "invalid_token"));
        }
        return ResponseEntity.ok(rows);
    } 
}
