import User from '../model/User'
import BaseCosmosClient from './BaseCosmosClient'

export default class UserCosmosClient extends BaseCosmosClient<User>{
  constructor() {
    super(User)
    this.containerName = process.env.COSMOSDB_USERS_CONTAINER as string
    
  }

  createOrUpdateUser = async (user: User): Promise<User> => {
    console.log(user)
    return (await super.createOrUpdate(user)) as User
  }

  getUsers = async (): Promise<User[]> => {
    return (await super.getAll()) as User[]
  }
  getById = async (id:string) : Promise<User|undefined> =>{
    return (await super.getById(id));
  }
}
