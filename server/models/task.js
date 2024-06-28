const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    status:{type:String,required:true},
    userId:{type:Schema.Types.ObjectId,required:true,ref:"User"},
    priority:{type:String,required:true},
    dueDate:{type:Date},
    checkList: [
      {
        optionId: { type: String, required: true },
        isTick: { type: Boolean, required: true },
        checkText: { type: String, required: true },
      },
    ],
    tickCount:{type:Number,required:true},
    assignTo:{type:String}
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
