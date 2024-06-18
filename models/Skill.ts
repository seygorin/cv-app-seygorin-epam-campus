import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  range: {
    type: Number,
    required: true,
  },
});

const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);

export default Skill;
