# Jrod.io (v4.0.0)

This project contains the interactive portfolio of John Rodler, and was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.

---

## Angular Universal

This project uses Angular Universal to achieve Sever-Side Rendering which enables static HTML delivery to the client. Please reference this article on [Angular Universal](https://medium.com/@jrodl3r/seo-w-angular-universal-on-google-cloud-platform-90b3d6358536) for more info.

## Angular Material

This project uses Angular Material UI component libraries and other features. Please view the [Angular Material](https://material.angular.io/) website for more info.

## Google Cloud Storage

This project uses Google Cloud Storage for static assets such as images and documents. Please access storage buckets via [Google Cloud Storage](https://console.cloud.google.com/storage/browser?project=jrod-new).

## Contact Service (SMTP)

The contact feature utilizes [EmailJS](https://www.emailjs.com) to handle outgoing emails.

---

## Branches

This project has two primary branches - `DEV` and `PROD`. The DEV branch is for local development and testing purposes, while PROD is used **only for deployment** (read more about deployment below).

## Test

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build

Run `ng build` to build the project for production. The compiled files will be stored in `dist/jrod-v4/browser`.

## Build (SSR)

Run `ng build:ssr` to build the server files necessary for server-side rendering. The compiled files will be stored in `dist/jrod-v4/server`.

## Local (Development)

Run `npm run start:dev` for a local development server and navigate to `http://localhost:4100/`. The app will automatically reload if you make changes to any of the source files.

## Local (Production)

Run `npm run start:prod` for a local production server and navigate to `http://localhost:4300/`. The app will automatically reload if you make changes to any of the source files.

## Local (Production w/ SSR)

Run `npm run start:ssr` for a local production server with server-side rendering and navigate to `http://localhost:4200/`. The app will automatically reload if you make changes to any of the source files.

## Deployment (Production)

Before deployment, first merge the changes from `DEV` to `PROD` and then switch to `PROD`. Login to Google Cloud by running `gcloud auth login`, and then run `npm run release` to deploy to the live production server. After a successful deployment you can then push changes from both `DEV` and `PROD` to Github.

## Code Generation

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

---

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
