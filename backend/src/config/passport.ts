import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import prisma from '../config/prismaClient';

const JWT_SECRET = process.env.JWT_SECRET!;

passport.use(
    'local',
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            try {
                const user = await prisma.user.findUnique({ where: { email } });
                if (!user) return done(null, false, { message: 'Invalid credentials' });
                const ok = await bcrypt.compare(password, user.password);
                if (!ok) return done(null, false, { message: 'Invalid credentials' });
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use(
    'jwt',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
            secretOrKey: JWT_SECRET,
        },
        async (payload, done) => {
            try {
                const user = await prisma.user.findUnique({ where: { id: payload.userId } });
                if (!user) return done(null, false);
                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        }
    )
);

export default passport;
