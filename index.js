"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
try {
    const data = fs_1.default.readFileSync('./countries.txt', 'utf8');
    const lines = data.split('\n');
    const countriesArr = [];
    for (const line of lines) {
        const match = line.match(/^(\D+)\s([\d,]+)\s([\d,]+)/);
        console.log(match);
        if (match) {
            let countrie = {
                name: match[1],
                population: Number(match[2].replace(/,/g, '')) ? Number(match[2].replace(/,/g, '')) : 0,
                area: Number(match[3].replace(/,/g, '')) ? Number(match[3].replace(/,/g, '')) : 0,
                density: 0,
            };
            countriesArr.push(countrie);
        }
    }
    countriesArr.forEach((countrie) => {
        if (countrie.population > 0 && countrie.area > 0) {
            countrie.density = (countrie.population / countrie.area);
        }
    });
    countriesArr.sort((a, b) => {
        if (a.density > b.density) {
            return -1;
        }
        if (a.density < b.density) {
            return 1;
        }
        return 0;
    });
    let csvContent = "Country,Population,Area,Density\n";
    countriesArr.forEach(countrie => {
        csvContent += `${countrie.name},${countrie.population.toFixed(1)},${countrie.area.toFixed(1)},${countrie.density.toFixed(1)}\n`;
    });
    fs_1.default.writeFileSync("./countries.csv", csvContent);
}
catch (err) {
    console.error(err);
}
