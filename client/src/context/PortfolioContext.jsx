import { createContext, useContext, useEffect, useState } from "react";
import { fetchPortfolio } from "../api.js";

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function reload() {
    setLoading(true);
    try {
      const next = await fetchPortfolio();
      setData(next);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, error, loading, reload, setData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
