Add migration
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:generate "./repository/migrations" -d "./repository/psqlClient.ts"

Run migration
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run "./repository/migrations" -d "./repository/psqlClient.ts"

Run migration
npm run typeorm migration:run

Add migration
npm run typeorm migration:generate ./repository/migrations/
