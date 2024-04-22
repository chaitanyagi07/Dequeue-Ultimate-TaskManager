const mongoose = require('mongoose');
const User=require('./User.module')

const ProjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }, 
  description: { type: String, required: true },
  status: { type: String, required: true },
  owner: { type: String, required: true },
}, { timestamps: true, collection: 'projects' });


const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
