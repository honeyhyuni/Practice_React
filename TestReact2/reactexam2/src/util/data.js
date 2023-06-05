export const getStringDate = (data) => {
    return data.toISOString().slice(0, 10);
}