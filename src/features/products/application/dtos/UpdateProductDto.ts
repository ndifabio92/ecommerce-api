import { CreateProductDto } from "./CreateProductDto";

// export class UpdateProductDto {
//   title?: string;
//   description?: string;
//   code?: string;
//   price?: number;
//   status?: boolean;
//   stock?: number;
//   category?: string;
//   thumbnails?: string[];
// }

export type UpdateProductDto = Partial<CreateProductDto>;
