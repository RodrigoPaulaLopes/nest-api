import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('Id invalid');
    }
    next();
  }
}
