import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./TodoList";
import { Todo } from "@/types/todo";

describe("TodoList", () => {
  const mockTodos: Todo[] = [
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: true },
    { id: 3, text: "Task 3", completed: false },
  ];

  it("should render empty message when there are no todos", () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoList todos={[]} onToggleTodo={mockToggle} onDeleteTodo={mockDelete} />);

    expect(screen.getByText("タスクがありません。新しいタスクを追加してください。")).toBeInTheDocument();
  });

  it("should render all todos", () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoList todos={mockTodos} onToggleTodo={mockToggle} onDeleteTodo={mockDelete} />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });

  it("should render correct number of checkboxes", () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoList todos={mockTodos} onToggleTodo={mockToggle} onDeleteTodo={mockDelete} />);

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);
  });

  it("should call onToggleTodo when a checkbox is clicked", async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoList todos={mockTodos} onToggleTodo={mockToggle} onDeleteTodo={mockDelete} />);

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);

    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  it("should call onDeleteTodo when delete button is clicked", async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoList todos={mockTodos} onToggleTodo={mockToggle} onDeleteTodo={mockDelete} />);

    const deleteButtons = screen.getAllByRole("button", { name: "削除" });
    await user.click(deleteButtons[1]);

    expect(mockDelete).toHaveBeenCalledWith(2);
  });

  it("should not render empty message when todos exist", () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoList todos={mockTodos} onToggleTodo={mockToggle} onDeleteTodo={mockDelete} />);

    expect(screen.queryByText("タスクがありません。新しいタスクを追加してください。")).not.toBeInTheDocument();
  });

  it("should render a single todo", () => {
    const singleTodo: Todo[] = [{ id: 1, text: "Single task", completed: false }];
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoList todos={singleTodo} onToggleTodo={mockToggle} onDeleteTodo={mockDelete} />);

    expect(screen.getByText("Single task")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(1);
  });

  it("should handle todos with different completion states", () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoList todos={mockTodos} onToggleTodo={mockToggle} onDeleteTodo={mockDelete} />);

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  it("should render all delete buttons", () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoList todos={mockTodos} onToggleTodo={mockToggle} onDeleteTodo={mockDelete} />);

    const deleteButtons = screen.getAllByRole("button", { name: "削除" });
    expect(deleteButtons).toHaveLength(3);
  });
});
