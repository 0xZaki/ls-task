const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  is_done: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }

})

// edit to json
TaskSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.__v;
    delete ret.user;
    return ret;
  }
});



module.exports = mongoose.model('Task', TaskSchema)