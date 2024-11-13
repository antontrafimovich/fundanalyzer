"use client";

import { getTickers } from "@/app/actions/get-tickers";

import React, { useState, useEffect } from "react";

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ text: string }[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  useEffect(() => {
    if (debouncedQuery) {
      getTickers({filter: debouncedQuery})
        .then((data) => {
          setResults(data);
        })
        .catch((error) => {
          console.error("Error fetching search results", error);
        });
    }
  }, [debouncedQuery]);

  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <div className="flex-1 min-h-0 overflow-y-auto">
        <ul>
          {results.map(({ text }, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
