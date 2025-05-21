import { CreateChargeDto } from "'/common";
import { IsEmail } from "class-validator";

export class PaymentsCreateChargeDto extends CreateChargeDto {
    @IsEmail()
    email: string
}