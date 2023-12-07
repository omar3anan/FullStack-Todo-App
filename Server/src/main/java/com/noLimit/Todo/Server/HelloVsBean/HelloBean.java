package com.noLimit.Todo.Server.HelloVsBean;

public class HelloBean {
    private String theMessage;

    public HelloBean(String theMessage) {
        this.theMessage = theMessage;
    }

    public String getMessage() {
        return this.theMessage;
    }
    
    public void setMessage(String theMessage) {
        this.theMessage = theMessage;
    }
    
}
