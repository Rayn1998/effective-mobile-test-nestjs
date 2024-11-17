import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private user_model: Model<UserDocument>) {}

    private create_users(count: number): Partial<User>[] {
        return Array.from({ length: count }, (_, i) => ({
            name: `User${i + 1}`,
            lastname: `LastName${i + 1}`,
            age: Math.floor(Math.random() * 60) + 18,
            sex: Math.random() > 0.48 ? "male" : "female",
            problems: Math.random() > 0.63,
        }));
    }

    async insert_users(portion: number, count: number): Promise<void> {
        let inbase = 0;

        while (inbase < count) {
            const batch = this.create_users(portion);
            await this.user_model.insertMany(batch);
            inbase += batch.length;
            console.log(`${Math.floor(inbase/count * 100)}% users inserted in database`)
        }
    }

    async solve(): Promise<number> {
        const sick_amount = await this.user_model.countDocuments({ problems: true });
        await this.user_model.updateMany({ problems: true }, { problems: false });
        return sick_amount;
    }
}