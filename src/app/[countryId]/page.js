import Image from "next/image";
import Link from "next/link";

async function getCountryDetail(params) {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${params.countryId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json()
}
export default async function CountryDetail ({ params }) {
  const data = await getCountryDetail(params)
  const country = data[0];
  return (
    <div className="flex min-h-screen flex-col p-2 sm:p-24 gap-y-4">
      <Link href="/" className="text-teal-600">Back To HomePage</Link>
      <div className="flex flex-col gap-y-4">
        <Image alt={country.name.official} src={country.flags.svg} width={0} height={0} className="w-16 h-auto"/>
        <p>Name: <span className="text-slate-500">{country.name.official}</span></p>
        <p>Capital: <span className="text-slate-500">{country.capital.map((title) => title)}</span></p>
        <p>Region: <span className="text-slate-500">{country.region}</span></p>
        <p>Languages: <span className="text-slate-500">{country.name.official}</span></p>
        <p>Population: <span className="text-slate-500">{Intl.NumberFormat().format(country.population)}</span></p>
        <p>Area: <span className="text-slate-500">{Intl.NumberFormat().format(country.area)}</span></p>
        <p>Timezones: <span className="text-slate-500">{country.timezones.map((title) => title)}</span></p>
      </div>
    </div>
  )
}

