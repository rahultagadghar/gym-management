/*
    TODO

    !Priority
    *   LOGIN
            model
                username
                password

    !Priority
    *   Package
            all fields are required
            model   (CRUD)
                packageName     : string
                monthly         : number
                threeMonth      : number
                sixMonth        : number
                oneYear         : number
    !Priority
    *   DashBoard Register
            model   (CRUD)
                imageUrl    : string,
                fullName    : string, required
                occupation  : string,
                weight      : number,
                age         : number,
                height      : number,
                bmiLevel    : number,
                healthIssues: string,
                address     : string,
                email       : string, required
                phone       : number, required
                dob         : string, required
                sex         : enum  , required [male, female, trans],
                personalTrainer : string,
                package     : dropDown [packageModel], required
                memberShip  : enum  , required [monthly, threeMonth, sixMonth, oneYear],
                payment     : number, required [get by packageModel and memberShip],
                discount    : number, default 0
                total       : number, required
                paidAmount  : number, required
                emergency   : {
                    name    : string,
                    relation: string,
                    phone   : number,
                    secondaryPhone : number,
                }
    ?SecondPriority            
    *   Enquiry
            model   (CRUD)
                fullName : string,
                occupation : string,
                dob : string,
                age : number,
                address : string,
                phone : number
*/

/*
                Apis

                    GET
                        to retrieve doc from  dashBoardRegister model

*/