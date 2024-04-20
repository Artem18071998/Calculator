import React, { useState, useEffect } from 'react';
import { fetchCurrencyConversion, fetchCryptoPrice } from './api';
import './styles.css';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [convertedCurrency, setConvertedCurrency] = useState('EUR');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [cryptoCurrency, setCryptoCurrency] = useState('BTC');
  const [convertedCryptoAmount, setConvertedCryptoAmount] = useState('');
  const [convertedCryptoCurrency, setConvertedCryptoCurrency] = useState('ETH');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [cryptoExchangeRate, setCryptoExchangeRate] = useState(null);

  const fetchExchangeRate = async () => {
    try {
      const rate = await fetchCurrencyConversion(currency, convertedCurrency);
      setExchangeRate(rate);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  const fetchCryptoExchangeRate = async () => {
    try {
      const rate = await fetchCryptoPrice(cryptoCurrency, convertedCryptoCurrency);
      setCryptoExchangeRate(rate);
    } catch (error) {
      console.error('Error fetching crypto exchange rate:', error);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
    fetchCryptoExchangeRate();
  }, [currency, convertedCurrency, cryptoCurrency, convertedCryptoCurrency]);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleConvertedCurrencyChange = (e) => {
    setConvertedCurrency(e.target.value);
  };

  const handleCryptoCurrencyChange = (e) => {
    setCryptoCurrency(e.target.value);
  };

  const handleConvertedCryptoCurrencyChange = (e) => {
    setConvertedCryptoCurrency(e.target.value);
  };

  const handleCurrencyAmountChange = (e) => {
    setAmount(e.target.value);
    if (exchangeRate) {
      setConvertedAmount((parseFloat(e.target.value) * exchangeRate).toFixed(6));
    }
  };

  const handleCryptoAmountChange = async (e) => {
    setCryptoAmount(e.target.value);
    try {
      const rate = await fetchCryptoPrice(cryptoCurrency, convertedCryptoCurrency);
      setConvertedCryptoAmount((parseFloat(e.target.value) * rate).toFixed(6));
    } catch (error) {
      console.error('Error fetching crypto exchange rate:', error);
    }
  };

  const handleExpressionChange = (e) => {
    setExpression(e.target.value);
  };

  const evaluateExpression = () => {
    try {
      setResult(eval(expression));
    } catch (error) {
      setResult('Error');
    }
  };

  useEffect(() => {
    evaluateExpression();
  }, [expression]);

  const handleClear = () => {
    setExpression('');
    setResult('');
    setAmount('');
    setConvertedAmount('');
    setCryptoAmount('');
    setConvertedCryptoAmount('');
  };

  const handleButtonClick = (value) => {
    setExpression(prevExpression => prevExpression + value);
  };

  const handleCalculate = () => {
    evaluateExpression();
  };

  return (
    <div className="calculator">
      <h2>Calculator</h2>
      <input type="text" value={expression} onChange={handleExpressionChange} />
      <div>
        <h3>Result:</h3>
        <p>{result}</p>
      </div>
      <div className="controls">
        <button onClick={() => handleButtonClick('+')}>+</button>
        <button onClick={() => handleButtonClick('-')}>-</button>
        <button onClick={() => handleButtonClick('*')}>*</button>
        <button onClick={() => handleButtonClick('/')}>/</button>
        <button onClick={() => handleButtonClick('(')}>(</button>
        <button onClick={() => handleButtonClick(')')}>)</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <h2>Currency Converter</h2>
      <div className="converter-section">
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" value={amount} onChange={handleCurrencyAmountChange} />
          <label htmlFor="convertedAmount">Converted Amount:</label>
          <input type="number" id="convertedAmount" value={convertedAmount} readOnly />
          <select value={currency} onChange={handleCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="INR">INR</option>
            <option value="RUB">RUB</option>
            <option value="UAH">UAH</option>
            {/* Другие валюты */}
          </select>
        </div>
        <div>
          <label htmlFor="convertedCurrency">Converted Currency:</label>
          <select value={convertedCurrency} onChange={handleConvertedCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="INR">INR</option>
            <option value="RUB">RUB</option>
            <option value="UAH">UAH</option>
            {/* Другие валюты */}
          </select>
        </div>
      </div>
      <h2>Cryptocurrency Converter</h2>
      <div className="converter-section">
        <div>
          <label htmlFor="cryptoAmount">Amount:</label>
          <input type="number" id="cryptoAmount" value={cryptoAmount} onChange={handleCryptoAmountChange} />
          <label htmlFor="convertedCryptoAmount">Converted Amount:</label>
          <input type="number" id="convertedCryptoAmount" value={convertedCryptoAmount} readOnly />
          <select value={cryptoCurrency} onChange={handleCryptoCurrencyChange}>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="LTC">LTC</option>
            <option value="BCH">BCH</option>
            <option value="XRP">XRP</option>
            <option value="ADA">ADA</option>
            <option value="DOT">DOT</option>
            <option value="LINK">LINK</option>
            <option value="BNB">BNB</option>
            <option value="XLM">XLM</option>
            {/* Другие криптовалюты */}
          </select>
        </div>
        <div>
          <label htmlFor="convertedCryptoCurrency">Converted Cryptocurrency:</label>
          <select value={convertedCryptoCurrency} onChange={handleConvertedCryptoCurrencyChange}>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="LTC">LTC</option>
            <option value="BCH">BCH</option>
            <option value="XRP">XRP</option>
            <option value="ADA">ADA</option>
            <option value="DOT">DOT</option>
            <option value="LINK">LINK</option>
            <option value="BNB">BNB</option>
            <option value="XLM">XLM</option>
            {/* Другие криптовалюты */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Calculator;