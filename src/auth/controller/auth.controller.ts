// import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../services/auth.service';
// import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiProperty } from '@nestjs/swagger';
// import { AuthCredentialsDto } from '../dto/auth.dto';
// import { UsersService } from 'src/app/users/services/users.service';



// @ApiTags('Authentication')
// @Controller('authenticate')
// export class AuthController {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly usersService: UsersService,
    
//   ) {}

//   @Post()
//   @ApiOperation({ summary: 'Authenticate using password' })
//   @ApiResponse({
//     status: 201,
//     description: 'Token generated successfully',
//     schema: {
//       example: {
//         success: true,
//         data: {
//           token: 'eyJraWQiOiJ1TTZwSzJ6aXByUGx0WGJGKzQrVTd0a25w…………',
//         },
//       },
//     },
//   })
//   @ApiResponse({
//     status: 401,
//     description: 'Invalid credentials',
//     schema: {
//       example: {
//         statusCode: 401,
//         message: 'Invalid credentials',
//         error: 'Unauthorized',
//       },
//     },
//   })
//   async authenticate(@Body() credentials: AuthCredentialsDto) {

//     const user = await this.usersService.findOneByEmail(credentials.email);
//     if (!user) {
//       throw new UnauthorizedException('Invalid Email');
//     }
//     if (user.password !== credentials.password) {
//       throw new UnauthorizedException('Invalid Password');
//     }
//     if(user.verified === false){
//       throw new UnauthorizedException('Email not verified');
//     }

//     const generateToken = await this.authService.authenticate(user);
    
//     // const payeah_token = generateToken.data.payeah_token
//     const access_token = generateToken.data.access_token
//     const submissionDate = Date.now();

//     await this.usersService.update(user.id, {
//       otp: '000000',
//       otpExpiration: new Date(submissionDate),
//       verified: true,
//       timestamp: new Date(submissionDate),
//     });

//     return { success:true, message: 'Email verified!', token: access_token };
//   }
// }
