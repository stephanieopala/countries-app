import Image from "next/image";
import Link from "next/link";

const Table = ({countries}) => {
  return (
    <table>
      <thead>
        <tr className="py-6">
          <th scope="col" className="text-left pl-4">Flag</th>
          <th scope="col" className="text-left">Name</th>
          <th scope="col" className="text-left">Population</th>
          <th scope="col" className="text-left">Area</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => (
          <tr key={country.name.official} className="hover:bg-gray-100 cursor-pointer">
            <th scope="row" className="py-4 px-2 sm:px-4">
              <Image alt={country.name.official} src={country.flags.svg} width={0} height={0} className="w-16 h-auto"/>
            </th>
            <td className="py-4 pr-2 sm:pr-4">
              <Link href={`/${country.cca2}`} className="hover:underline">
                {country.name.official}
              </Link>
            </td>
            <td className="py-4 pr-2 sm:pr-4">{Intl.NumberFormat().format(country.population)}</td>
            <td className="py-4 pr-2 sm:pr-4">{Intl.NumberFormat().format(country.area)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table