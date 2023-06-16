import { makeAutoObservable } from 'mobx'
import { assign } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

export default class User {
  public id: string | unknown
  public dob: string | unknown
  public firstName: string | unknown
  public lastName: string | unknown
  public middleName: string | unknown
  public gender: string | unknown


  constructor(initialState?: Partial<User>) {
    makeAutoObservable(this)
    if (initialState) {
      assign(this, initialState)
    }
  }

  public static CreateNew(initialValues?: Partial<User>): User {
    console.log(initialValues);
    const user = new User()
    user.id = uuidv4().toString()
    user.firstName = initialValues?.firstName
    user.lastName = initialValues?.lastName
    user.middleName = initialValues?.lastName
    user.dob = initialValues?.dob
    if (initialValues) {
      assign(user, initialValues)
    }
    return user
  }

}
