import { Injectable } from '@nestjs/common';
import { CreateUnityDTO } from './dto/create-unity.dto';
import { UpdateUnityDTO } from './dto/update-unity.dto';
import { UnityRepository } from './repository/unity.repository';

@Injectable()
export class UnityService {
  constructor(private readonly repository: UnityRepository) {}

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const { results, totalItems } = await this.repository.paginate(
      page,
      size,
      sort,
      order,
      search,
    );
    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      paginations: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async findById(id: bigint) {
    return await this.repository.findById(id);
  }

  async create(createUnityDTO: CreateUnityDTO) {
    return await this.repository.create(createUnityDTO);
  }

  async update(id: bigint, updateUnityDTO: UpdateUnityDTO) {
    return await this.repository.update(id, updateUnityDTO);
  }

  async remove(id: bigint) {
    return await this.repository.remove(id);
  }
}
