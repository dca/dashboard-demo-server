import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Logger,
  Body
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from './dto/login.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Authentication')
@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor (private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login (@Request() req, @Body() _body: LoginDto): Promise<any> {
    return await this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile (@Request() req): any {
    return req.user
  }

  @Get('auth0/callback')
  @UseGuards(AuthGuard('auth0'))
  async auth0Callback (@Request() req): Promise<any> {
    // initiates the Auth0 login flow
    return await this.authService.login(req.user)
  }
}
