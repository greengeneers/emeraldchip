// https://help.recyclesmart.com/how-are-the-co2-emissions-from-e-waste-calculated
// This is a factor that states for every 1 lb. of electronics recycled/repurposed ~= 0.914 lb. of CO2 saved
const CO2_LB_FACTOR = 0.814;
const LBS_TO_KG_FACTOR = 0.453592;

exports.calcCO2Saved = (weightLbs) => (
  // apply the factor and return the CO2 emissions saved in kg
  (+weightLbs * CO2_LB_FACTOR * LBS_TO_KG_FACTOR).toFixed(2)
);
