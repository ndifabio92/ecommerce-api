import { IProductRepository } from '../../../products/domain/repositories/IProductRepository';
import { HomeProductsViewDto } from '../dtos/HomeProductsViewDto';

export interface GetHomeProductsParams {
  limit?: number;
  page?: number;
  sort?: 'asc' | 'desc';
  query?: string;
  baseUrl: string;
}

export class GetHomeProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(params: GetHomeProductsParams): Promise<HomeProductsViewDto> {
    const {
      limit = 10,
      page = 1,
      sort,
      query,
      baseUrl
    } = params;

    const result = await this.productRepository.findAll({
      limit,
      page,
      sort,
      query,
      baseUrl
    });

    return {
      products: result.payload,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.prevLink,
        nextLink: result.nextLink
      },
      query: query || '',
      sort: sort || '',
      limit: limit
    };
  }
} 