import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { ClientProxy } from "@nestjs/microservices";
import { AUTH_SERVICE } from "../constants";
import { UserDto } from "../dto";


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const jwt = context.switchToHttp().getRequest().cookies?.authentication
        if (!jwt) {
            return false
        }
        return this.authClient.send<UserDto>('authenticate', {
            authentication: jwt
        }).pipe(
            tap((res) => {
                context.switchToHttp().getRequest().user = res
            }),
            map(() => true),
            catchError((err) => {
                return throwError(() => new UnauthorizedException('Invalid or expired token'));
            })
        )
    }
}