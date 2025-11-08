const { Schema, model, models } = require("mongoose");

// Content Block Schema for dynamic content
const contentBlockSchema = new Schema({
  type: {
    type: String,
    enum: ['Heading', 'Paragraph'],
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: false });

// Main Project Schema
const projectSchema = new Schema({ 
     
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Education', 'Healthcare', 'Environment', 'Community', 'Technology', 'Infrastructure'],
      message: '{VALUE} is not a valid category'
    }
  },
  
  status: {
    type: String,
    required: true,
    enum: {
      values: ['Planning', 'Ongoing', 'Completed', 'On Hold'],
      message: '{VALUE} is not a valid status'
    },
    default: 'Planning'
  },
  
  startDate: {
    type: Date,
   
  },
  
  endDate: {
    type: Date,
    
   
  },
  
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  
  coverImage: {
    type: String,
    required: [true, 'Cover image URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\..+/.test(v);
      },
      message: 'Please provide a valid URL for cover image'
    }
  },
  
  galleryImages: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length <= 10;
      },
      message: 'Cannot have more than 10 gallery images'
    },
    default: []
  },
  
  videoId: {
    type: String,
    trim: true,
    default: null
  },
  
  content: {
    type: [contentBlockSchema],
    default: []
  },
  
 
 
  
  tags: {
    type: [String],
    default: []
  },
  
  
  
 
  
  isPublished: {
    type: Boolean,
    default: false
  },
  
 
  
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});






// Create and export the model
const Project = models.Project || model('Project', projectSchema);

module.exports = Project;