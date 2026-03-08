"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDBExceptions = handleDBExceptions;
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('DatabaseExceptionHandler');
function handleDBExceptions(error) {
    if (error instanceof common_1.HttpException) {
        throw error;
    }
    if (error.code === '23505') {
        throw new common_1.BadRequestException(error.detail);
    }
    if (error.code === '23503') {
        throw new common_1.BadRequestException('Invalid relation reference');
    }
    if (error.code === '22P02') {
        throw new common_1.BadRequestException('Invalid UUID format');
    }
    logger.error(error);
    throw new common_1.InternalServerErrorException('Unexpected database error, check logs');
}
//# sourceMappingURL=database-exception.handler.js.map