import joi from "joi";
export const isValid = (req_body) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    notes: joi.array(),
  });
  return schema.validate(req_body);
};


export const isValidSignUp = (req_body) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    name:joi.string().required(),
    userName:joi.string().required(),
  });
  return schema.validate(req_body);
};

