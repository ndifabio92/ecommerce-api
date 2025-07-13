export class Product {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public code: string,
    public price: number,
    public stock: number,
    public category: string,
    public thumbnails: string[],
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
