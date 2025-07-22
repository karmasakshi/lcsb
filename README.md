# LCSB

# Features

## Routes

- `/`: [HomePage](./src/app/components/home-page/home-page.ts)
- `/bp`: [BpPage](./src/app/components/bp-page/bp-page.ts)

## Guards

- [isAuthenticatedGuard](./src/app/guards/is-authenticated/is-authenticated-guard.ts): Prevents loading [BpPage](./src/app/components/bp-page/bp-page.ts) without a session.

## Interceptors

- [getUserDataInterceptor](./src/app/interceptors/get-user-data/get-user-data-interceptor.ts): Mocks `GET /users/{token}/data`.
- [postLoginInterceptor](./src/app/interceptors/post-login/post-login-interceptor.ts): Mocks `POST /login`.

## Services

- [Bp](./src/app/services/bp/bp.ts): Gets the blood pressure data of the signed-in user.
- [User](./src/app/services/user/user.ts): Manages session of the user.
