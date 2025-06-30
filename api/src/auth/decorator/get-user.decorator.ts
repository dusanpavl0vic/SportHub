import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// Import JwtUser type from its definition file


export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest();


    const user = request.user;
    console.log(user);

    return data ? user?.[data] : user;


  },
);
// export const GetUser = createParamDecorator(
//   (ctx: ExecutionContext) => {
//     const request = ctx
//       .switchToHttp()
//       .getRequest();


//     const id = request.user.id;

//     return id;


//   },
// );
