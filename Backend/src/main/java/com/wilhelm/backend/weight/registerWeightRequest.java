package com.wilhelm.backend.weight;

import java.time.LocalDate;

public class registerWeightRequest {

    private String sessionToken;
    private Double weight;
    private LocalDate date;

    public registerWeightRequest(String sessionToken, Double weight, LocalDate date){
        this.sessionToken = sessionToken;
        this.weight = weight;
        this.date = date;
    }

    public registerWeightRequest(){

    }

    public String getSessionToken(){
        return this.sessionToken;
    }

    public Double getWeight(){
        return this.weight;
    }

    public LocalDate getDate(){
        return this.date;
    }
}