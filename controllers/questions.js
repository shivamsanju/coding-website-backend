const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Questions = require("../models/questionModel");
const sequelize = require("../config/db");

exports.getAllQuestions = catchAsyncErrors(async (req, res, next) => {
  const questions = await Questions.findAll({
    order: [
      [
        sequelize.literal(
          `CASE difficulty
            WHEN 'Easy' THEN 1 
            WHEN 'Medium' THEN 2
            WHEN 'Hard' THEN 3
          END`
        ),
      ],
      [
        'id', 'ASC'
      ]
    ],
  });

  res.status(200).json({
    success: true,
    questions,
  });
});

exports.getStatus = catchAsyncErrors(async (req, res, next) => {
  const status = await Questions.findAll({
    attributes: ["done"],
  });

  let statusArray = status.map((ques) => ques.dataValues.done);
  res.status(200).json({
    success: true,
    status: statusArray,
  });
});

exports.setStatus = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  let { id, currStatus } = req.body;
  const question = await Questions.findOne({ where: { id: id } });
  await question.set({ done: currStatus });
  await question.save();
  console.log("done");

  res.status(200).json({
    success: true,
    message: "Status updated successfully",
  });
});
