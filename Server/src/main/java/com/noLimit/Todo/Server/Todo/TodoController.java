package com.noLimit.Todo.Server.Todo;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
// @RequestMapping("/todo")
public class TodoController {
	private SpringDataJPARepository theService;

	public TodoController(SpringDataJPARepository theService) {
		this.theService = theService;
	}

	@GetMapping("/users/{username}/todos")
	public Response getAllTodos(@PathVariable String username) {
		List<Todo> todos = theService.findByUsername(username);
		return new Response("Success", "Get All Todos", todos);
	}

	@GetMapping("/users/{username}/todos/{id}")
	public Response getByIdTodo(@PathVariable String username, @PathVariable int id) {
		List<Todo> todos = theService.findByUsername(username);
		// Todo theTodo2=todos.get(id;)
		Optional<Todo> theTodo = theService.findById(id);
		if (theTodo.isEmpty() || id < 0)
			throw new RuntimeException("User not found " + id);
		return new Response("Success", "Get Todo By ID", theTodo);
	}

	@DeleteMapping("/users/{username}/todos/{id}")
	public Response deleteByIdTodo(@PathVariable String username, @PathVariable int id) {
		Optional<Todo> theTodo = theService.findById(id);
		if (theTodo.isEmpty() || id < 0)
			throw new RuntimeException("User not found " + id);
		theService.deleteById(id);
		return new Response("Success", "Delete Todo By ID", theTodo);
	}

	@PostMapping("/users/{username}/todos")
	public Response AddTodo(@Valid @RequestBody Todo theTodo, @PathVariable String username) {
		theTodo.setUsername(username); // msh 7a7ot username fyl body
		theTodo.setId(null);
		theService.save(theTodo);
		return new Response("Success", "Created Todo", theTodo);
	}

	@PutMapping("/users/{username}/todos/{id}") // save
	public Response UpdateUser(@Valid @RequestBody Todo theTodo, @PathVariable String username, @PathVariable int id) {
		theTodo.setUsername(username);
		theTodo.setId(id);
		theService.save(theTodo);
		return new Response("Success", "Update Todo Id ", theTodo);
	}

	// id is null ==> creating new todo
	// id carry value ==> update

}
