// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { HttpService } from '@nestjs/axios';
// import { firstValueFrom } from 'rxjs';
// import { User } from 'src/app/users/entities/user.entity';

// @Injectable()
// export class AuthService {
//   private readonly sandboxApiUrl = process.env.API_URL || 'https://api.wrapper.sandbox.payeah.xyz';

//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly httpService: HttpService
//   ) {}

//   async authenticate(user: User): Promise<{ success: boolean; data: { payeah_token: string, access_token: string } }> {
//     try {

//       const authenticate_payeah = await this.authenticate_payeah();
//       if (!authenticate_payeah.success) {
//         throw new UnauthorizedException('Invalid credentials');
//       }
//       console.log('secret ', process.env.JWT_SECRET)
//       console.log('authenticate_payeah.data.payeah_token ', authenticate_payeah.data.payeah_token)
//       const payload = { 
//         userId: user.id,
//         sub:user.email, 
//         payeah_token: authenticate_payeah.data.payeah_token, 
//         role:user.role,
//         isVerified: user.verified
//       };

//       const jwt_token = await this.jwtService.signAsync(payload,{
//         secret: process.env.JWT_SECRET,
//         expiresIn: '24h',
//       });
//       return { 
//         success: true, 
//         data: { payeah_token: authenticate_payeah.data.payeah_token, access_token: jwt_token } 
//       };
      
//     } catch (error) {
//       console.error('❌ Error authenticating:', error);
//       throw new UnauthorizedException('Authentication failed');
//     }
//   }

//   async authenticate_payeah(): Promise<{ success: boolean; data: { payeah_token: string } }> {
//     try {
//       console.log('authenticating payeah')
//       const response = await firstValueFrom(
//         this.httpService.post(`${this.sandboxApiUrl}/v1/authenticate`, {
//           access_key: process.env.ACCESS_KEY,
//           secret_key: process.env.SECRET_KEY,
//         })
//       );
//       console.log(response.data)
//       if (response.data && response.data.success) {
//         return { success: true, data: { payeah_token: response.data.data.token } };
//       } else {
//         throw new UnauthorizedException('Invalid credentials');
//       }
//     } catch (error) {
//       throw new UnauthorizedException('Authentication failed');
//     }
//   }
// }
