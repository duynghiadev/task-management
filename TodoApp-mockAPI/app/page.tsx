import Image from "next/image";
import { TodoList } from "@/components/elements/TodoList";

export default function Home() {
  return (
    <main>
      <h2>TODO Sample（React-Hook-Form）</h2>
      <TodoList />
    </main>
  );
}
