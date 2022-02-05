import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import expressUserAgent from "express-useragent";
import connectDB from "./db/db.js";
import morgan from "morgan";


// Admin V1 Routes
import adminV1AuthRoutes from "./routes/v1/admin/authentication.js";
import adminV1UserRoutes from "./routes/v1/admin/users.js";
import adminV1CandidateRoutes from "./routes/v1/admin/candidates.js";
import adminV1CourseRoutes from "./routes/v1/admin/courses.js";
import adminV1DepartmentRoutes from "./routes/v1/admin/departments.js";
import adminV1ElectionResultRoutes from "./routes/v1/admin/election-results.js";
import adminV1InvitationRoutes from "./routes/v1/admin/invitations.js";
import adminV1VotesRoutes from "./routes/v1/admin/votes.js";
import adminV1AdminRoutes from "./routes/v1/admin/admins.js";
import adminV1ElectionRoutes from "./routes/v1/admin/elections.js";


// User V1 Routes
import userV1AuthRoutes from "./routes/v1/admin/authentication.js";
import userV1CandidateRoutes from "./routes/v1/admin/candidates.js";
import userV1CourseRoutes from "./routes/v1/admin/courses.js";
import userV1DepartmentRoutes from "./routes/v1/admin/departments.js";
import userV1ElectionResultRoutes from "./routes/v1/admin/election-results.js";
import userV1VoteRoutes from "./routes/v1/admin/votes.js";
import userV1ElectionRoutes from "./routes/v1/admin/votes.js";


dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(expressUserAgent());
app.use(morgan.dev('dev'));


app.use('/api/v1/user/auth', userV1AuthRoutes);
app.use('/api/v1/user/candidates', userV1CandidateRoutes);
app.use('/api/v1/user/courses', userV1CourseRoutes);
app.use('/api/v1/user/departments', userV1DepartmentRoutes);
app.use('/api/v1/user/election-results', userV1ElectionResultRoutes);
app.use('/api/v1/user/votes', userV1VoteRoutes);
app.use('/api/v1/user/elections', userV1ElectionRoutes);


app.use('/api/v1/admin/auth', adminV1AuthRoutes);
app.use('/api/v1/admin/users', adminV1UserRoutes);
app.use('/api/v1/admin/candidates', adminV1CandidateRoutes);
app.use('/api/v1/admin/courses', adminV1CourseRoutes);
app.use('/api/v1/admin/departments', adminV1DepartmentRoutes);
app.use('/api/v1/admin/election-results', adminV1ElectionResultRoutes);
app.use('/api/v1/admin/votes', adminV1VotesRoutes);
app.use('/api/v1/admin/admins', adminV1AdminRoutes);
app.use('/api/v1/admin/elections', adminV1ElectionRoutes);
app.use('/api/v1/admin/invitations', adminV1InvitationRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server connected on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
