import passport from "passport";
import jwt from "passport-jwt";
import UserDaoMongoDb from "../daos/mongodb/user.dao.js";
import UserModel from "../daos/mongodb/models/user.model.js";

const userDao = new UserDaoMongoDb();

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    console.log(req.cookies["access_token"]);
    token = req.cookies["access_token"];
  }
  return token;
};

export function initializePassport() {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "s3cr3t",
      },
      async (payload, done) => {
        try {
          const user = await userDao.getById(payload.id);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  
  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "s3cr3t",
      },
      async (payload, done) => {
        try {
          
          const user = await userDao.getById(payload.id);

          if (user) {
            return done(null, user); 
          } else {
            return done(null, false); 
          }
        } catch (error) {
          return done(error, false); 
        }
      }
    )
  );
}
