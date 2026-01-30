package com.wilhelm.backend.register;

public class registerRequest {

    private String email;
    private String phoneNumber;
    private String password;
    
    public registerRequest(String email, String phoneNumber, String password){
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
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
}
