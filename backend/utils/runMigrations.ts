import { DataSource, DataSourceOptions } from 'typeorm';


let _dataSource: DataSource | undefined = undefined;

const getDataSourceMigration = (): DataSource => {

  const options: DataSourceOptions = {
      name: "postgres",
      type: "postgres",
      host: "localhost",
      port: 1586,
      username: "postgres",
      password: "mysecretpassword",
      database: "fakeDb",
      logging: true,
      migrationsRun: true,
      synchronize: true,
      entities: ["repository/model**/*{t,j}s"],
      migrations: [
          "repository/migrations**/*.{ts,js}"
      ]
  }

  if(!_dataSource){
      _dataSource = new DataSource(options)
  }

  return _dataSource;
}

export const dataSource = getDataSourceMigration()

/*
export default ( async () => {
  await dataSource.runMigrations()
})()
*/