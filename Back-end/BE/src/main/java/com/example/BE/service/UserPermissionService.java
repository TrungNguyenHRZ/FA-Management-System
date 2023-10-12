package com.example.BE.service;


public interface UserPermissionService {

    boolean checkCreatePermission(String userPermission);

    boolean checkReadPermission(String userPermission);

    boolean checkUpdatePermission(String userPermission);

    boolean checkImportPermission(String userPermission);
}
