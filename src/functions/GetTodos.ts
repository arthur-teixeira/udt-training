import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import Todo from "../entity/Todo";
import errorHandler from "../errorHandler";
import initializeDataSource from "../initializeDataSource";
import formatTodo from "./formatTodo";

async function GetTodos(_request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        await initializeDataSource();
        const todos = await Todo.find();

        return {
            status: 200,
            jsonBody: todos.map(formatTodo),
        };
    } catch (error) {
        context.error(error);
        return errorHandler(error);
    }
};

app.http('GetTodos', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'todos',
    handler: GetTodos,
});
