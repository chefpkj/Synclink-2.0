import joi from "joi";

export const searchFriendsApiValidations=(req,res,next)=>{
    const schema=joi.object({
        query:joi.string().required().messages({
            "string.base": "query must be a string.",
            "string.empty": "query cannot be empty.",
            "any.required": "Please provide {#label} in the request body."
        }),
        id:joi.string()
    }); 
    const { error } = schema.validate(req.body);
    if (error) {
    return res.status(400).json({status:400,message:error.details[0].message});
    }
    next();
}




export const addFriendsApiValidations=(req,res,next)=>{
    const schema=joi.object({
        userId:joi.string().required().messages({
            "string.base": "{#label} must be a string.",
            "string.empty": "{#label} cannot be empty.",
            "any.required": "Please provide {#label} in the request body."
        }),
        userName:joi.string().required().messages({
            "string.base": "{#label} must be a string.",
            "string.empty": "{#label} cannot be empty.",
            "any.required": "Please provide {#label} in the request body."
        }),
        name:joi.string().required().messages({
            "string.base": "{#label} must be a string.",
            "string.empty": "{#label} cannot be empty.",
            "any.required": "Please provide {#label} in the request body."
        }),
        email:joi.string().email().required().messages({
            "string.base": "{#label} must be a string.",
            "string.empty": "{#label} cannot be empty.",
            "any.required": "Please provide {#label} in the request body."
        }),
        

        id:joi.string()
    }); 
    const { error } = schema.validate(req.body);
    if (error) {
    return res.status(400).json({status:400,message:error.details[0].message});
    }
    next();
}