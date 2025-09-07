;(function(){
  const IN_PER_CM = 1/2.54;
  const CM_PER_IN = 2.54;
  const G_PER_OZ = 28.3495;
  const IN2_PER_CM2 = 1/6.4516;
  const CM2_PER_IN2 = 6.4516;

  function debounce(fn, wait){
    let t; return function(...args){
      clearTimeout(t); t = setTimeout(()=>fn.apply(this,args), wait);
    };
  }

  function formatFractionalUnits(value) {
    const map = {
      0: '', 0.125: '⅛', 0.25: '¼', 0.375: '⅜',
      0.5: '½', 0.625: '⅝', 0.75: '¾', 0.875: '⅞'
    };
    if (!isFinite(value)) return '';
    const rounded = Math.round(value * 8) / 8;
    const whole = Math.floor(rounded + 1e-9);
    const frac = +(rounded - whole).toFixed(3);
    if (rounded >= 1 && frac === 0) return String(whole);
    const f = map[frac] || '';
    return (whole ? whole + (f ? ' ' : '') : '') + (f || '0');
  }

  function round5(n){ return Math.round(n/5)*5; }

  function cmToIn(cm){ return cm * IN_PER_CM; }
  function inToCm(inches){ return inches * CM_PER_IN; }
  function gToOz(g){ return g / G_PER_OZ; }
  function ozToG(oz){ return oz * G_PER_OZ; }

  function defaultTf(units){
    // 0.1 oz/in^2 ≈ 0.439 g/cm^2
    return units === 'imperial' ? 0.1 : 0.1 * G_PER_OZ / CM2_PER_IN2;
  }

  function tfConvert(value, fromUnits, toUnits){
    if (fromUnits === toUnits) return value;
    // imperial (oz/in^2) -> metric (g/cm^2)
    if (fromUnits === 'imperial' && toUnits === 'metric') return value * G_PER_OZ / CM2_PER_IN2;
    // metric (g/cm^2) -> imperial (oz/in^2)
    if (fromUnits === 'metric' && toUnits === 'imperial') return value / G_PER_OZ * CM2_PER_IN2;
    return value;
  }

  function area(units, diameter){
    if (units === 'imperial'){
      const din = diameter; // in
      return Math.PI * Math.pow(din/2, 2); // in^2
    } else {
      const dcm = diameter; // cm
      return Math.PI * Math.pow(dcm/2, 2); // cm^2
    }
  }

  function doughballWeightGrams(diameter, units, tf){
    if (units === 'imperial'){
      const a = area('imperial', diameter); // in^2
      const oz = a * tf; // oz
      return Math.round(ozToG(oz));
    } else {
      const a = area('metric', diameter); // cm^2
      return Math.round(a * tf); // g
    }
  }

  window.PizzaCalc = {
    debounce,
    formatFractionalUnits,
    round5,
    cmToIn, inToCm, gToOz, ozToG,
    defaultTf, tfConvert,
    area, doughballWeightGrams
  };
})();

