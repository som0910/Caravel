import { makeAutoObservable } from 'mobx'
import { assign } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

export default class User {
  public id: string | unknown
  public name: string | unknown
  public email: string | unknown

  constructor(initialState?: Partial<User>) {
    makeAutoObservable(this)
    if (initialState) {
      assign(this, initialState)
    }
  }

  public static CreateNew(initialValues?: Partial<User>): User {
    const user = new User()
    user.id = uuidv4().toString()
    user.name = initialValues?.name
    user.email = initialValues?.email
    if (initialValues) {
      assign(user, initialValues)
    }
    return user
  }

}
