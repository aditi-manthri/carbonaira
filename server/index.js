const express = require('express');
const cors = require('cors');

const port = 3001;
const app = express();

var corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());

app.post('/', (req, res) => {
    try {
        const {
            electricityUsage,
            gasUsage,
            oilUsage,
            shortFlight,
            longFlight,
            dietaryChoice,
            paperChoice,
            aluminiumChoice
        } = req.body;

        const electricityFactor = 0.85;
        const gasFactor = 2.296;
        const oilFactor = 2.653;
        const shortFlightFactor = 1100;
        const longFlightFactor = 4400;
        const dietaryFactor = {
            Vegan: 912.5,
            Vegetarian: 1642.5,
            MeatBased: 2737.5 || 0
        };
        const paperFactor = {
            No: 184,
            Yes: 0
        };
        const aluminiumFactor = {
            No: 166,
            Yes: 0
        };

        const year = 12;

        const electricityEmissions = electricityUsage * electricityFactor;
        const gasEmissions = gasUsage * gasFactor;
        const oilEmissions = oilUsage * oilFactor;
        const shortFlightEmissions = shortFlight * shortFlightFactor;
        const longFlightEmissions = longFlight * longFlightFactor;
        const dietaryEmissions = dietaryFactor[dietaryChoice] ||0;
        const paperEmissions = paperFactor[paperChoice];      
        const aluminiumEmissions = aluminiumFactor[aluminiumChoice]; 

        const totalFlightEmissions = shortFlightEmissions + longFlightEmissions;
        const totalElectricityEmissions = electricityEmissions * year;
        const totalGasEmissions = gasEmissions * year;
        const totalOilEmissions = oilEmissions * year;

        const totalYearlyEmissions = totalElectricityEmissions + 
                                   totalGasEmissions + 
                                   totalOilEmissions + 
                                   totalFlightEmissions + 
                                   dietaryEmissions + 
                                   paperEmissions +     
                                   aluminiumEmissions || 0; 

        const categorizeEmissions = (emissions) => {
            if (emissions < 4000) {
                return 'LOW';
            } else if (emissions < 10000) {
                return 'MEDIUM';
            } else {
                return 'HIGH';
            }
        };

        const emissionCategory = categorizeEmissions(totalYearlyEmissions);

        const result = {
            totalYearlyEmissions: {
                value: totalYearlyEmissions,  
                unit: 'kgCO2/year',
                category: emissionCategory
            },
            totalGasEmissions: {
                value: totalGasEmissions,     
                unit: 'kgCO2/year'
            },
            totalOilEmissions: {
                value: totalOilEmissions,     
                unit: 'kgCO2/year'
            },
            totalElectricityEmissions: {     
                value: totalElectricityEmissions,
                unit: 'kgCO2/year'
            },
            totalFlightEmissions: {
                value: totalFlightEmissions,
                unit: 'kgCO2/year'
            },
            dietaryEmissions: {
                value: dietaryEmissions,
                unit: 'kgCO2/year'
            }
        };

        res.json(result);

    } catch (err) {  
        console.error('Error in calculating emissions:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});