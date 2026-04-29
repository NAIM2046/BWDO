
import Admin from "../../lib/model/user.js";
import connectDB from "../../lib/db.js";

export const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (!adminExists) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD, // ❌ hash manually দরকার নেই
        role: "admin",
      });

      console.log("✅ Admin created successfully");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  } catch (error) {
    console.error("❌ Seeder error:", error);
  }
};