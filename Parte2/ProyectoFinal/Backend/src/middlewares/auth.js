import passport from 'passport';

export const authenticateJWT = passport.authenticate('jwt', { session: false });

export const authenticateCurrent= passport.authenticate('current', { session: false });


