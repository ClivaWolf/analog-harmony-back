import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/user-profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) { }
  async findByEmail(email: string) {
    const user = await this.repository.findOne({
      where: { email: email },
      relations: ['profile', 'orders']
    });

    if (!user) {
      throw new HttpException('Пользователь с таким email не существует', 400);
    }
    return user
  }

  async findByLogin(login: string) {
    const user = await this.repository.findOne({
      where: { login: login },
      relations: ['profile', 'orders']
    });

    if (!user) {
      throw new HttpException('Пользователь с таким login не существует', 400);
    }
    return user
  }

  async findById(id: number) {
    if (!id || id <= 0) {
      throw new HttpException('Неверный id', 400);
    }
    const user = await this.repository.findOne({
      where: { id: id },
      relations: ['profile', 'orders'],
    })

    if (!user) {
      throw new HttpException('Пользователь с таким id не существует', 400);
    }
    return user;
  }

  async findAll(page: number, limit: number): Promise<{ items: User[], total: number }> {
    try {
      if (page < 1 || limit < 1) {
        throw new HttpException('Неверные параметры', 400);
      }
      if (limit > 25) {
        limit = 25
      }

      const skip = (page - 1) * limit;
      const users = await this.repository.findAndCount({
        take: limit,
        skip,
        relations: ['profile'], // Укажите здесь другие отношения, если они есть
      });
      return { items: users[0], total: users[1] };
    }
    catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      await this.loginAlreadyExist(createUserDto.login);
      await this.emailAlreadyExist(createUserDto.email);

      const user = await this.repository.create(createUserDto);
      return this.repository.save(user);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  private async loginAlreadyExist(login: string) {
    const user = await this.repository.findOne({
      where: { login: login }
    })
    if (user) {
      throw new HttpException('Пользователь с таким логином уже существует', 400);
    }
  }

  private async emailAlreadyExist(email: string) {
    const user = await this.repository.findOne({
      where: { email: email }
    })
    if (user) {
      throw new HttpException('Пользователь с таким email уже существует', 400);
    }
  }

  async updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new HttpException('Пользователь с таким id не существует', 404);
      }

      let profile = user.profile;
      if (!profile) {
        profile = await this.profileRepository.create(updateProfileDto);
        user.profile = profile
        await this.repository.save(user);
      } else {
        const updatedAboutUser = updateOnlyChangedFields(profile, updateProfileDto);
        await this.profileRepository.save(updatedAboutUser);
        user.profile = updatedAboutUser;
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getProfile(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('Пользователь с таким id не существует', 404);
    }
    if (!user.profile) {
      throw new HttpException('Пользователь не имеет профиля', 400);
    }
    return user.profile
  }
}

function updateOnlyChangedFields<T>(currentEntity: T, newData: Partial<T>): T {
  const result: Partial<T> = {};

  // console.log(newData);
  for (const key in currentEntity) {
    if (newData.hasOwnProperty(key) && newData[key] !== undefined) {
      result[key] = newData[key];
    } else {
      result[key] = currentEntity[key];
    }
  }

  return result as T;
}