package com.berisha.jwtauthentication.message.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ChangePassword {

    @NotBlank
    @Size( min = 6, max = 40 )
    private String password;
    @JsonProperty( value = "password" )
    private String newPassword;

    public ChangePassword() {
    }

    public ChangePassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
