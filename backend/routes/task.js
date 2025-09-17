const express = require("express");
const taskCtrl = require("../controllers/task");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, taskCtrl.findTasks);

router.get("/:id", auth, taskCtrl.findOneTask);

router.post("/", auth, taskCtrl.createTask);

router.put("/:id", auth, taskCtrl.updateOneTask);

router.delete("/:id", auth, taskCtrl.deleteOneTask);

module.exports = router;
