import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token =
      request.headers.authorization &&
      request.headers.authorization.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      return Boolean(decoded);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
