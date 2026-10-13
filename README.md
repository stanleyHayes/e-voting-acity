# e-voting-acity

Backend for an electronic voting system for Academic City College. e voting acity is an application containing JavaScript. The checked-in dependency manifests use Express, MongoDB via Mongoose. Source modules cover `admins`, `authentication`, `candidates`, `courses`, `departments`, `election-registrations`, `election-results`, `elections`, `invitations`, `users`.

## Repository layout

- `src/` — 58 tracked file(s); source examples: `src/controllers/v1/admin/admins.js`, `src/controllers/v1/admin/authentication.js`.

## Local setup

Run each package setup block from the repository root. For workspace repositories, install dependencies at the root before running application-specific scripts.

Clone this repository and enter its directory:

```sh
git clone https://github.com/stanleyHayes/e-voting-acity.git
cd e-voting-acity
```

### Node package: `package.json`

Use Node.js and npm.

```sh
npm install
```

- `npm run dev` — runs the declared `dev` script (`nodemon src/index.js`).
- `npm run start` — runs the declared `start` script (`node src/index.js`).
- The package test script is a placeholder and exits with an error; it does not run an automated test suite.

## Configuration

The application declares `dotenv`. Review environment-variable references in the source and supply your own local values before starting it. Keep credentials out of Git; do not reuse committed credentials.

## Source entry points

- [src/controllers/v1/admin/admins.js](src/controllers/v1/admin/admins.js)
- [src/controllers/v1/admin/authentication.js](src/controllers/v1/admin/authentication.js)
- [src/controllers/v1/admin/candidates.js](src/controllers/v1/admin/candidates.js)
- [src/controllers/v1/admin/courses.js](src/controllers/v1/admin/courses.js)
- [src/controllers/v1/admin/departments.js](src/controllers/v1/admin/departments.js)
- [src/controllers/v1/admin/election-registrations.js](src/controllers/v1/admin/election-registrations.js)
- [src/controllers/v1/admin/election-results.js](src/controllers/v1/admin/election-results.js)
- [src/controllers/v1/admin/elections.js](src/controllers/v1/admin/elections.js)

## Development notes

Commands above come from the tracked manifests and source layout. External services and runtime configuration may be required. Documentation updates do not establish that the application is deployed or that its tests pass.
