export const isValidEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

export const getEmailsFromCol = (
  data: any[][],
  columnIndex: number
): string[] => {
  const validEmails: string[] = [];

  for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
    const cellValue = data[rowIndex]?.[columnIndex];
    if (typeof cellValue === "string") {
      const emails = cellValue.split(/[, ]+/).map((email) => email.trim());
      emails.forEach((email) => {
        if (isValidEmail(email)) {
          validEmails.push(email);
        }
      });
    }
  }

  return validEmails;
};

export const getEmailCol = (data: any[][]): number => {
  const maxRowsToCheck = 100;
  let maxValidEmails = 0;
  let index = 0;

  data[0].forEach((col: string, colIndex: number) => {
    let validEmailCount = 0;
    for (let rowIndex = 1; rowIndex <= maxRowsToCheck; rowIndex++) {
      const cellValue = data[rowIndex]?.[colIndex];
      if (isValidEmail(cellValue)) {
        validEmailCount++;
      }
    }
    if (validEmailCount > maxValidEmails) {
      maxValidEmails = validEmailCount;
      index = colIndex;
    }
  });
  return index;
};
