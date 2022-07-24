const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Questions = require('../models/questionModel');
const sequelize = require('../config/db');
const questions = require('../data/questions');

exports.getAllQuestions = catchAsyncErrors(async (req, res, next) => {
  const questions = await Questions.findAll({
    where: {
      userId: req.user,
    },
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
      ['id', 'ASC'],
    ],
  });

  if (questions) {
    res.status(200).json({
      success: true,
      questions,
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'unauthorized',
    });
  }
});

exports.getStatus = catchAsyncErrors(async (req, res, next) => {
  const status = await Questions.findAll({
    attributes: ['done'],
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
  const question = await Questions.findOne({
    where: { id: id, userId: req.user },
  });
  if (question) {
    await question.set({ done: currStatus });
    await question.save();
    console.log('done');
    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'unauthorized',
    });
  }
});

exports.setNotes = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  let { id, notesHeader, noteData } = req.body;
  const question = await Questions.findOne({
    where: { id: id, userId: req.user },
  });
  if (question) {
    await question.set({ notes_header: notesHeader, notes: noteData });
    await question.save();
    console.log('done');
    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'unauthorized',
    });
  }
});

exports.getLeaderBoard = catchAsyncErrors(async (req, res, next) => {
  const leaderData = await sequelize.query(
    `SELECT username, count(done) AS done FROM (SELECT "Users".username, "Questions".done FROM "Questions" INNER JOIN "Users" USING ("userId")) AS a WHERE done = true GROUP BY username ORDER BY done DESC;`
  );

  if (leaderData) {
    console.log('.......', leaderData[0]);
    res.status(200).json({
      success: true,
      data: leaderData[0],
    });
  } else {
    res.status(401).json({
      success: false,
      data: [],
    });
  }
});

exports.addQuestion = catchAsyncErrors(async (req, res, next) => {
  questions.forEach(async (question) => {
    try {
      let newques = { ...question, userId: req.userId, done: false };
      await Questions.create(newques);
    } catch (err) {
      console.log(err);
    }
  });
});
