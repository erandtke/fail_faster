# needed for type info at compile time

npm install --save-dev @types/node
npm install knex
npm install --save-dev jest ts-jest @types/jest

# to build
npx tsc

# to run
node --es-module-specifier-resolution=node forwarding_server/server.js --debug
