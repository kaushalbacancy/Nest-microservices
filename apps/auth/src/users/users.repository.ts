import { AbstractRepository } from "'/common";
import { Injectable, Logger } from "@nestjs/common";
import { UsersDocument } from "./models/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument> {
    protected readonly logger = new Logger(UsersRepository.name)
    constructor(
        @InjectModel(UsersDocument.name)
        userModel: Model<UsersDocument>
    ) {
        super(userModel)
    }
}
