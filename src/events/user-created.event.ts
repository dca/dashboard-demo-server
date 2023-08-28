interface UserCreatedEventProps {
  id: number
  email: string
  verificationToken: string
}

export class UserCreatedEvent {
  public id: number
  public email: string
  public verificationToken: string

  constructor (data: UserCreatedEventProps) {
    this.id = data.id
    this.email = data.email
    this.verificationToken = data.verificationToken
  }
}
