import {singleton} from "tsyringe";
import fetch from 'node-fetch';
import {Country, CountryLanguage} from "../typeings.js";

@singleton()
export class RestCountriesManager {

    private static readonly baseUrl = `${process.env.REST_COUNTRIES_API}/v3.1`;

    public async getCountryIfo(countryCode: string): Promise<Country | null> {
        const response = await fetch(`${RestCountriesManager.baseUrl}/alpha/${countryCode}`);
        if (!response.ok) {
            return null;
        }
        return (await response.json()) as Country;
    }

    public async getCountyLanguage(countryCode: string): Promise<CountryLanguage[] | null> {
        const country = await this.getCountryIfo(countryCode);
        if (country === null) {
            return null;
        }
        const retArr: CountryLanguage[] = [];
        for (const code in country.languages) {
            const name = country.languages[code];
            retArr.push({
                code,
                name
            });
        }
        return retArr;
    }

}
