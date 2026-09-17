package com.example.demo.dto;

import com.example.demo.entity.SystemUser;
import com.example.demo.entity.SystemUser.Role;



public class RegisterDto {
    private String username;
    private String password;
    private SystemUser.Role role;

    

    public RegisterDto() {
    }



    public RegisterDto(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }



    public String getUsername() {
        return username;
    }



    public void setUsername(String username) {
        this.username = username;
    }



    public String getPassword() {
        return password;
    }



    public void setPassword(String password) {
        this.password = password;
    }



    public SystemUser.Role getRole() {
        return role;
    }



    public void setRole(SystemUser.Role role) {
        this.role = role;
    }

    
    


}