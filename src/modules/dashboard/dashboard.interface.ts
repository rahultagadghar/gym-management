// imageUrl: string,
//     fullName    : string, required
// userId: number, [incrementing order starts from 0]
// active: boolean, required[true when registers by default ],
// occupation: string,
//     weight      : number,
//         age         : number,
//             height      : number,
//                 bmiLevel    : number,
//                     healthIssues: string,
//                         address     : string,
//                             email       : string, required
// phone: number, required
// dob: string, required
// sex: enum  , required[male, female, trans],
//     personalTrainer : string,
//         package     : dropDown[packageModel], required
// memberShip: enum  , required[monthly, threeMonth, sixMonth, oneYear],
//     INFO : payment amount fetched from db
// payment: number, required[get by packageModel and memberShip],
// dueDate: Date, required[automated by memberShip selection]
// paidDate: Date, [Updated when customer pays]
// discount: number, default 0
// oldBalance: number, default 0
// total: number, required
// paidAmount: number, required
// emergency: {
//     name: string,
//         relation: string,
//             phone   : number,
//                 secondaryPhone : number,
// }