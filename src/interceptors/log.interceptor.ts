import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log(context);

    return next.handle().pipe(
      map(
        (data) => console.log('DATA', data.req.body),
        /*         data.map((item: any) => {
          console.log('After....');

          const res = {
            ...item,
            firstName: item.first_name,
            lastName: item.last_name,
          };

          delete res.first_name, delete res.last_name;

          return res;
        }), */
      ),
    );
  }
}
