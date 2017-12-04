const mongoose = require('mongoose');
const CommentSchema = require('../schemas/comment');

module.exports = mongoose.model('Comment', CommentSchema);