import { IsString, IsNumber, IsDefined, IsNumberString, IsOptional, IsEmail, IsPhoneNumber, IsEnum, IsDate, ValidateNested, IsDateString } from "class-validator";
import { Type } from "class-transformer";

export enum People {
    MALE = "male",
    FEMALE = "female",
    TRANS = "trans"
}

export enum memberShipPeriod {
    MONTHLY = "monthly",
    THREE_MONTH = "threeMonth",
    SIX_MONTH = "sixMonth",
    ONE_YEAR = "oneYear"
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
    package: string //dropDown [packageModel], required

    @IsEnum(memberShipPeriod)
    memberShip: memberShipPeriod  //, required [monthly, threeMonth, sixMonth, oneYear],

    @IsNumber()
    paidAmount: number //, required

    @IsString()
    @IsOptional()
    userId: number //[incrementing order starts from 0]

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
    age: number

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

    @IsNumber()
    @IsOptional()
    payment: number //, payment amount fetched from db , required [get by packageModel and memberShip],


    @IsDate()
    @IsOptional()
    dueDate: Date //, required [automated by memberShip selection]

    @IsDate()
    @IsOptional()
    paidDate: Date // [Updated when customer pays]

    @IsNumber()
    @IsOptional()
    discount: number //, default 0

    @IsNumber()
    @IsOptional()
    oldBalance: number //, default 0

    @IsNumber()
    @IsOptional()
    total: number //, required

    @IsString()
    @IsOptional()
    imageUrl: string;

    @ValidateNested()
    @Type(() => Emergency)
    @IsOptional()
    emergency: Emergency
}



