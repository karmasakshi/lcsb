# LCSB

## How to run

1. `git clone https://github.com/karmasakshi/lcsb.git`
2. `cd lcsb`
3. `npm i`
4. `npm start`
5. Go to http://localhost:4200

Login with any valid email and password.

## Links

- Live: https://lcsb.vercel.app/
- Repository: https://github.com/karmasakshi/lcsb
- Commit history: https://github.com/karmasakshi/lcsb/commits/main/
- PageSpeed Insights: https://pagespeed.web.dev/analysis/https-lcsb-vercel-app/bu19hx15by?form_factor=mobile

## Features

- SPA built with latest Angular with Material Design components.
- Automatic light or dark mode based on the OS theme.
- Mocked API calls with loading state and synthetic delays.
- Forms with validations.

### Exclusions

- Internationalization
- Unit and E2E tests
- Releasing and versioning
- Icons
- SEO tags
- sitemap.xml and robots.txt

### Components

- [App](./src/app/components/app/app.ts): Root component.
- [BpChart](./src/app/components/bp-chart/bp-chart.ts): Blood pressure chart component.
- [BpPage](./src/app/components/bp-page/bp-page.ts): Container component for blood pressure chart and chart configuration form.
- [HomePage](./src/app/components/home-page/home-page.ts): Home component.
- [Navigation](./src/app/components/navigation/navigation.ts): Navigation component.
- [SignInForm](./src/app/components/sign-in-form/sign-in-form.ts): Sign in form component.

### Routes

- `/`: [HomePage](./src/app/components/home-page/home-page.ts)
- `/bp`: [BpPage](./src/app/components/bp-page/bp-page.ts)

### Guards

- [isAuthenticatedGuard](./src/app/guards/is-authenticated/is-authenticated-guard.ts): Prevents loading [BpPage](./src/app/components/bp-page/bp-page.ts) without a session.

### Interceptors

- [getUsersDataInterceptor](./src/app/interceptors/get-users-data/get-users-data-interceptor.ts): Mocks `GET /users/{token}/data`.
- [postLoginInterceptor](./src/app/interceptors/post-login/post-login-interceptor.ts): Mocks `POST /login`.

### Services

- [Bp](./src/app/services/bp/bp.ts): Gets the blood pressure data of the signed-in user.
- [User](./src/app/services/user/user.ts): Manages session of the user.
