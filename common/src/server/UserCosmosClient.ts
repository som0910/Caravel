import User from '../model/User'
import BaseCosmosClient from './BaseCosmosClient'

export default class UserCosmosClient extends BaseCosmosClient<User>{
  constructor() {
    super(User)
    this.containerName = process.env.COSMOSDB_USERS_CONTAINER as string
  }

  createOrUpdateUser = async (user: User): Promise<User> => {
    return (await super.createOrUpdate(user)) as User
  }

  getUsers = async (): Promise<User[]> => {
    return (await super.getAll()) as User[]
  }
}
