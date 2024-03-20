import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { authorization } = context.switchToHttp().getRequest().headers;

    const { id } = this.authService.currentUser(
      (authorization ?? '').split(' ')[1],
    );

    const hasRole = this.authService.hasRoleAdmin(id);

    return hasRole;
  }
}
