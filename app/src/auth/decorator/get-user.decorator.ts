import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx
                    .switchToHttp()
                    .getRequest();

    const user = request.user;

    return data ? { [data]: user[data] } : user;

    
  },
);
