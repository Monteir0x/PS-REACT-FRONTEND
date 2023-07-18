export const DateUtil = {
  parseStringDateToLocalDate: (dateString: string) => {
    const date = new Date(dateString);
    const parsedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
    return parsedDate;
  },

  formatDateToLocalDate: (dateString: string) => {
    const dateParts = dateString.split('T')[0].split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    return formattedDate;
  }
}
