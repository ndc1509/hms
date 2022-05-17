export const addHours = (date, h) => {
    return new Date(date.getTime() + h * 60 * 60 * 1000);
};

export const dateDistance = (startISODate, endISODate) => {
    const dist =
        Date.parse(startISODate.split("T")[0]) -
        Date.parse(endISODate.split("T")[0]);
    if (dist === 0) return 0;
    return dist / (24 * 60 * 60 * 1000);
};

export const dateFormatter = (dateISOString) => {
    const date = dateISOString.split("T")[0];
    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const day = date.split("-")[2];
    return `${day}/${month}/${year}`;
};
