const { Schema, models, model } = require("mongoose");

const newsSchema =  new Schema({
    title: {
    type: String,
    required: [true, 'News title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
    description: {
    type: String,
    required: [true, 'News description is required'],
    trim: true
  },
    imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
    link: {
    type: String,
    required: [true, 'News link is required']
    },
  author: {
    type: String,
    
  },
  date: {
    type: Date,
    default: Date.now
  }
} , { timestamps: true })

const News = models.News || model("News" , newsSchema);
module.exports = News;

