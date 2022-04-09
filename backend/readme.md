Add migration
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:generate "./repository/migrations"  -d "./repository/psqlClient.ts"