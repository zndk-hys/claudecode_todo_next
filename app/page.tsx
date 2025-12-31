"use client";

import { TodoInput } from "@/components/TodoInput";
import { TodoList } from "@/components/TodoList";
import { TodoStats } from "@/components/TodoStats";
import { useTodoStorage } from "@/hooks/useTodoStorage";

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStorage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          TODOリスト
        </h1>

        <TodoInput onAddTodo={addTodo} />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
          />
          <TodoStats todos={todos} />
        </div>
      </div>
    </div>
  );
}
