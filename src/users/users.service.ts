import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(userData: User): Promise<User> {
    const existing = await this.findByPhone(userData.phoneNumber);
    if (existing)
      throw new ConflictException(
        `User with phone number ${userData.phoneNumber} already exists`,
      );

    const user = this.repo.create(userData);

    return this.repo.save(user);
  }

  async findByPhone(phone: string): Promise<User> {
    const user = await this.repo.findOne({ where: { phoneNumber: phone } });
    if (!user)
      throw new NotFoundException(`User with phone number ${phone} not found`);

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.repo.find();
    if (!users.length) throw new NotFoundException('No users found');

    return users;
  }
}
