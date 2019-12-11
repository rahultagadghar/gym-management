import { IsString, IsNumber, IsDefined, IsNumberString, IsOptional, IsEmail, IsPhoneNumber, IsEnum, IsDate } from "class-validator";

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
    @IsPhoneNumber("in")
    phone: number

    @IsString()
    @IsPhoneNumber("in")
    secondaryPhone: number
}

class DashBoardDTO {
    @IsString()
    @IsOptional()
    imageUrl: string;

    @IsString()
    fullName: string

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

    @IsEmail()
    email: string // required

    @IsPhoneNumber("in")
    phone: number// required

    @IsString()
    dob: string// required
    @IsEnum(People)
    sex: People  // required [male, female, trans],

    @IsString()
    personalTrainer: string

    @IsString()
    package: string //dropDown [packageModel], required

    @IsEnum(memberShipPeriod)
    memberShip: memberShipPeriod  //, required [monthly, threeMonth, sixMonth, oneYear],

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
    discount: number //, default 0

    @IsNumber()
    oldBalance: number //, default 0

    @IsNumber()
    total: number //, required

    @IsNumber()
    paidAmount: number //, required
    emergency: Emergency
}



