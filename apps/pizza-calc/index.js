const PC = window.PizzaCalc;

function saveState() {
  const units = document.querySelector('input[name="units"]:checked').value;
  const state = {
    units,
    qty: document.getElementById('qty').value,
    dia: document.getElementById('dia').value,
    tf: document.getElementById('tf').value,
    hydration: document.getElementById('hydration').value,
    yeast: document.getElementById('yeast').value,
    salt: document.getElementById('salt').value,
    sugar: document.getElementById('sugar').value,
    olive: document.getElementById('olive').value
  };
  localStorage.setItem('pizzaCalcState', JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem('pizzaCalcState');
  if (!raw) return;
  try {
    const s = JSON.parse(raw);
    if (s.units) {
      document.getElementById(s.units === 'metric' ? 'unitsMetric' : 'unitsImperial').checked = true;
    }
    const set = (id, v) => { if (v != null) document.getElementById(id).value = v; };
    set('qty', s.qty);
    set('dia', s.dia);
    set('tf', s.tf);
    set('hydration', s.hydration);
    set('yeast', s.yeast);
    set('salt', s.salt);
    set('sugar', s.sugar);
    set('olive', s.olive);
  } catch {}
}

function updateUnitLabels() {
  const units = document.querySelector('input[name="units"]:checked').value;
  const diaLabel = document.getElementById('diaLabel');
  const tfLabel = document.getElementById('tfLabel');
  const diaInput = document.getElementById('dia');
  const tfInput = document.getElementById('tf');
  if (units === 'imperial') {
    diaLabel.textContent = 'Diameter of Pizza (in)';
    diaInput.min = 4; diaInput.max = 24; diaInput.step = 0.25;
    tfLabel.textContent = 'Thickness Factor (oz/in²)';
  } else {
    diaLabel.textContent = 'Diameter of Pizza (cm)';
    diaInput.min = 10; diaInput.max = 60; diaInput.step = 0.5;
    tfLabel.textContent = 'Thickness Factor (g/cm²)';
  }
}

function onUnitsChange(prevUnits, nextUnits) {
  // Convert displayed diameter and TF when units toggle changes
  const diaInput = document.getElementById('dia');
  const tfInput = document.getElementById('tf');
  let dia = parseFloat(diaInput.value);
  let tf = parseFloat(tfInput.value);
  if (!isNaN(dia)) {
    dia = nextUnits === 'imperial' ? PC.cmToIn(dia) : PC.inToCm(dia);
    diaInput.value = +dia.toFixed(2);
  }
  if (!isNaN(tf)) {
    tf = PC.tfConvert(tf, prevUnits, nextUnits);
    tfInput.value = +tf.toFixed(nextUnits === 'imperial' ? 3 : 3);
  } else {
    tfInput.value = PC.defaultTf(nextUnits).toFixed(nextUnits === 'imperial' ? 3 : 3);
  }
  updateUnitLabels();
}

function calculate(event) {
  if (event) event.preventDefault();
  const units = document.querySelector('input[name="units"]:checked').value;
  const q = parseInt(document.getElementById('qty').value, 10);
  const d = parseFloat(document.getElementById('dia').value);
  const tf = parseFloat(document.getElementById('tf').value);
  const hydrationPct = parseFloat(document.getElementById('hydration').value);
  const yeastPct = parseFloat(document.getElementById('yeast').value);
  const saltPct = parseFloat(document.getElementById('salt').value);
  const sugarPct = parseFloat(document.getElementById('sugar').value);
  const olivePct = parseFloat(document.getElementById('olive').value);

  const results = document.getElementById('results');
  results.innerHTML = '';

  if ([q, d, tf, hydrationPct, yeastPct, saltPct, sugarPct, olivePct].some(v => isNaN(v))) {
    results.innerHTML = '<div class="alert alert-warning">Please enter valid numbers in all fields.</div>';
    return;
  }
  if (q < 1 || d <= 0 || tf <= 0) {
    results.innerHTML = '<div class="alert alert-warning">Quantity must be ≥ 1; diameter and thickness factor must be positive.</div>';
    return;
  }

  // Doughball weight (g) via thickness-factor area formula
  const weight = PC.doughballWeightGrams(d, units, tf);

  const totalDough = q * weight; // g
  const hydration = hydrationPct / 100;
  const flour = PC.round5(Math.round(totalDough / (1 + hydration))); // g
  const water = totalDough - flour; // g ~ ml for water

  const yeast = Math.round(flour * (yeastPct / 100) * 5) / 5; // g
  const salt = Math.round(flour * (saltPct / 100) * 5) / 5;   // g
  const sugar = Math.round(flour * (sugarPct / 100) * 5) / 5; // g
  const olive = Math.round(flour * (olivePct / 100) * 5) / 5; // g

  // Approximate conversions
  const tspYeast = PC.formatFractionalUnits(yeast / 2.83);
  const tspSalt = PC.formatFractionalUnits(salt / 5.69);
  const tspSugar = PC.formatFractionalUnits(sugar / 4.167);
  const tspOlive = PC.formatFractionalUnits(olive / 4.929);
  const tbspOlive = PC.formatFractionalUnits(olive / 14.7868);

  const flourOz = PC.gToOz(flour).toFixed(2);
  const waterOz = PC.gToOz(water).toFixed(2);
  const yeastOz = PC.gToOz(yeast).toFixed(2);
  const saltOz = PC.gToOz(salt).toFixed(2);
  const sugarOz = PC.gToOz(sugar).toFixed(2);
  const oliveOz = PC.gToOz(olive).toFixed(2);
  const weightOz = PC.gToOz(weight).toFixed(2);
  const totalDoughOz = PC.gToOz(totalDough).toFixed(2);

  const flourCups = (flour / 120).toFixed(2); // ~120 g per cup AP flour
  const waterCups = (water / 236.588).toFixed(2); // water density ~1 g/ml

  results.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-3">Results</h5>
        <div class="table-responsive">
          <table class="table table-sm mb-0">
            <tbody>
              <tr><th scope="row">Flour</th><td>${flour} g (${flourOz} oz, ${flourCups} cups)</td></tr>
              <tr><th scope="row">Water</th><td>${water} ml (${water} g, ${waterOz} oz, ${waterCups} cups)</td></tr>
              <tr><th scope="row">Yeast</th><td>${yeast} g (${yeastOz} oz, ${tspYeast} tsp)</td></tr>
              <tr><th scope="row">Salt</th><td>${salt} g (${saltOz} oz, ${tspSalt} tsp)</td></tr>
              <tr><th scope="row">Sugar</th><td>${sugar} g (${sugarOz} oz, ${tspSugar} tsp)</td></tr>
              <tr><th scope="row">Olive Oil</th><td>${olive} g (${oliveOz} oz, ${tspOlive} tsp / ${tbspOlive} tbsp)</td></tr>
              <tr class="table-active"><th scope="row">Weight per dough ball</th><td>${weight} g (${weightOz} oz)</td></tr>
              <tr><th scope="row">Total dough</th><td>${totalDough} g (${totalDoughOz} oz)</td></tr>
            </tbody>
          </table>
        </div>
        <small class="text-muted">Volume conversions are approximate and may vary by flour brand and humidity.</small>
      </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateUnitLabels();

  const form = document.querySelector('form');
  form.addEventListener('submit', calculate);

  // Debounced auto-calc on input
  const debouncedCalc = PC.debounce(() => { saveState(); calculate(); }, 150);
  form.querySelectorAll('input').forEach(el => {
    el.addEventListener('input', debouncedCalc);
    el.addEventListener('change', debouncedCalc);
  });

  // Unit toggle conversion
  let lastUnits = document.querySelector('input[name="units"]:checked').value;
  document.getElementById('unitsMetric').addEventListener('change', () => {
    const next = 'metric'; onUnitsChange(lastUnits, next); lastUnits = next; saveState(); calculate();
  });
  document.getElementById('unitsImperial').addEventListener('change', () => {
    const next = 'imperial'; onUnitsChange(lastUnits, next); lastUnits = next; saveState(); calculate();
  });

  // First paint
  calculate();
});
