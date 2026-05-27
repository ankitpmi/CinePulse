# [1.5.0](https://github.com/ankitpmi/CinePulse/compare/v1.4.0...v1.5.0) (2026-05-27)


### Bug Fixes

* **deployment:** update docker compose commands for production environment ([2d6aa75](https://github.com/ankitpmi/CinePulse/commit/2d6aa758d3a17ae9b26b6ac62a12e4a65f4f2876))
* **Grafana:** update health check endpoint to /healthStatus ([9b72e03](https://github.com/ankitpmi/CinePulse/commit/9b72e033620ff33a5106a9b49a9ab838bb30f312))
* **Grafana:** use sudo for htpasswd command in backend CI/CD workflow ([050f61f](https://github.com/ankitpmi/CinePulse/commit/050f61fe093b78ae0ff84e7405ec504e4ad60851))


### Features

* **cache:** implement Redis caching for movie data retrieval ([3cc19ac](https://github.com/ankitpmi/CinePulse/commit/3cc19aceb943b7f9b666941bcc05a9d5ff52ce8b))
* **cache:** update cache TTL for movies to 24 hours and log cache retrieval ([57cd599](https://github.com/ankitpmi/CinePulse/commit/57cd599cd85fac9e8371251663d3f03e1ea83ed9))
* **deployment:** enhance Grafana setup and health checks in CI/CD workflow ([7c732b2](https://github.com/ankitpmi/CinePulse/commit/7c732b22f47ab2e764a2cda4689511663314b75d))
* **redis:** add Redis service with healthcheck and update backend dependencies ([b17dcc4](https://github.com/ankitpmi/CinePulse/commit/b17dcc4aa9ae245c89b28b5daba42d27cd3e6ed6))
* **redis:** implement caching for genre list using Redis ([f0de5ab](https://github.com/ankitpmi/CinePulse/commit/f0de5ab5c461fdfc3d842af61e2df959474af928))
* **redis:** implement caching for new, top, and random movies using Redis ([b802a3c](https://github.com/ankitpmi/CinePulse/commit/b802a3c16a54ab1fb3ea24ad9a8d91fbd0581e3e))
* **redis:** update Redis caching implementation for genres and movies ([6644aad](https://github.com/ankitpmi/CinePulse/commit/6644aadfbe818ff3c8bb3d2bfe305605c10387d7))



# [1.4.0](https://github.com/ankitpmi/CinePulse/compare/v1.3.1...v1.4.0) (2026-05-26)


### Bug Fixes

* **backend:** removed commented code for nginx config ([87c7b6e](https://github.com/ankitpmi/CinePulse/commit/87c7b6e4f0b2179fb2e1221e897dec1077a8569c))
* **backend:** reverted changes for prometheus config ([be095ac](https://github.com/ankitpmi/CinePulse/commit/be095ac10d446a74f0e049518ddbff97f9858bae))


### Features

* **api:** enhance API One with error handling and random success and failure logic ([86113e4](https://github.com/ankitpmi/CinePulse/commit/86113e498f7a7c89668918be8e0cf5ff05f38bb5))
* **backend:** created nginx and docker compose for producion ([6cddb79](https://github.com/ankitpmi/CinePulse/commit/6cddb79131a2446ae57b3f2a2868bc4c02fac5c0))
* **backend:** make changes for prometheus config ([e678447](https://github.com/ankitpmi/CinePulse/commit/e6784475707f8a98e1b4abbdbbd71a7f093c2c88))
* **frontend:** update image source handling by introducing IMAGE_URL constant ([cd85a40](https://github.com/ankitpmi/CinePulse/commit/cd85a402485a1060736c03f6030de5f8ca94dd06))
* **logging:** implement centralized logging with Winston and Loki ([4136b79](https://github.com/ankitpmi/CinePulse/commit/4136b79486f3972ebde9bd89477f7e77f54c0b2d))
* **monitoring:** integrate Prometheus for metrics collection and add health check endpoint ([8a2aefb](https://github.com/ankitpmi/CinePulse/commit/8a2aefb21ba172f62f2233d69ecfde0fbd9a50b4))
* **nginx:** update Grafana proxy settings and add HTTP resolver ([f1c5802](https://github.com/ankitpmi/CinePulse/commit/f1c5802cb4bf62fe9cf0aa9ebdb8ddcecafc7428))
* **prometheus:** add nodejs-backend target to scrape configurations ([c33fd13](https://github.com/ankitpmi/CinePulse/commit/c33fd13f956b0cb2b064c5b79ba9b400a67035a8))
* **prometheus:** update job name and target for nodejs backend ([c40dac8](https://github.com/ankitpmi/CinePulse/commit/c40dac86ff795cb96468a8ba0cef9f5afa5fedf8))
* **prometheus:** update scrape target to new IP address ([184588e](https://github.com/ankitpmi/CinePulse/commit/184588ef333063a6c28f4c05b8081b3dbb3451e5))



## [1.3.1](https://github.com/ankitpmi/CinePulse/compare/v1.3.0...v1.3.1) (2026-05-12)


### Bug Fixes

* **frontend:** update uploads proxy URL in Vite configuration ([5f2c90e](https://github.com/ankitpmi/CinePulse/commit/5f2c90e8932e65f00714245b17952389ea9e43f3))



# [1.3.0](https://github.com/ankitpmi/CinePulse/compare/v1.2.1...v1.3.0) (2026-05-06)


### Bug Fixes

* **backend:** add git user name and email for changelog generation ([5e7d9e9](https://github.com/ankitpmi/CinePulse/commit/5e7d9e9c05e28c57411c2d77a354aa9ce658cfaa))
* **backend:** added git config in backedn cicd ([7e1c183](https://github.com/ankitpmi/CinePulse/commit/7e1c183488dcb18aed9157d68eb9eede1b53a00b))
* **backend:** make changes in api one ([9a954df](https://github.com/ankitpmi/CinePulse/commit/9a954df9b512ece8cf6a1e72da4e20a2d801f3b1))
* **backend:** make changes in backend ci cd ([fddbb1f](https://github.com/ankitpmi/CinePulse/commit/fddbb1ffa66b6ed128907246ccfeae9c9ad39955))
* **backend:** removed api route for two ([f6591aa](https://github.com/ankitpmi/CinePulse/commit/f6591aafabba1174bc16f8ba18c000a4087a3159))
* **backend:** removed api routes ([7f7559c](https://github.com/ankitpmi/CinePulse/commit/7f7559c788e71326ae871f933b9ab232f412cd11))
* **backend:** removed apione and apitwo api routes ([695395a](https://github.com/ankitpmi/CinePulse/commit/695395adae3b209b59bfd2482671ff9dd98cced4))
* **backend:** resolved husky related issue in backend docker file ([2554daf](https://github.com/ankitpmi/CinePulse/commit/2554daf01708220694d77c5de286d64010c388e8))
* **backend:** resolved issue for health route in ci cd ([7e971d4](https://github.com/ankitpmi/CinePulse/commit/7e971d4a7bd268f46ebf2bf658920bb9dbd8b001))
* **ci:** ensure pull requests trigger frontend CI/CD workflow ([3de6e63](https://github.com/ankitpmi/CinePulse/commit/3de6e63834f4e5a867b56503cc2dd1dc149ec23b))
* **project:** refactor code structure for improved readability and maintainability ([dfd54d8](https://github.com/ankitpmi/CinePulse/commit/dfd54d85fba6659365fb84e392b402a28eb4b50a))
* **project:** removed lates code related to backend ([e82afc9](https://github.com/ankitpmi/CinePulse/commit/e82afc95816e158850772fdd03a8bef0b1b6fab6))


### Features

* **backend:** added new api route ([0b21251](https://github.com/ankitpmi/CinePulse/commit/0b212512e7a0bdbe0805970adf04c19cf31cf8de))
* **backend:** added new api routes ([760ef7b](https://github.com/ankitpmi/CinePulse/commit/760ef7b0f74b3ac0bdfa241b4b7e7285fd625829))
* **backend:** created new api for api two ([eadf94a](https://github.com/ankitpmi/CinePulse/commit/eadf94a881267c3e8228e0862ec74de0ed12e3a5))
* **backend:** created new api route ([b02be6a](https://github.com/ankitpmi/CinePulse/commit/b02be6afe82f8ff99b2f619746ede5e9aa8a48dc))
* **backend:** enhance CI/CD workflow with rollback mechanism and add new API endpoints ([ce7b385](https://github.com/ankitpmi/CinePulse/commit/ce7b38595a32c3154fb3158f4ba4b2f5ab047e07))
* **backend:** improved ci cd ([60e88de](https://github.com/ankitpmi/CinePulse/commit/60e88de86a7f2610d68292803936f579b2afd7ab))
* **backend:** improved cicd ([ee3a759](https://github.com/ankitpmi/CinePulse/commit/ee3a759402d6ba067880d8c1fe2a55d729507a56))
* **backend:** update CI/CD workflow and add new API endpoint ([6295836](https://github.com/ankitpmi/CinePulse/commit/6295836ae56a6d91f0e24ea4572f521df741a0e2))
* **release:** enhance release body with build details and changelog ([f062ebf](https://github.com/ankitpmi/CinePulse/commit/f062ebf3a33c66523225451eba423fb1dd9c9617))



## [1.2.1](https://github.com/ankitpmi/CinePulse/compare/v1.2.0...v1.2.1) (2026-05-05)


### Bug Fixes

* **frontend:** make search input border solid ([b3cb545](https://github.com/ankitpmi/CinePulse/commit/b3cb5450b17c1fcdbff34d74e687c776f51a4d77))
* **frontend:** uncomment explore section in the frontend ([f29f65e](https://github.com/ankitpmi/CinePulse/commit/f29f65e9acb8d987b5ae936f0a269da93f0b1864))
* **frontend:** uncommit genres in frontend ([b536eff](https://github.com/ankitpmi/CinePulse/commit/b536eff6deb33c4b942f0bd9fe7bbdfb6dd23fdd))


### Features

* **frontend:** added border on search input ([55af4ff](https://github.com/ankitpmi/CinePulse/commit/55af4ff4e0dcdf6853a472526bd256609d4c6291))
* **project:** added conventional commit ([944686a](https://github.com/ankitpmi/CinePulse/commit/944686af6629284af591be8000e7523ed1004643))



