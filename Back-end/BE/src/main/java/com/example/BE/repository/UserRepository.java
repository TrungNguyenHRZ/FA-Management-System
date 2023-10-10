package com.example.BE.repository;

import org.mapstruct.control.MappingControl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.BE.model.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User,Integer>{

	@Query(value = "Select * from users where userid = :userid", nativeQuery = true)
	User getUserById(int userid);

	Optional<User> findByEmail(String email);

	Optional<User> findByUserId(Integer userId);

}
