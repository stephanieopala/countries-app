'use client';
import { useEffect, useState } from "react";
import Table from "@/components/Table";

export default function Home() {
  const [countriesList, setCountriesList] = useState({ isLoading: true, data: [] });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          setCountriesList({ ...countriesList, isLoading: false });
          throw new Error('Failed to fetch data');
        } else {
          const data = await response.json();
          console.log(data);
          setCountriesList({ data: data, isLoading: false });
        }
      } catch (error) {
        console.log(error);
        setCountriesList({ ...countriesList, isLoading: false });
      }
    };
    getData();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredCountries = countriesList.data?.filter((country) => country.name.official.toLowerCase().includes(searchTerm.toLowerCase()));
    setCountriesList({ isLoading: false, data: filteredCountries });
    console.log('search', searchTerm);
    setSearchTerm('');
  }

  return (
    <main className="flex min-h-screen flex-col p-2 sm:p-24">
      <div>
        <form onSubmit={handleSubmit} className="flex gap-x-3 align-middle mb-6">
          <div className="gap-x-3 items-center">
            <input type="text" value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-slate-300 p-2 rounded-md text-sm"
              placeholder="Enter country name..."
            />
          </div>
          <button className="text-white bg-teal-600 px-2 border rounded-md text-sm">Search</button>
        </form>
      </div>
      {!countriesList.isLoading && (
        <div className="flex flex-col gap-y-8">
          <Table countries={countriesList.data}/>
        </div>
      )}
      {countriesList.isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </main>
  );
}
