import Todo from "../entity/Todo";

export default function formatTodo(todo: Todo) {
    return {
        id: todo.id,
        name: todo.name,
        completed: todo.completed === 'Y',
        profile_id: todo.profile_id,
    }
};


