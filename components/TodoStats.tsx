"use client";

import { Todo } from "@/types/todo";

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  if (todos.length === 0) return null;

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-400">
      <p>
        完了: {completedCount} / 全体: {totalCount}
      </p>
    </div>
  );
}
