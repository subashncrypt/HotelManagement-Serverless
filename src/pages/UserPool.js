import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_2KkamuQkX",
  ClientId: "6j4jjqg64mlnl4io4h0pp6uuto",
};

export default new CognitoUserPool(poolData);
