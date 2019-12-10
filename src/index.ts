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
                userId      : number, [incrementing order starts from 0]
                active      : boolean, required [true when registers by default ],
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
                    INFO : payment amount fetched from db
                payment     : number, required [get by packageModel and memberShip],
                dueDate     : Date, required [automated by memberShip selection]
                paidDate    : Date, [Updated when customer pays]
                discount    : number, default 0
                oldBalance  : number, default 0
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

    ?SecondPriority
    *   Expenses
            model   (CR)
                date        : Date      [required]
                expenseType : string    [required]
                amount      : number    [required]
*/

/*
    Apis

        GET
            to retrieve doc from  dashBoardRegister model

            ?Additional features to this api

            * search by name and number
            * filter by dueDate (Date which is near)
            * filter by memberShip (packages)
            * filter by paidDate (queries "from" - "to")

        GET
            to calculate payment details

                response should consist from dashBoardRegister model
                    ? fetch from db
                    *   name
                    *   memberShip (example monthly, 3month)
                    *   memberShipPrice (additional call to db)
                    *   oldBalance

                    ? additional queries from user
                    *   addOn       : number (default 0)
                    *   discount    : number (default 0)
                    *   amountPaid  : number [required]

                    ? automated calculation
                    LOGIC
                        oldBalance + addOn - discount
                        *   total       : number
                    LOGIC
                        total - amountPaid
                        *   balance     : number
                    INFO
                    balance will be added oldBalance property to dashBoardRegister model
        GET 
            to retrieve all docs from Expenses model  
                * by default retrieve all docs
                * filter ability using "from"-"to" date 
*/