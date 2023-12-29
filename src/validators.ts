import joi from "joi";

export const TodoValidator = joi.object({
    name: joi.string().required(),
    completed: joi.boolean().optional().default(false),
});

export const IdValidator = joi.number().required();


