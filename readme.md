# needed for type info at compile time

npm install --save-dev @types/node

# to build
npx tsc

# to run
node --es-module-specifier-resolution=node forwarding_server/server.js --debug
