package com.wilhelm.backend.workout;

import java.time.LocalDate;

public class workoutRequest {
    private String sessionToken;
    private LocalDate date;
    private String type;
    private int duration;
    private String note;

    public workoutRequest(String sessionToken, LocalDate date, String type, int duration, String note){
        this.sessionToken = sessionToken;
        this.date = date;
        this.type = type;
        this.duration = duration;
        this.note = note;
    }

    public workoutRequest(){

    }  

    public String getSessionToken(){
        return this.sessionToken;
    }

    public LocalDate getDate(){
        return this.date;
    }

    public String getType(){
        return this.type;
    }

    public int getDuration(){
        return this.duration;
    }

    public String getNote(){
        return this.note;
    }

}
