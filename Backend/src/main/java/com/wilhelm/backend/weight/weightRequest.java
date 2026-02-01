package com.wilhelm.backend.weight;

import java.time.LocalDate;

public class weightRequest {

    private String sessionToken;
    private int weight;
    private LocalDate date;

    public weightRequest(String sessionToken, int weight, LocalDate date){
        this.sessionToken = sessionToken;
        this.weight = weight;
        this.date = date;
    }

    public weightRequest(){

    }

    public String getSessionToken(){
        return this.sessionToken;
    }

    public int getWeight(){
        return this.weight;
    }

    public LocalDate getDate(){
        return this.date;
    }
}