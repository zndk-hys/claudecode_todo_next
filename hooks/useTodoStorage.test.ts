import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTodoStorage } from "./useTodoStorage";

describe("useTodoStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("todos", JSON.stringify([]));
  });

  it("should initialize with empty todos array", () => {
    const { result } = renderHook(() => useTodoStorage());
    expect(result.current.todos).toEqual([]);
  });

  it("should add a new todo", () => {
    const { result } = renderHook(() => useTodoStorage());

    act(() => {
      result.current.addTodo("Test task");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe("Test task");
    expect(result.current.todos[0].completed).toBe(false);
  });

  it("should not add empty todo", () => {
    const { result } = renderHook(() => useTodoStorage());

    act(() => {
      result.current.addTodo("   ");
    });

    expect(result.current.todos).toHaveLength(0);
  });

  it("should toggle todo completion status", () => {
    const { result } = renderHook(() => useTodoStorage());

    act(() => {
      result.current.addTodo("Test task");
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(true);

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(false);
  });

  it("should delete a todo by id", () => {
    const { result } = renderHook(() => useTodoStorage());

    act(() => {
      result.current.addTodo("Task to keep");
    });

    const todoId = result.current.todos[result.current.todos.length - 1].id;

    act(() => {
      result.current.deleteTodo(todoId);
    });

    expect(result.current.todos.find((t) => t.id === todoId)).toBeUndefined();
  });

  it("should persist todos to localStorage", () => {
    const { result } = renderHook(() => useTodoStorage());

    const uniqueText = `Persistent_${Date.now()}`;

    act(() => {
      result.current.addTodo(uniqueText);
    });

    const savedData = localStorage.getItem("todos");
    expect(savedData).toBeTruthy();

    const parsedData = JSON.parse(savedData!);
    const savedTodo = parsedData.find((t: any) => t.text === uniqueText);
    expect(savedTodo).toBeDefined();
    expect(savedTodo.text).toBe(uniqueText);
  });
});
