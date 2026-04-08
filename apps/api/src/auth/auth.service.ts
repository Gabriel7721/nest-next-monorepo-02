import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtUser } from '@musical/shared-types';
import { User, UserDocument } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  private buildTokenPayload(user: UserDocument): JwtUser {
    return {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
      subscriptionPlan: user.subscriptionPlan,
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, displayName } = registerDto;

    const existingUser = await this.userModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email: email.toLowerCase(),
      passwordHash,
      displayName,
    });

    const payload = this.buildTokenPayload(user);
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Register successfully',
      accessToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        role: user.role,
        subscriptionPlan: user.subscriptionPlan,
        vipExpiredAt: user.vipExpiredAt,
      },
    };
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    const payload = this.buildTokenPayload(user);
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successfully',
      accessToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        role: user.role,
        subscriptionPlan: user.subscriptionPlan,
        vipExpiredAt: user.vipExpiredAt,
      },
    };
  }

  async getMe(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('-passwordHash')
      .lean();

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        role: user.role,
        subscriptionPlan: user.subscriptionPlan,
        vipExpiredAt: user.vipExpiredAt,
      },
    };
  }
}
