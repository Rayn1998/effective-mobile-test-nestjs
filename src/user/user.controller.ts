import { Controller, Post, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly user_service: UserService) {}

    @Post('solve')
    async solve(): Promise<{ fixedCount: number}> {
        const fixedCount = await this.user_service.solve();
        return { fixedCount };
    }

    @Post('seed')
    async seedUsers(@Query('count') count: number): Promise<string> {
        const portion = 50000;
        await this.user_service.insert_users(portion, count);
        return `Database seeded with ${count} users`;
    }
}
