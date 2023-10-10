package com.example.BE.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.BE.model.entity.User;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User,Integer>{

	@Query(value = "Select * from users where userid = :userid", nativeQuery = true)
	User getUserById(int userid);

}
