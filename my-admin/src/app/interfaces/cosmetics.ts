export class Cosmetics{
    [x: string]: any;
    constructor(
      public _id: any = null,
      public Name: string = '',
      public Price: string = '',
      public Image: string = '',
      public Description: string = '',
      public Ingredients: string = '',
      public Uses: string = '',
      public Store: string = '',
      public Warnings: string = '',
      public Category: string='',
      public Quantity: string = '',
      public Create_date: Date = new Date() 
    ) {}
  }