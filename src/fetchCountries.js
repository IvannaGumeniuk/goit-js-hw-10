export const fetchCountries = name => {
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,name.official,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            
            return response.json();
        });
};