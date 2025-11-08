// /lib/model/team.js
import  { model, models, Schema } from "mongoose";

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      default: "https://i.ibb.co.com/G9wkJbX/user.webp"
    },
    bio: {
      type: String,
      default: "",
    },
    social: {
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      
      email: { type: String, default: "" },
    },
    rank: {
        type: Number,
        default: 0
            
    }
  },
  { timestamps: true }
);

// Prevent model overwrite on hot reload in Next.js
const Team = models.Team || model("Team", teamSchema);

export default Team;
