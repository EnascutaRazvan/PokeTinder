package com.fiipractic.authentification.repository;

import com.fiipractic.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthentificationRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
