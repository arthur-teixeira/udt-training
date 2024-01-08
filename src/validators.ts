import joi from "joi";

export const TodoValidator = joi.object({
    name: joi.string().required(),
    completed: joi.boolean().optional().default(false),
    profile_id: joi.string().required(),
});

export const IdValidator = joi.number().required();


