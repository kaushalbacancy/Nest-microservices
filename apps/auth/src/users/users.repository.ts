import { AbstractRepository, UsersDocument } from "'/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument> {
    protected readonly logger = new (Logger as any)(UsersRepository.name)
    constructor(
        @InjectModel(UsersDocument.name)
        userModel: Model<UsersDocument>
    ) {
        super(userModel)
    }
}
