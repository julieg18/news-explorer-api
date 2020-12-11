const mongoose = require('mongoose');
const { isURL } = require('validator');

const { Schema, model } = mongoose;

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(val) {
        return isURL(val, {
          protocols: ['https', 'http'],
          require_protocol: true,
        });
      },
      message: 'link is invalid',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(val) {
        return isURL(val, {
          protocols: ['https', 'http'],
          require_protocol: true,
        });
      },
      message: 'link is invalid',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
    select: false,
  },
});

module.exports = model('Article', articleSchema);
