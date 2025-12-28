// Данные двигателя CN 1600 Ver_1.1
// Источник: data-$CN 1600 Ver_1.1.csv

export interface EngineDataPoint {
  rpm: number;
  power: number;  // PS (лошадиные силы)
  torque: number; // N·m (Ньютон-метры)
}

export interface EngineSpecs {
  name: string;
  displacement: number; // cc
  peakPower: {
    value: number;  // PS
    rpm: number;
  };
  peakTorque: {
    value: number;  // N·m
    rpm: number;
  };
  rpmRange: {
    min: number;
    max: number;
  };
  specificPower: number; // PS/литр
}

// Данные характеристик двигателя CN 1600 Ver_1.1
export const cn1600Data: EngineDataPoint[] = [
  { rpm: 3400, power: 71.82, torque: 148.33 },
  { rpm: 3600, power: 75.60, torque: 147.46 },
  { rpm: 3800, power: 72.68, torque: 134.30 },
  { rpm: 4000, power: 78.49, torque: 137.77 },
  { rpm: 4200, power: 90.25, torque: 150.88 },
  { rpm: 4400, power: 100.42, torque: 160.26 },
  { rpm: 4600, power: 112.38, torque: 171.54 },
  { rpm: 4800, power: 123.03, torque: 179.96 },
  { rpm: 5000, power: 131.66, torque: 184.90 },
  { rpm: 5200, power: 138.11, torque: 186.48 },
  { rpm: 5400, power: 142.88, torque: 185.79 },
  { rpm: 5600, power: 151.04, torque: 189.38 },
  { rpm: 5800, power: 160.53, torque: 194.34 },
  { rpm: 6000, power: 169.14, torque: 197.94 },
  { rpm: 6200, power: 176.26, torque: 199.60 },
  { rpm: 6400, power: 180.98, torque: 198.55 },
  { rpm: 6600, power: 184.57, torque: 196.35 },
  { rpm: 6800, power: 188.99, torque: 195.14 },
  { rpm: 7000, power: 194.59, torque: 195.18 },
  { rpm: 7200, power: 200.72, torque: 195.74 },
  { rpm: 7400, power: 206.27, torque: 195.73 },
  { rpm: 7600, power: 209.60, torque: 193.65 },
  { rpm: 7800, power: 211.14, torque: 190.06 },
  { rpm: 8000, power: 211.37, torque: 185.52 },
  { rpm: 8200, power: 210.39, torque: 180.15 },
  { rpm: 8400, power: 207.81, torque: 173.71 }
];

// Спецификации двигателя CN 1600 Ver_1.1
export const cn1600Specs: EngineSpecs = {
  name: 'CN 1600 Ver_1.1',
  displacement: 1600,
  peakPower: {
    value: 211.37,
    rpm: 8000
  },
  peakTorque: {
    value: 199.60,
    rpm: 6200
  },
  rpmRange: {
    min: 3400,
    max: 8400
  },
  specificPower: 132.1 // 211.37 PS / 1.6 литра
};
