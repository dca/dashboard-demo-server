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
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from './dto/login.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CustomResponseWrapper } from '@src/utils/custom-response-wrapper'
import { LoginResponseDto } from './dto/login.response.dto'

@ApiTags('Authentication')
@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor (private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The user profile has been successfully retrieved.',
    type: CustomResponseWrapper(LoginResponseDto)
  })
  @Post('login')
  async login (@Request() req, @Body() _body: LoginDto): Promise<any> {
    return await this.authService.login(req.user)
  }

  @UseGuards(AuthGuard('auth0'))
  @ApiResponse({
    status: 200,
    description: 'The user profile has been successfully retrieved.',
    type: CustomResponseWrapper(LoginResponseDto)
  })
  @Get('auth0/callback')
  async auth0Callback (@Request() req): Promise<any> {
    // initiates the Auth0 login flow
    return await this.authService.login(req.user)
  }
}
