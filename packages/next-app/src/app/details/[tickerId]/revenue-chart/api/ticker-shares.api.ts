export const getSharesInfo = async (tickerId: string) => {
  try {
    const response = await fetch(`http://localhost:4000/shares/${tickerId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = (await response.json()) as Record<string, any>[];

    return data.reduce((result, item) => {
      const [year] = item.year.split("/");
      const price = item["Kurs"];
      const count = item["Liczba akcji"];

      return { ...result, [year]: { price, count } };
    }, {});
  } catch (err) {
    console.error(err);
  }
};
