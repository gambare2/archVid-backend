import Joi from 'joi';


export const registerValidation = (req, res, next ) => {
    const schema = Joi.object({
        email: Joi.string().email().optional(),
    phoneno: Joi.string()
      .pattern(/^[0-9]{10}$/) 
      .optional(),
    password: Joi.string().min(6).required(),
  }).or("email", "phoneno");

    const {error, value} = schema.validate(req.body);
    if (error){
        return res.status(400).json({
            message: "Bad request", error
        });
    }
    req.body = value;
    next()
}

export const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        phonenoOremail: Joi.string().required(),
        password: Joi.string().required()
    }).or("phonenoOremail");
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request", error
        })
    }
    next()
};



