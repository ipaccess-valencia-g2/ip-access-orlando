const expressValidator = require('express-validator');

const Validate = (req, res, next) =>
{
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty())
    {
        let error = {};
        errors.array().map((err) => (error[err.param] = err.msg));
        return res.status(422).json({ error })
    }
    next();
};
export default Validate;