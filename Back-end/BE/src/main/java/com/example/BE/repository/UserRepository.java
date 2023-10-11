package com.example.BE.repository;

import org.mapstruct.control.MappingControl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.BE.model.entity.User;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User,Integer>{

	@Query(value = "Select * from users where userid = :userid", nativeQuery = true)
	User getUserById(int userid);

	@Query(value = "select * from users where email = :email", nativeQuery = true)
	Optional<User> findByEmail(String email);

	Optional<User> findByUserId(Integer userId);

	@Query(
		value = "select * from users where (user_id_search like %:keyword% or email like %:keyword% or name like %:keyword%) ",
		countQuery = "select * from users where (user_id_search like %:keyword% or email like %:keyword% or name like %:keyword%) ",
		nativeQuery = true
	)
	Page<User> findAllWithSearch(@Param("keyword") String keyword, Pageable pageable);

}
