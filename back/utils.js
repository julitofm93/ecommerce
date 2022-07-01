import bcrypt from 'bcrypt';
import config from './config/config.js';
import passport from 'passport';

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);
export const serialize = (object,keys) =>{
    let serializedObject = Object.fromEntries(Object.entries(object).filter(pair=>keys.includes(pair[0])))
    serializedObject.id = object._id;
    return serializedObject;
}
export const cookieExtractor = req =>{
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies[config.jwt.cookie_name];
    }
    return token;
}
/*Middlewares */
export const passportCall = (strategy) =>{
    return async(req, res, next) =>{
        passport.authenticate(strategy,function(err, user, info) {
          if (err) return next(err);
          req.user = user;
          next();
        })(req, res, next);
      }
}
