import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  
    const initialDate = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`Time ${Date.now() - initialDate} miliseconds`);
      }),
    );
  }
}
