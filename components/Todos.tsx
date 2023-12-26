import { useEffect, useState } from "react";
import axios from 'axios';
import { TodoType } from '../types/Todo';
import Todo from './Todo';
import Link from 'next/link';

const Todos = () => {
  const [ todos, setTodos ] = useState<TodoType[]>([]);

  // Todo一覧の取得 関数
  const fetchTodos = async () => {

    try {
      const res = await axios.get<TodoType[]>('http://loocalhost:3000/todos');
      setTodos(res.data); //Todo一覧をStateにセット
    } catch (err) {
      console.log(err);
    }
  };

  //コンポーネントがマウントされた時にTodo一覧の取得
  useEffect(() => {
    fetchTodos();
  },[]);

  return (
    <div className="space-y-6 w-3/4 max-w-lg pt-10">
      <label className="block text-xl font-bold text-gray-700">
        Todo一覧
      </label>
      <div className="items-center justify-center">
        {todos.map((todo) => (
          <Link
            href={`todos/${todo.id}`}
            key={todo.id}
          >
            <Todo todo={todo} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Todos;