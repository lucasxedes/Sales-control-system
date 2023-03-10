"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnityRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UnityRepository = class UnityRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async paginate(page, size, sort, order, search) {
        const results = await this.prisma.unity.findMany({
            skip: page * size,
            take: Number(size),
            where: { name: { contains: search } },
            orderBy: { [sort]: order },
        });
        const totalItems = await this.prisma.unity.count({
            where: { name: { contains: search, mode: 'insensitive' } },
        });
        return { results, totalItems };
    }
    async findById(id) {
        const findId = await this.prisma.unity.findFirst({
            where: { id },
        });
        if (!findId) {
            throw new common_1.HttpException('error', 404);
        }
        return findId;
    }
    async create(createUnityDTO) {
        return await this.prisma.unity.create({ data: createUnityDTO });
    }
    async update(id, updateUnityDTO) {
        return await this.prisma.unity.update({
            where: { id },
            data: updateUnityDTO,
        });
    }
    async remove(id) {
        return await this.prisma.unity.delete({
            where: { id },
        });
    }
};
UnityRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UnityRepository);
exports.UnityRepository = UnityRepository;
//# sourceMappingURL=unity.repository.js.map