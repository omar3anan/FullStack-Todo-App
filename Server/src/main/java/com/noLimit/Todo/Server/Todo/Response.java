package com.noLimit.Todo.Server.Todo;

//@JsonIgnoreProperties(value = {"status","message"})
public class Response {
    // @JsonIgnore
    private String status;
    private String message;
    private Object data;

    public Response(String status, String message, Object data) {
        super();
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public Response() {
        super();
    }

    public String getstatus() {
        return status;
    }

    public void setstatus(String status) {
        this.status = status;
    }

    public String getmessage() {
        return message;
    }

    public void setmessage(String message) {
        this.message = message;
    }

    public Object getdata() {
        return data;
    }

    public void setdata(Object data) {
        this.data = data;
    }

}
