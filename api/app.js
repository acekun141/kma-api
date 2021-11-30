import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

// Import middlewares
import * as middlewares from "./middlewares/index.js";

// Routes
import * as routes from "./routes/index.js";

// App
const app = express();


// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan());
app.use(bodyParser.json());
// Passport
app.use(passport.initialize());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
const strategyConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET || 'SECRET'
};
passport.use(new Strategy(strategyConfig, (jwtPayload, done) => {
  const expirationDate = new Date(jwtPayload.exp * 1000);
  if (expirationDate < new Date()) return done(null, false);
  const user = jwtPayload;
  done(null, user);
}));

// Routes
app.use('/auth', routes.authRouter);
app.use('/user', routes.userRouter);
app.use('/book', routes.bookRouter);
app.use(middlewares.error);
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

// Run
const run = async () => {
  const host = process.env.HOST || '0.0.0.0';
  const port = process.env.PORT || 8888;
  await mongoose.connect('mongodb://localhost:27017/kma');
  app.listen({ host, port }, () => {
    console.log(`App is running on ${host}:${port}`);
  });
};
run();
