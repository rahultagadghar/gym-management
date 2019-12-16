import { IsString, IsNumber, IsDefined, IsNumberString, IsOptional, IsEmail, IsPhoneNumber, IsEnum, IsDate, ValidateNested, IsDateString } from "class-validator";
import { Type } from "class-transformer";
import { MemberShipPeriod, People } from './dashboard.interface'

export class PaymentDTO {
    @IsString()
    @IsDefined()
    packageId: string

    @IsEnum(MemberShipPeriod)
    @IsDefined()
    memberShip: MemberShipPeriod

    @IsNumber()
    @IsDefined()
    amount: number

    @IsNumber()
    @IsDefined()
    discount: number
}

class Emergency {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    relation: string

    @IsString()
    @IsPhoneNumber("IN")
    @IsOptional()
    phone: string

    @IsString()
    @IsPhoneNumber("IN")
    @IsOptional()
    secondaryPhone: string
}
export class DashBoardDTO {

    @IsString()
    fullName: string

    @IsEmail()
    email: string // required

    @IsPhoneNumber("IN")
    phone: string// required

    @IsDateString()
    dob: string// required

    @IsEnum(People)
    sex: People  // required [male, female, trans],

    @IsString()
    packageId: string //dropDown [packageModel], required

    @IsEnum(MemberShipPeriod)
    memberShip: MemberShipPeriod  //, required [monthly, threeMonth, sixMonth, oneYear],

    @IsNumber()
    amount: number

    @IsNumber()
    discount: number

    @IsDateString()
    @IsOptional()
    dateOfRegistration: string

    @IsString()
    @IsOptional()
    active: boolean // required [true when registers by default ],

    @IsString()
    @IsOptional()
    occupation: string

    @IsNumber()
    @IsOptional()
    weight: number

    @IsString()
    @IsOptional()
    height: number

    @IsString()
    @IsOptional()
    bmiLevel: number

    @IsString()
    @IsOptional()
    healthIssues: string

    @IsString()
    @IsOptional()
    address: string

    @IsString()
    @IsOptional()
    personalTrainer: string

    @IsString()
    @IsOptional()
    imageUrl: string;

    @ValidateNested()
    @Type(() => Emergency)
    @IsOptional()
    emergency: Emergency
}



