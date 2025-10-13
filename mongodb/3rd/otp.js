import nodemailer from "nodemailer"

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., Gmail, Yahoo
  auth: {
    user: "swarupmtra54@gmail.com",
    pass: "oouzeomgmcvcurvg",
  },
});
export default transporter;