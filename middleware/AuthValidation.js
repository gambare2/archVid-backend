import Joi from 'joi';


const registerValidation = (req, res, next ) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        phoneno: Joi.string().required().phoneno(),
        password: Joi.string().required().password(),
    })
    const {error, value} = schema.validate(req.body);
    if (error){
        return res.status(400).json({
            message: "Bad request", error
        });
    }
    req.body = value;
    next()
}





export default registerValidation;