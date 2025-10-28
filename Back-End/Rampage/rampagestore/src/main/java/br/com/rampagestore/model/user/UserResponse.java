package br.com.rampagestore.model.user;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private User user;
    private List<UserAddress> userAdresses;

    public UserResponse(User user, List<UserAddress> userAddresses){
        this.user = user;
        this.userAdresses = userAddresses;
    }
}
