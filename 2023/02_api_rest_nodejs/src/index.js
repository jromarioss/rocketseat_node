function calculateYearOfUser(user) {
    return new Date().getFullYear() - user.birthYear;
}
console.log(calculateYearOfUser({ birthYear: 1998 }));
