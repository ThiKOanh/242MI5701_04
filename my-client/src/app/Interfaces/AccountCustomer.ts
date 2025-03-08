export class AccountCustomer {
    constructor(
        public _id: any = null,
        public Name: string = '',
        public phonenumber: string = '',
        public Mail: string = '',
        public Address: string = '',
        public password: string = '',
        public gender: string = '',
        public agreement: boolean = false
    ) { }
}
