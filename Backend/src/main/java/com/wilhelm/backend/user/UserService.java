package com.wilhelm.backend.user;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

  private final UserRepository repo;

  public UserService(UserRepository repo) {
    this.repo = repo;
  }

  public List<User> getAllUsers() {
    return repo.findAll();
  }

  public User createUser(User user) {
    if (repo.existsByEmail(user.getEmail())) {
      throw new IllegalArgumentException("Email already exists");
    }
    return repo.save(user); // INSERT skjer her
  }
}