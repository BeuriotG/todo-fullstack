const Task = require("../models/task");

exports.findTasks = (req, res, next) => {
  Task.find({ userId: req.auth.userId })
    .then((task) => res.status(200).json({ task }))
    .catch((err) => res.status(500).json({ err }));
};

exports.findOneTask = (req, res, next) => {
  Task.findOne({ _id: req.params.id })
    .then((task) => {
      if (!task) {
        res.status(404).json({ message: "Tâche introuvable" });
      } else if (task.userId !== req.auth.userId) {
        res.status(401).json({ message: "Vous n'avez pas l'authorisation " });
      } else {
        res.status(200).json({ task });
      }
    })

    .catch((err) => res.status(400).json({ err }));
};

exports.createTask = (req, res, next) => {
  delete req.body._id;
  const task = new Task({
    ...req.body,
    userId: req.auth.userId,
    status: "todo",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  task
    .save()
    .then(() => res.status(201).json({ message: "Tâche créée", body: task }))
    .catch((err) => res.status(500).json({ err }));
};

exports.updateOneTask = (req, res, next) => {
  Task.findOne({ _id: req.params.id })
    .then((task) => {
      if (!task) {
        res.status(404).json({ message: "Tâche introuvable" });
      } else if (task.userId !== req.auth.userId) {
        res.status(401).json({ message: "Non authorisé" });
      } else {
        Task.updateOne(
          { _id: req.params.id },
          { ...req.body, _id: req.params.id, updatedAt: Date.now() }
        )
          .then(() => res.status(200).json({ message: "Tâche modifiée" }))
          .catch((err) => res.status(400).json({ err }));
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.deleteOneTask = (req, res, next) => {
  Task.findOne({ _id: req.params.id })
    .then((task) => {
      if (!task) {
        res.status(404).json({ message: "Tâche introuvable" });
      } else if (task.userId !== req.auth.userId) {
        res.status(401).json({ message: "Non authorisé" });
      } else {
        Task.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Tâche supprimée" }))
          .catch((err) => res.status(400).json({ err }));
      }
    })
    .catch((err) => res.status(500).json({ err }));
};
