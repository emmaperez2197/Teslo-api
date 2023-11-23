"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRawHeaders = void 0;
const common_1 = require("@nestjs/common");
exports.GetRawHeaders = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const rawHeaders = req.rawHeaders;
    if (!rawHeaders) {
        throw new common_1.InternalServerErrorException();
    }
    return rawHeaders;
});
//# sourceMappingURL=get-rawHeaders.decorators.js.map