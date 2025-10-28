package br.com.rampagestore.model;

import org.springframework.stereotype.Component;

@Component
public class ModelMessage {
    
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
