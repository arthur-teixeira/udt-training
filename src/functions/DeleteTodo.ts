import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import Todo from "../entity/Todo";
import initializeDataSource from "../initializeDataSource";
import { IdValidator } from "../validators";

export async function DeleteTodo(request: HttpRequest): Promise<HttpResponseInit> {
    await initializeDataSource();

    const idValidation = IdValidator.validate(request.params.id);
    if (idValidation.error) {
        throw idValidation.error;
    }

    const id = idValidation.value;

    const todo = await Todo.findOneBy({ id });
    if (!todo) {
        return {
            status: 404,
            jsonBody: {
                message: "Item not found.",
            }
        }
    }

    await todo.remove();
};

app.http('DeleteTodo', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'todos/{id:int}',
    handler: DeleteTodo
});
