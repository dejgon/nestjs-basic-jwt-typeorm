import { Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './modules/auth/auth.service';
import { LocalAuthGuard } from './modules/auth/local.auth.guard';
import { JwtAuthGuard } from './modules/auth/jwt.auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/test')
  @ApiResponse({ status: 200, description: 'name' })
  returnFromParams(@Query('name') name: string): any {
    return { name: this.appService.returnName(name) };
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('api/auth/register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
