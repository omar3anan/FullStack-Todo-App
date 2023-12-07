package com.noLimit.Todo.Server.HelloVsBean;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/basicauth")
    public String basicAuthCheck() {
        return "Success";
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello World TEXTTTTTT";
    }

    @GetMapping("/hello-bean")
    public HelloBean helloBean() {
        return new HelloBean("Hello World BEAN");
    }

    @GetMapping("/hello-bean/{name}")
    public HelloBean helloBeanWithName(@PathVariable String name) {
        return new HelloBean(String.format("Hello World , %s", name));
    }

}
