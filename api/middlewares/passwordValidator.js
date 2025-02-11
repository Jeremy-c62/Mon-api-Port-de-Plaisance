
passwordSchema
    .is().min(10)
    .is().max(20)
    .has().uppercase(2)
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(400).json({ message: ' Mots de passe Invalide' });
    } else next();
}