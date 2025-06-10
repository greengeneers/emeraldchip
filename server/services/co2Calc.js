// https://help.recyclesmart.com/how-are-the-co2-emissions-from-e-waste-calculated
// This is a factor that states for every 1 lb. of electronics recycled/repurposed ~= 0.914 lb. of CO2 saved

/*
  Step 1. From metric tonne data:
  - Recycling 1 metric tonne (1,000 kg) saves about 407 kg CO2.

  Step 2. Convert 407 kg CO2 to pounds:
  - 407 kg x 2.20462 = 897 lbs CO2

  Step 3: Convert 1 metric tonne e-waste to pounds
  - 1,000 kg x 2.20462 = 2.204.62 lbs e-waste

  Step 4: CO2 saved per lb e-waste
  - 897 lbs CO2 / 2,204.62 lbs e-waste = 0.407 lbs Co2 / lb e-waste
*/

const CO2_LB_FACTOR = 0.407;
const LBS_TO_KG_FACTOR = 0.453592;

exports.calcCO2Saved = (weightLbs) =>
  // apply the factor and return the CO2 emissions saved in kg
  (+weightLbs * CO2_LB_FACTOR * LBS_TO_KG_FACTOR).toFixed(2);
