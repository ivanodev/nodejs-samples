import authConfig from "@config/auth";
import { sign } from "jsonwebtoken";

class JwtUtils {

  static GenerateToken( data: string | undefined, validityPeriod:  string | number | undefined): string {

    const { secret } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: data,
			expiresIn: validityPeriod
		});

    return token;
  }
}

export default JwtUtils;