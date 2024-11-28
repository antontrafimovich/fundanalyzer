export async function getTickerInfo(tickerId: string) {
  try {
    const tickerInfoPromise = fetch(`http://localhost:4000/${tickerId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const sharesInfoPromise = fetch(
      `http://localhost:4000/shares/${tickerId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const [tickerInfo, sharesResponse] = await Promise.all([
      tickerInfoPromise.then((res) => res.json()),
      sharesInfoPromise.then((res) => res.json()),
    ]);

    const sharesMap = sharesResponse.reduce((result, item) => {
      const [year] = item.year.split("/");
      const price = item["Kurs"];
      const count = item["Liczba akcji"];

      return { ...result, [year]: { price, count } };
    }, {});

    const tickerInfoResult = tickerInfo.map((row, index) => {
      const sharesRow =
        sharesMap[index === tickerInfo.length - 1 ? "2024" : row.year];

      return {
        ...sharesRow,
        ...row,
      };
    });

    return tickerInfoResult;
  } catch (err) {
    console.error(err);
  }
}
