import moment from "moment";

moment.locale("pt-br");

export const dateFormatted = (seconds) => {
  const d = new Date(seconds * 1000);

  return moment(d).format("D [de] MMMM [às] HH:mm");
};
