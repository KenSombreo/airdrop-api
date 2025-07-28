// import { forwardRef, Module } from '@nestjs/common';
// import { AuthService } from './services/auth.service';
// import { AuthController } from './controller/auth.controller';
// import { JwtModule } from '@nestjs/jwt';
// import { HttpModule } from '@nestjs/axios';
// import { UsersModule } from '../users/users.module';

// @Module({
//   imports: [
//     JwtModule.register({
//       global: true,
//       secret: process.env.JWT_SECRET || 'yourSecretKey',
//       signOptions: { expiresIn: '1h' },
//     }),
//     HttpModule, // Allows making API requests
//     forwardRef(() => UsersModule),
//   ],
//   // controllers: [AuthController],
//   providers: [AuthService],
//   exports: [AuthService],
// })
// export class AuthModule {}
