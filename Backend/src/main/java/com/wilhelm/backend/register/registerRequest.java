package com.wilhelm.backend.register;

public class registerRequest {

    private String email;
    private String phoneNumber;
    private String password;
    private String firstName;
    private String lastName;
    
    public registerRequest(String email, String phoneNumber, String password, String firstName, String lastName ){
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public registerRequest(){

    }

    public String getEmail(){
        return this.email;
    }

    public String getPhoneNumber(){
        return this.phoneNumber;
    }

    public String getPassword(){
        return this.password;
    }

    public String getFirstName(){
        return this.firstName;
    }

    public String getLastName(){
        return this.lastName;
    }
}
