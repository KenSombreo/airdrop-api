
// import {
//     CanActivate,
//     ExecutionContext,
//     Injectable,
//     UnauthorizedException,
//   } from '@nestjs/common';
//   import { JwtService } from '@nestjs/jwt';
//   import { Request } from 'express';
//   import * as jwt from 'jsonwebtoken';
  
//   @Injectable()
//   export class AuthGuard implements CanActivate {
//     constructor(private jwtService: JwtService) {}
  
//     async canActivate(context: ExecutionContext): Promise<boolean> {
//       const request = context.switchToHttp().getRequest();
//       const token = this.extractTokenFromHeader(request);
//       if (!token) {
//         throw new UnauthorizedException('No token provided or invalid token');
//       }
//       try {
//         console.log('Secret ',process.env.JWT_SECRET)
//         const payload = await this.jwtService.verifyAsync(
//           token,
//           {
//             secret: process.env.JWT_SECRET
//           }
//         );
//         request['user'] = payload;
//       } catch(error) {
//         if (error instanceof jwt.TokenExpiredError) {
//           throw new UnauthorizedException('Token has expired');
//         } else if (error instanceof jwt.JsonWebTokenError) {
//           throw new UnauthorizedException('Invalid token');
//         } else {
//           throw new UnauthorizedException('Authentication failed');
//         }
//       }
//       return true;
//     }
  
//     private extractTokenFromHeader(request: Request): string | undefined {
//       const [type, token] = request.headers.authorization?.split(' ') ?? [];
//       return type === 'Bearer' ? token : undefined;
//     }
//   }
  