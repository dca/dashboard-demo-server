import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class DataTransformInterceptor implements NestInterceptor {
  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data: this.transformDates(data)
      }))
    )
  }

  private transformDates (obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.transformDates(item))
    }

    if (typeof obj === 'object') {
      for (const key in obj) {
        if (obj[key] instanceof Date) {
          obj[key] = obj[key].getTime()
        } else if (typeof obj[key] === 'object') {
          this.transformDates(obj[key])
        }
      }
    }

    return obj
  }
}
