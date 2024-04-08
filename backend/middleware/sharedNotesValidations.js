import joi from "joi";

export const addNewSharedNotesApiValidations=async (req,res,next)=>{

    const schema=joi.object({
        userId:joi.string().required().messages({
            "string.base": "{#label} must be a string.",
            "string.empty": "{#label} cannot be empty.",
            "any.required": "Please provide {#label} in the request body."
        }),
        note:joi.string().required().messages({
            "string.base": "{#label} must be a string.",
            "string.empty": "{#label} cannot be empty.",
            "any.required": "Please provide {#label} in the request body."
        }),
        id:joi.string(),
        myUserName:joi.string(),
        myEmail:joi.string()
    }); 

    const { error } = schema.validate(req.body);
    if (error) {
    return res.status(400).json({status:400,message:error.details[0].message});
    }
    next();
}

export const deleteSharedNotesApiValidations=async (req,res,next)=>{

    const schema=joi.object({
        notesId:joi.string().required().messages({
            "string.base": "{#label} must be a string.",
            "string.empty": "{#label} cannot be empty.",
            "any.required": "Please provide {#label} in the request body."
        }),   
        id:joi.string(),
    }); 

    const { error } = schema.validate(req.body);
    if (error) {
    return res.status(400).json({status:400,message:error.details[0].message});
    }
    next();
}