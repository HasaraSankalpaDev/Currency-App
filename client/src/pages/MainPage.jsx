import { useEffect, useState } from "react";
import axios from "axios";

function MainPage() {
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading]  = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amount,
        },
      });
      setFinalAmount(response.data.convertedAmount); // Fix here
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/getAllCurrencies"
        );
        setCurrencyNames(response.data);
        setLoading(false);

      } catch (err) {
        console.error(err);
      }
    };
    getResponse();
  }, []);

  return (
    <div className="container">
      <h1 className="text-8xl mb-2">Currency App</h1>
      <p className="opacity-50">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque enim
        ratione voluptatem, provident assumenda possimus, exercitationem facere
        fugiat consectetur, nam architecto illum. Hic ducimus neque vel autem
        esse, facilis maxime molestiae amet quas soluta enim, fugiat aut? Enim,
        error eveniet!
      </p>

      <h3>Final Currency: {finalAmount}</h3>
      <div>
        <section>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                id="date"
                name="date"
                className="bg-gray-50 border border-black-300 text-gray-900 text-sm rounded-0 focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="sourceCurrency"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Source Currency
              </label>
              <select
                onChange={(e) => setSourceCurrency(e.target.value)}
                id="sourceCurrency"
                name="sourceCurrency"
                value={sourceCurrency}
                className="bg-gray-50 border border-black-300 text-gray-900 text-sm rounded-0 focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option value="">Choose a Currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option value={currency} key={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="targetCurrency"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Target Currency
              </label>
              <select
                onChange={(e) => setTargetCurrency(e.target.value)}
                id="targetCurrency"
                name="targetCurrency"
                value={targetCurrency}
                className="bg-gray-50 border border-black-300 text-gray-900 text-sm rounded-0 focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option value="">Choose a Currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option value={currency} key={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Amount
              </label>
              <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                id="amount"
                name="amount"
                className="bg-gray-50 border border-black-300 text-gray-900 text-sm rounded-0 focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Enter Amount"
                required
              />
            </div>
            <div>
              <button className="bg-green-500 hover:bg-green-600 py-2 px-5 w-full mt-4 transition-color">
                Convert Currency
              </button>

                  
                  {!loading ?
                   <div>
                   <h3><span className="text-green-600">{currencyNames[sourceCurrency]}</span> {amount} is Equal to <span className="text-green-400">{currencyNames[targetCurrency]}</span> {finalAmount.toFixed(2)}</h3>
                   </div> :  <div>
                 </div>
                  }
                
                 
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default MainPage;
