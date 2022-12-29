import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const CardSchema = new Schema({
 name: String,
 subject: String,
 score: Number
});
const ScoreCard = mongoose.model('User', CardSchema);
export default ScoreCard;