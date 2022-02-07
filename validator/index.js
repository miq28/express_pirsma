const { check, oneOf, validationResult } = require('express-validator');

const ValidateRegisterUser = [
    check('username')
        .trim()
        .isLength({ min: 5, max: 254 })
        .isAlphanumeric(),
    check('name')
        .trim()
        .isLength({ min: 2, max: 254 })
        .isAlpha('en-US',{ignore: " "}),
    check('email')
        .trim()
        .isLength({ min: 5, max: 254 })
        .isEmail()
        .normalizeEmail({
            all_lowercase: true
        }),
    check('password')
        .trim()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10
        }),
    // check('roleId')
    //     .isNumeric()
    //     .toInt()
]


const CheckValidatorResult = async (req, res, next) => {
    // console.log(req.body)
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next()
    } catch (err) {
        console.error({ err: err.message })
        return res.status(401).send({ err: err.message });
    }
};

module.exports = {
    ValidateRegisterUser,
    CheckValidatorResult
}