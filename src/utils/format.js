export const fullNameFormat = (data) => {
  const firstName = data?.firstName;
  const lastName = data?.lastName;

  const isFirstNameEmpty =
    firstName == null || firstName == undefined || firstName == "";
  const isLastNameEmpty =
    lastName == null || lastName == undefined || lastName == "";

  if (isFirstNameEmpty || isLastNameEmpty) {
    return "Empty Name";
  }

  return `${firstName} ${lastName}`;
};
