import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoItem } from "./TodoItem";
import { Todo } from "@/types/todo";

describe("TodoItem", () => {
  const mockTodo: Todo = {
    id: 1,
    text: "Test task",
    completed: false,
  };

  it("should render todo text", () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);

    expect(screen.getByText("Test task")).toBeInTheDocument();
  });

  it("should render checkbox", () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("should render checked checkbox for completed todo", () => {
    const completedTodo: Todo = { ...mockTodo, completed: true };
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoItem todo={completedTodo} onToggle={mockToggle} onDelete={mockDelete} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("should call onToggle when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  it("should call onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);

    const deleteButton = screen.getByRole("button", { name: "削除" });
    await user.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it("should apply line-through style to completed todo", () => {
    const completedTodo: Todo = { ...mockTodo, completed: true };
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoItem todo={completedTodo} onToggle={mockToggle} onDelete={mockDelete} />);

    const text = screen.getByText("Test task");
    expect(text).toHaveClass("line-through");
  });

  it("should not apply line-through style to incomplete todo", () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);

    const text = screen.getByText("Test task");
    expect(text).not.toHaveClass("line-through");
  });

  it("should render delete button", () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);

    const deleteButton = screen.getByRole("button", { name: "削除" });
    expect(deleteButton).toBeInTheDocument();
  });

  it("should handle multiple clicks", async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    await user.click(checkbox);
    await user.click(checkbox);

    expect(mockToggle).toHaveBeenCalledTimes(3);
  });
});
