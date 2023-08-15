
export interface JwtPayload {
  email: string;
  sub: number;    //id
  iat?: number;   //
  exp?: number;   // 
}
