import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../../../users/infrastructure/models/UserModel";
import { envs } from "../../../../shared/config/envs";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envs.jwtSecret,
};

passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await UserModel.findById(payload.id);
      if (user) {
        return done(null, {
          id: (user as any)._id.toString(),
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          age: user.age,
          password: user.password,
          cart: user.cart?.toString(),
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Estrategia "current" para validar token y extraer usuario
passport.use(
  "current",
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await UserModel.findById(payload.id);
      if (user) {
        return done(null, {
          id: (user as any)._id.toString(),
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          age: user.age,
          password: user.password,
          cart: user.cart?.toString(),
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
