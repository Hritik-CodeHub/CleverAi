const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    enrolledClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
    history: [
      {
        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
        paperId: { type: mongoose.Schema.Types.ObjectId, ref: "Paper" },
        responses: [
          {
            questionId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Question",
            },
            answer: String,
            isCorrect: Boolean,
          },
        ],
        score: Number,
        attemptedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
