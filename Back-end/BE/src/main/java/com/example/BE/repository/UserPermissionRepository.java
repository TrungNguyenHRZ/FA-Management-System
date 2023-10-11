package com.example.BE.repository;


import com.example.BE.model.entity.UserPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPermissionRepository extends JpaRepository<UserPermission, String> {

    Optional<UserPermission> findFirstByRole(String role);
}
