var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    default: 'No summary available',
  },
  img: {
    type: String,
    defualt: 'no image available',
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

ArticleSchema.index({title: 'text'});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;