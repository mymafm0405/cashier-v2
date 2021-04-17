export class User {
  constructor(
    public username: string,
    public password: string,
    public name: string,
    public userType: string,
    public companyId: string,
    public status: string,
    public id?: string
  ) {}
}
