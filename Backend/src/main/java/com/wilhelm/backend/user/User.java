package com.wilhelm.backend.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(name = "phone_number")
  private String phoneNumber;

  // Hvis du har password-kolonne i DB:
  @Column(nullable = false)
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // kan sendes inn, men ikke returneres i JSON
  private String password;

  protected User() {} // JPA

  public User(String firstName, String lastName, String email, String phoneNumber, String password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }

  public Long getId() { return id; }
  public String getFirstName() { return firstName; }
  public String getLastName() { return lastName; }
  public String getEmail() { return email; }
  public String getPhoneNumber() { return phoneNumber; }
}