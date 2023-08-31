interface UserLoginEventProps {
  id: number
}

export class UserLoginEvent {
  public id: number

  constructor (data: UserLoginEventProps) {
    this.id = data.id
  }
}
