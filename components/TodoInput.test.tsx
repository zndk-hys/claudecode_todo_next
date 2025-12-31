import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoInput } from "./TodoInput";

describe("TodoInput", () => {
  it("should render input field and button", () => {
    const mockAddTodo = vi.fn();
    render(<TodoInput onAddTodo={mockAddTodo} />);

    expect(screen.getByPlaceholderText("新しいタスクを入力...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();
  });

  it("should update input value when typing", async () => {
    const user = userEvent.setup();
    const mockAddTodo = vi.fn();
    render(<TodoInput onAddTodo={mockAddTodo} />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");

    await user.type(input, "New task");

    expect(input).toHaveValue("New task");
  });

  it("should call onAddTodo when button is clicked", async () => {
    const user = userEvent.setup();
    const mockAddTodo = vi.fn();
    render(<TodoInput onAddTodo={mockAddTodo} />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    const button = screen.getByRole("button", { name: "追加" });

    await user.type(input, "Test task");
    await user.click(button);

    expect(mockAddTodo).toHaveBeenCalledWith("Test task");
  });

  it("should call onAddTodo when Enter key is pressed", async () => {
    const user = userEvent.setup();
    const mockAddTodo = vi.fn();
    render(<TodoInput onAddTodo={mockAddTodo} />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");

    await user.type(input, "Test task{Enter}");

    expect(mockAddTodo).toHaveBeenCalledWith("Test task");
  });

  it("should clear input after submission", async () => {
    const user = userEvent.setup();
    const mockAddTodo = vi.fn();
    render(<TodoInput onAddTodo={mockAddTodo} />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    const button = screen.getByRole("button", { name: "追加" });

    await user.type(input, "Test task");
    await user.click(button);

    expect(input).toHaveValue("");
  });

  it("should handle empty input submission", async () => {
    const user = userEvent.setup();
    const mockAddTodo = vi.fn();
    render(<TodoInput onAddTodo={mockAddTodo} />);

    const button = screen.getByRole("button", { name: "追加" });

    await user.click(button);

    expect(mockAddTodo).toHaveBeenCalledWith("");
  });

  it("should submit multiple times", async () => {
    const user = userEvent.setup();
    const mockAddTodo = vi.fn();
    render(<TodoInput onAddTodo={mockAddTodo} />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    const button = screen.getByRole("button", { name: "追加" });

    await user.type(input, "Task 1");
    await user.click(button);

    await user.type(input, "Task 2");
    await user.click(button);

    expect(mockAddTodo).toHaveBeenCalledTimes(2);
    expect(mockAddTodo).toHaveBeenNthCalledWith(1, "Task 1");
    expect(mockAddTodo).toHaveBeenNthCalledWith(2, "Task 2");
  });
});
