import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import Todo from "../entity/Todo";
import errorHandler from "../errorHandler";
import initializeDataSource from "../initializeDataSource";
import { TodoValidator, IdValidator } from "../validators";
import formatTodo from "./formatTodo";

export async function UpdateTodo(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        await initializeDataSource();
        const body = await request.json();
        const bodyValidation = TodoValidator.validate(body);
        if (bodyValidation.error) {
            throw bodyValidation.error;
        }

        const idValidation = IdValidator.validate(request.params.id);
        if (idValidation.error) {
            throw idValidation.error;
        }

        const { name, completed } = bodyValidation.value;
        const id = idValidation.value;

        const completedAsString = completed ? 'Y' : 'N';

        const todo = await Todo.findOneBy({ id });
        if (!todo) {
            return {
                status: 404,
                jsonBody: {
                    message: "Item not found",
                }
            }
        }

        todo.name = name;
        todo.completed = completedAsString;
        await todo.save();

        return {
            status: 200,
            jsonBody: formatTodo(todo),
        }
    } catch (error) {
        context.error(error);
        return errorHandler(error);
    }
};

app.http('updateTodo', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    route: 'todos/{id:int}',
    handler: UpdateTodo
});
