package com.noLimit.Todo.Server.Todo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataJPARepository extends JpaRepository<Todo, Integer> {
	List<Todo>findByUsername(String username);


}
