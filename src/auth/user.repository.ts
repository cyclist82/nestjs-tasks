import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DUPLICATE_ERROR_CODE } from './error-codes';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
  async signUp({ username, password }: AuthCredentialsDto): Promise<void> {
    const salt = await genSalt()
    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);

    try {
      await user.save();
    } catch ({ code }) {
      if (code === DUPLICATE_ERROR_CODE) {
        throw new ConflictException('Username already in use.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword({ username, password }: AuthCredentialsDto): Promise<string> {
    const user = await this.findOne({ username });

    return user && await compare(password, user.password) ? username : null;
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }
}