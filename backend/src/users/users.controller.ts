import {
  Controller,
  Get,
  UseGuards,
  Req,
  Patch,
  Body,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Request } from 'express';

export interface JwtUserPayload {
  userId: string;
  email: string;
}

export interface RequestWithUser extends Request {
  user: JwtUserPayload;
}

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({
    status: 200,
    description: 'Returns the current user profile (from JWT).',
  })
  async getProfile(@Req() req: RequestWithUser) {
    if (!req.user) {
      this.logger.warn('No user payload found in request');
      throw new BadRequestException('No user payload found in request.');
    }

    const userFromDb = await this.usersService.findById(req.user.userId);
    if (!userFromDb) {
      this.logger.warn(`User not found in DB for ID: ${req.user.userId}`);
      throw new NotFoundException('User not found in database.');
    }

    const { _id, name, email } = userFromDb;
    return {
      user: {
        id: _id,
        name,
        email,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: "Updates the user's name.",
  })
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!req.user) {
      this.logger.warn('User not found in request');
      throw new BadRequestException('User not found in request.');
    }

    const updatedUser = await this.usersService.updateUser(
      req.user.userId,
      updateUserDto,
    );

    const { _id, name, email } = updatedUser;

    return {
      message: 'User updated successfully',
      user: { id: _id, name, email },
    };
  }
}
