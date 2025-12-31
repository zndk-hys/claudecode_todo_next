import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TodoStats } from "./TodoStats";
import { Todo } from "@/types/todo";

describe("TodoStats", () => {
  it("should return null when todos array is empty", () => {
    const { container } = render(<TodoStats todos={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("should display correct stats for single incomplete todo", () => {
    const todos: Todo[] = [
      { id: 1, text: "Task 1", completed: false },
    ];

    render(<TodoStats todos={todos} />);

    expect(screen.getByText("完了: 0 / 全体: 1")).toBeInTheDocument();
  });

  it("should display correct stats for single completed todo", () => {
    const todos: Todo[] = [
      { id: 1, text: "Task 1", completed: true },
    ];

    render(<TodoStats todos={todos} />);

    expect(screen.getByText("完了: 1 / 全体: 1")).toBeInTheDocument();
  });

  it("should display correct stats for multiple todos", () => {
    const todos: Todo[] = [
      { id: 1, text: "Task 1", completed: false },
      { id: 2, text: "Task 2", completed: true },
      { id: 3, text: "Task 3", completed: false },
      { id: 4, text: "Task 4", completed: true },
      { id: 5, text: "Task 5", completed: true },
    ];

    render(<TodoStats todos={todos} />);

    expect(screen.getByText("完了: 3 / 全体: 5")).toBeInTheDocument();
  });

  it("should display stats when all todos are completed", () => {
    const todos: Todo[] = [
      { id: 1, text: "Task 1", completed: true },
      { id: 2, text: "Task 2", completed: true },
    ];

    render(<TodoStats todos={todos} />);

    expect(screen.getByText("完了: 2 / 全体: 2")).toBeInTheDocument();
  });

  it("should display stats when no todos are completed", () => {
    const todos: Todo[] = [
      { id: 1, text: "Task 1", completed: false },
      { id: 2, text: "Task 2", completed: false },
      { id: 3, text: "Task 3", completed: false },
    ];

    render(<TodoStats todos={todos} />);

    expect(screen.getByText("完了: 0 / 全体: 3")).toBeInTheDocument();
  });

  it("should update when todos change", () => {
    const initialTodos: Todo[] = [
      { id: 1, text: "Task 1", completed: false },
      { id: 2, text: "Task 2", completed: false },
    ];

    const { rerender } = render(<TodoStats todos={initialTodos} />);
    expect(screen.getByText("完了: 0 / 全体: 2")).toBeInTheDocument();

    const updatedTodos: Todo[] = [
      { id: 1, text: "Task 1", completed: true },
      { id: 2, text: "Task 2", completed: false },
    ];

    rerender(<TodoStats todos={updatedTodos} />);
    expect(screen.getByText("完了: 1 / 全体: 2")).toBeInTheDocument();
  });

  it("should handle large number of todos", () => {
    const todos: Todo[] = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      text: `Task ${i + 1}`,
      completed: i % 2 === 0,
    }));

    render(<TodoStats todos={todos} />);

    expect(screen.getByText("完了: 50 / 全体: 100")).toBeInTheDocument();
  });
});
