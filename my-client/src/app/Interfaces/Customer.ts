export class Customers {
  constructor(
    public _id: any = null,
    //public CustomerID: number = 0,
    public CustomerName: string = '',
    public Phone: string = '',
    public Mail: string = '',
    public BOD: string = '',
    public Gender: string = '',
    //public Membership: string = '',
    //public AccountCode: number = 0,
    //public RecipientAddressID: number = 0,
    public Image: string = ''
  ) { }
}

export class Delivery {
  constructor(
    public _id: any = null,
    //public RecipientAddressID: number = 0,
    public RecipientName: string = '',
    public Address: string = '',
    public Phone: string = ''
  ) { }
}