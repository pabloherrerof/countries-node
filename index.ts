import fs from 'fs';

interface Country {
    name: string,
    population: number,
    area: number,
    density: number
}

try {
    const data = fs.readFileSync('./countries.txt', 'utf8');
    const lines = data.split('\n');
    const countriesArr: Country[] = [];
    
    for (const line of lines) {
        const match = line.match(/^(\D+)\s([\d,]+)\s([\d,]+)/);

        if (match) {
            let countrie: Country = {
                name: match[1],
                population:  Number(match[2].replace(/,/g, '')),
                area:  Number(match[3].replace(/,/g, '')),
                density: 0,
            }          
    
            countriesArr.push(countrie);
        } 
    }
    
    countriesArr.forEach((countrie) => {
        if(countrie.population > 0 && countrie.area > 0){
            countrie.density = (countrie.population / countrie.area);
        } 
    })

    countriesArr.sort((a, b) => {
        if(a.density > b.density){
            return -1
        }
        if (a.density < b.density) {
            return 1;
          }
          return 0;
    })

    let csvContent = "Country,Population,Area,Density\n";
    countriesArr.forEach(countrie => {
        csvContent += `${countrie.name},${countrie.population.toFixed(1)},${countrie.area.toFixed(1)},${countrie.density.toFixed(1)}\n` 
    })

    fs.writeFileSync("./countries.csv", csvContent);
  
    
}
catch (err) {
    console.error(err);
}