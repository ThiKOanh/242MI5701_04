export interface Profile {
  //CustomerID: number,
  CustomerName: string,
  Phone: string,
  Mail: string,
  BOD: string,
  Gender: string,
  //Membership: string,
  //AccountCode: number,
  //RecipientAddressID: number,
  Image: string

}

export class Profile {
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