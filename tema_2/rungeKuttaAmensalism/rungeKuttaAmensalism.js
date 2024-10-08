// Задані параметри
const m1    = 1.088;
const a1    = 3.1;
const b12   = 1.15;
const m2    = 1.896;
const omega = 0.654;
const a2    = 1.25;
const c2    = 0.85;

// Функції для правих частин рівнянь
const du_dt = (u, v) => -m1 + a1 * u - b12 * u * v;
const dv_dt = (u, v) => m2 * Math.sin(omega * v) + a2 * v - c2 * v * v;

// Метод Рунге-Кутти 4-го порядку для системи двох рівнянь
const methodRungeKutta = (u0, v0, h, precision) => {
  let u = u0;
  let v = v0;
  let t = 0;

  let deltaU = Infinity;
  let deltaV = Infinity;

  // Цикл триватиме до досягнення необхідної точності
  do {
      // Обчислюємо коефіцієнти Рунге-Кутти для u і v
      let k1_u = h * du_dt(u, v);
      let k1_v = h * dv_dt(u, v);

      let k2_u = h * du_dt(u + 0.5 * k1_u, v + 0.5 * k1_v);
      let k2_v = h * dv_dt(u + 0.5 * k1_u, v + 0.5 * k1_v);

      let k3_u = h * du_dt(u + 0.5 * k2_u, v + 0.5 * k2_v);
      let k3_v = h * dv_dt(u + 0.5 * k2_u, v + 0.5 * k2_v);

      let k4_u = h * du_dt(u + k3_u, v + k3_v);
      let k4_v = h * dv_dt(u + k3_u, v + k3_v);

      // Оновлюємо значення u та v
      let u_new = u + (k1_u + 2 * k2_u + 2 * k3_u + k4_u) / 6;
      let v_new = v + (k1_v + 2 * k2_v + 2 * k3_v + k4_v) / 6;

      // Оновлюємо дельти для перевірки точності
      deltaU = u_new - u;
      deltaV = v_new - v;

      // Оновлюємо змінні для наступного кроку
      u = u_new;
      v = v_new;
      t++;
  } while (Math.abs(deltaU) >= precision || Math.abs(deltaV) >= precision);

  console.log(`  - ${t}: deltaU = ${deltaU}, deltaV = ${deltaV}`);

  return { u, v, t };
}

// Початкові умови
let u0 = 12.2;
let v0 = 8.0;
let h = 0.001; // Крок інтегрування
let precision = 0.001; // Вимога до точності

// Виконуємо числове інтегрування з перевіркою точності
let result = methodRungeKutta(u0, v0, h, precision);

console.log(`Результати інтегрування:`);
console.log(`u = ${result.u.toFixed(3)}`);
console.log(`v = ${result.v.toFixed(3)}`);
console.log(`Кількість ітерацій ${result.t}`);
