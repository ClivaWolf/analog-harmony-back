import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const UserId = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): number | null => {
        const req = ctx.switchToHttp().getRequest();
        return req.user?.sub ? Number(req.user.sub) : null
    }
)