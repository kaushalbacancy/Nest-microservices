import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as brcrypt from 'bcryptjs'
import { GetUserDto } from './dto/get-user.dto';
@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) {

    }

    async create(createUserDto: CreateUserDto) {
        await this.validateCreateUserDto(createUserDto)
        return this.usersRepository.create({ ...createUserDto, password: await brcrypt.hash(createUserDto.password, 10) })
    }

    async verifyUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email })
        const passwordValid = await brcrypt.compare(password, user.password)
        if (!passwordValid) {
            throw new UnauthorizedException('Credentials are not valid.')
        }
        return user
    }

    async getUser(getUserDto: GetUserDto) {
        const user = await this.usersRepository.findOne(getUserDto)
        return user
    }

    private async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.usersRepository.findOne({ email: createUserDto.email })
        } catch (error) {
            return
        }
        throw new UnprocessableEntityException('Email already exists')
    }

}
