const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur crée" }))
        .catch((err) =>
          res
            .status(500)
            .json({ message: "Problème survenu lors de l'inscription" })
        );
    })
    .catch((err) => res.status(500).json({ err }));
};

// Login
// trouver l'adress en DB
// if pas d'adress, 400 => brouillage de pistes "paire incompatible"
// vérification des hash de mdp
// attribution d'un jwt set sur un jour

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "Paire utilisateur / mot de passe invalide" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({
              message: "Paire utilisateur / mot de passe invalide",
            });
          } else {
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                {
                  userId: user._id,
                },
                "TOKEN_RANDOM_SECRET",
                {
                  expiresIn: "24h",
                }
              ),
            });
          }
        })
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};
