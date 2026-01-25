package com.wilhelm.backend;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DbPingController {

  private final JdbcTemplate jdbc;

  public DbPingController(JdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  @GetMapping("/api/db-ping")
  public Map<String, Object> oneRow() {
    return jdbc.queryForMap("select * from public.users limit 1");
  }
}
