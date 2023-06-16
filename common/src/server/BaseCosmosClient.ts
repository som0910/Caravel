import { CosmosClient } from '@azure/cosmos'
import { appCosmosClient } from './AppCosmosClient'

export default class BaseCosmosClient<TEntity> {
  protected databaseId = process.env.DATABASE_NAME as string
  protected containerName = ''

  protected client: CosmosClient
  protected c: new (initialState?: TEntity) => TEntity

  constructor(c: new (initialState?: TEntity) => TEntity) {
    this.client = appCosmosClient.client
    this.c = c
  }

  public async createOrUpdate(entity: TEntity): Promise<TEntity | undefined> {
    const { item } = await this.client
      .database(this.databaseId)
      .container(this.containerName)
      .items.upsert(entity)
    return this.getById(item.id)
  }

  public async getById(id: string): Promise<TEntity | undefined> {
    return this.getByPropertyValue('id', id)
  }

  public async getByPropertyValue(
    propertyName: string,
    value: string
  ): Promise<TEntity | undefined> {
    const querySpec = {
      query: `SELECT * FROM c WHERE c.${propertyName}=@val`,
      parameters: [{ name: '@val', value: value }],
    }
    const { resources: results } = await this.client
      .database(this.databaseId)
      .container(this.containerName)
      .items.query(querySpec)
      .fetchAll()

    if (results.length > 0) {
      return new this.c(results[0])
    }

    return undefined
  }

  public async getAllByPropertyValue(
    propertyName: string,
    value: string
  ): Promise<TEntity[] | undefined> {
    const querySpec = {
      query: `SELECT * FROM c WHERE c.${propertyName}=@val`,
      parameters: [{ name: '@val', value: value }],
    }
    const { resources: results } = await this.client
      .database(this.databaseId)
      .container(this.containerName)
      .items.query(querySpec)
      .fetchAll()

    return results.map((i) => new this.c(i))
  }

  public async getParticularItemByPropertyValue(
    itemName: string,
    propertyName: string,
    value: string
  ): Promise<TEntity[] | []> {
    const querySpec = {
      query: `SELECT c.${itemName} FROM c WHERE c.${propertyName}=@val`,
      parameters: [{ name: '@val', value: value }],
    }
    const { resources: results } = await this.client
      .database(this.databaseId)
      .container(this.containerName)
      .items.query(querySpec)
      .fetchAll()
    if (results) {
      return results.map((i) => new this.c(i))
    }
    return []
  }

  public async getAllBySimilarValue(
    propertyName: string,
    value: string
  ): Promise<TEntity[] | null> {
    const querySpec = {
      query: `SELECT * FROM c WHERE LOWER(c.${propertyName}) LIKE LOWER(@val)`,
      parameters: [{ name: '@val', value: `%${value}%` }],
    }

    const { resources: results } = await this.client
      .database(this.databaseId)
      .container(this.containerName)
      .items.query(querySpec)
      .fetchAll()

    return results.map((i) => new this.c(i))
  }

  public async getAll(): Promise<TEntity[] | undefined> {
    const querySpec = {
      query: `SELECT * FROM c`,
    }
    const { resources: results } = await this.client
      .database(this.databaseId)
      .container(this.containerName)
      .items.query(querySpec)
      .fetchAll()

    return results.map((i) => new this.c(i))
  }

  public async deleteById(id: string, partitionKey: string): Promise<any> {
    const result = await this.client
      .database(this.databaseId)
      .container(this.containerName)
      .item(id, partitionKey)
      .delete()

    return result
  }
}
