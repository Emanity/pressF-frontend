# pressF-frontend

Team F - Press F To Pay Respects

**Team Members:**
* Eman Abbasi
* Felix Moore
* Matthew McPolin
* Aleksandra Łobocka
* John Walker

## Problem Statement

Currently within Kainos there is not one source of truth to view job roles and the relevant information attached (e.g. job descriptions, capability, competencies, banding etc) this can be confusing and time consuming for employees to retrieve the relevant job role information. 

## Vision

An online job application that serves both Kainos employees and recruitment admin to retrieve and update job roles and their relevant information.

## To Run:
`npm install`

`npm start`

Open on: http://localhost:7999

*Note: this application is the frontend only. The backend can be found here: https://github.com/felixmoore/pressF-backend*

## To Lint:
`npm run lint`

If it fails run: `./node_modules/.bin/eslint app/*.js test/*.js --fix`

This will autofix any errors that can be automatically fixed.

## To Test:
`npm test`

## Cypress Installation & Testing:
In the folder cypress_e2e run: `npm install`

In the same folder run: `npx cypress open`

Cypress tests can be run through the GUI provided.
