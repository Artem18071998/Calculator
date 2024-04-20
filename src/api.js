const fetchCurrencyConversion = async (baseCurrency, targetCurrency) => {
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
      if (!response.ok) {
        throw new Error('Failed to fetch currency conversion data');
      }
      const data = await response.json();
      // Проверяем, есть ли данные rates и целевая валюта
      if (data.rates && data.rates[targetCurrency]) {
        return data.rates[targetCurrency];
      } else {
        throw new Error(`Currency conversion data for ${targetCurrency} not available`);
      }
    } catch (error) {
      console.error('Error fetching currency conversion:', error);
      throw error;
    }
  };

// Функция для получения цены криптовалюты в указанной валюте
const fetchCryptoPrice = async (cryptoCurrency, currency) => {
  try {
      const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoCurrency}&tsyms=${currency}`);
      const data = await response.json();
      // Проверяем, что данные получены и содержат необходимую информацию
      if (data[currency]) {
          return data[currency]; // Возвращаем цену криптовалюты
      } else {
          throw new Error('Crypto price not available'); // Бросаем ошибку, если данные неправильные
      }
  } catch (error) {
      console.error('Error fetching crypto price:', error);
      throw error; // Перебрасываем ошибку в вызывающий код для обработки
  }
};

  export { fetchCryptoPrice, fetchCurrencyConversion };