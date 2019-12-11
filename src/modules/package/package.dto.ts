import { IsString, IsNumber, IsDefined, IsNumberString } from "class-validator";

export class Id {
    @IsString()
    _id: string
}

export class PackageDTO {

    @IsString()
    packageName: string;

    @IsNumber()
    monthly: number

    @IsNumber()
    threeMonth: number

    @IsNumber()
    sixMonth: number

    @IsNumber()
    oneYear: number
}
