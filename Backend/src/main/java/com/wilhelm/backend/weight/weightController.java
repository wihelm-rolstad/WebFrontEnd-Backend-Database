package com.wilhelm.backend.weight;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class weightController {

    private final JdbcTemplate jdbc;

    public weightController(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    @PostMapping("/register-weight")
    public ResponseEntity<Map<String,String>> reigsterWeight(@RequestBody weightRequest body){
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
}
