import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entities';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from 'src/users/entities/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    dto: RegisterDto,
  ): Promise<{ accessToken: string; user: User }> {
    // Check if phone number already exists
    const existing = await this.usersService.findByPhone(dto.phoneNumber);
    if (existing)
      throw new ConflictException(
        `User with phone number ${dto.phoneNumber} already exists`,
      );

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // create new user
    const newUser = await this.usersService.create({
      ...dto,
      profile: {
        role: UserRole.STUDENT,
        levelOfEducation: dto.levelOfEducation,
      },
      password: hashedPassword,
    });

    const accessToken = await this.generateToken(newUser);
    return { accessToken, user: newUser };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string; user: User }> {
    const existing = await this.usersService.findByPhone(dto.phoneNumber);
    if (!existing)
      throw new NotFoundException(
        `User with phone number ${dto.phoneNumber} doest not exist`,
      );

    const isMatch = await bcrypt.compare(dto.password, existing.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.generateToken(existing);
    return { accessToken, user: existing };
  }

  private async generateToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      phone: user.phoneNumber,
      role: user.profile.role,
    };

    return this.jwtService.signAsync(payload);
  }
}
