

import TodoApp from "./TodoApp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">To-Do-List</h1>
    
      <TodoApp />
    </main>
  );
}
