interface IUser {
  birthYear: number;
}

function calculateYearOfUser(user: IUser) {
  return new Date().getFullYear() - user.birthYear;
}

console.log(calculateYearOfUser({ birthYear: 1998 }));