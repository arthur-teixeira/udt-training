import { HttpResponseInit } from "@azure/functions"
import Joi from "joi"

export default function(error: any): HttpResponseInit {
    if (error instanceof Joi.ValidationError) {
        return {
            status: 400,
            jsonBody: {
                message: error.message,
            }
        }
    }

    return {
        status: 500,
        jsonBody: {
            message: "An unexpected error ocurred.",
        }
    }
}
