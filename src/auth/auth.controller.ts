import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
  Req,
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
@Controller('auth')
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth (@Request() _req): Promise<any> {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect (@Req() req, @Res() res): Promise<any> {
    const login = await this.authService.login(req.user)
    res.redirect('http://localhost:3000/login/success/' + login.access_token)
  }
}
