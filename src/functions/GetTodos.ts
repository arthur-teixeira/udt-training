import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import Todo from "../entity/Todo";
import errorHandler from "../errorHandler";
import initializeDataSource from "../initializeDataSource";
import formatTodo from "./formatTodo";

async function GetTodos(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        await initializeDataSource();
        const profile_id = request.params.profile;
        const todos = await Todo.findBy({ profile_id });

        return {
            status: 200,
            jsonBody: todos.map(formatTodo),
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        };
    } catch (error) {
        context.error(error);
        return errorHandler(error);
    }
};

app.http('GetTodos', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'todos/{profile}',
    handler: GetTodos,
});
