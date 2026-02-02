package com.wilhelm.backend.workout;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class workoutController {

    private final JdbcTemplate jdbc;

    public workoutController(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    @PostMapping("/register-workout")
    public ResponseEntity<?> registerWorkout(@RequestBody workoutRequest body){
          if(!(body.getSessionToken().equals("null"))){
                System.out.println("workout register hit the backend");
                String sql = ("INSERT INTO public.workout (user_id, workout_date, workout_type, workout_note, workout_duration) SELECT st.user_id, ?, ?, ?, ? FROM public.session_token AS st WHERE st.token=? and st.expires_at > now() and st.revoked_at is null");
                int rows = jdbc.update(sql, body.getDate(), body.getType(), body.getNote(), body.getDuration(), body.getSessionToken());
                if(rows > 0){
                    ResponseEntity<?> workoutData = fetchWorkouts(body.getSessionToken());
                    return workoutData;
                } else {
                    return ResponseEntity.ok(Map.of("status", "invalid"));
                }
            } else {
                return ResponseEntity.ok(Map.of("status", "invalid"));
            }
    }

    public ResponseEntity<?> fetchWorkouts(String sessionToken){
        String sql = ("SELECT workout_date, workout_type, workout_note, workout_duration FROM public.workout WHERE user_id = (SELECT user_id FROM public.session_token WHERE token = ?)");
        var rows = jdbc.queryForList(sql, sessionToken);
        return ResponseEntity.ok(Map.of("status","ok","rows", rows));
    }
    
    
}
