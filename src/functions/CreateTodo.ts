import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import Todo from "../entity/Todo";
import { TodoValidator } from "../validators";
import initializeDataSource from "../initializeDataSource";
import errorHandler from "../errorHandler";

async function CreateTodo(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        await initializeDataSource();
        const body = await request.json();
        const validation = TodoValidator.validate(body);
        if (validation.error) {
            throw validation.error;
        }

        const { name, completed, profile_id } = validation.value;
        const todo = new Todo();
        todo.initialize(name, completed ? 'Y' : 'N', profile_id);
        await todo.save();

        return {
            status: 201,
            jsonBody: {
                id: todo.id,
                name,
                completed,
                profile_id,
            }
        }
    } catch (error) {
        context.error(error);
        return errorHandler(error);
    }
}

app.http('CreateTodo', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'todos',
    handler: CreateTodo
});
