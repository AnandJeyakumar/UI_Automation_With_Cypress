export function generateRandomUser(data) {
  const randomStr = Math.random().toString(36).substring(2, 6); // 4 random characters

  return {
    firstName: `${data.firstName}${randomStr}`,
    lastName: `${data.lastName}${randomStr}`,
    email: `${data.emailPrefix}${randomStr}@${data.emailDomain}`,
    password: data.password
  };
}
