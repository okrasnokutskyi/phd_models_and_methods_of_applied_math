
// Параметри моделі Лоренца
const sigma = 10;
const r = 28; // Параметр r, який можна змінювати
const b = 8 / 3;

// Початкові умови
const x0 = 1.0;
const y0 = 1.0;
const z0 = 1.0;

// Початкові умови варіант 2
const x0_1 = 13.41265629;
const y0_1 = 13.46430003;
const z0_1 = 33.46156416;

// Параметри інтегрування
const h = 0.01; // Крок
const steps = 10000; // Кількість кроків

// Модель Лоренца
const lorenz = (x, y, z, r) => {
    const dx = sigma * (y - x);
    const dy = x * (r - z) - y;
    const dz = x * y - b * z;
    return [dx, dy, dz];
}

// Метод Рунге-Кутти 4-го порядку
const rungeKutta4 = (x, y, z, r, h, steps) => {
    let result = { x: [], y: [], z: [] };

    for (let i = 0; i < steps; i++) {
        // Зберігаємо результати
        result.x.push(x);
        result.y.push(y);
        result.z.push(z);

        // Обчислюємо k1
        let [k1_x, k1_y, k1_z] = lorenz(x, y, z, r);

        // Обчислюємо k2
        let [k2_x, k2_y, k2_z] = lorenz(x + 0.5 * h * k1_x, y + 0.5 * h * k1_y, z + 0.5 * h * k1_z, r);

        // Обчислюємо k3
        let [k3_x, k3_y, k3_z] = lorenz(x + 0.5 * h * k2_x, y + 0.5 * h * k2_y, z + 0.5 * h * k2_z, r);

        // Обчислюємо k4
        let [k4_x, k4_y, k4_z] = lorenz(x + h * k3_x, y + h * k3_y, z + h * k3_z, r);

        // Оновлюємо змінні
        x += (h / 6) * (k1_x + 2 * k2_x + 2 * k3_x + k4_x);
        y += (h / 6) * (k1_y + 2 * k2_y + 2 * k3_y + k4_y);
        z += (h / 6) * (k1_z + 2 * k2_z + 2 * k3_z + k4_z);
    }

    return result;
}

// Числове розв'язання з початковими умовами
const result = rungeKutta4(x0, y0, z0, r, h, steps);

// Побудова графіку
const trace = {
    x: result.x,
    y: result.y,
    z: result.z,
    mode: 'lines',
    type: 'scatter3d',
    line: { width: 2, color: 'blue' }
};

const layout = {
    title: `Траєкторія Лоренца у фазовому просторі з початковими умовами x=${x0}, y=${y0}, z=${z0}`,
    scene: {
        xaxis: { title: 'X' },
        yaxis: { title: 'Y' },
        zaxis: { title: 'Z' }
    }
};

Plotly.newPlot('plot', [trace], layout);


// Те саме для іншого варіанту
const result_1 = rungeKutta4(x0_1, y0_1, z0_1, r, h, steps);

const layout_1 = {
  title: `Траєкторія Лоренца у фазовому просторі з початковими умовами x=${x0_1}, y=${y0_1}, z=${z0_1}`,
  scene: {
      xaxis: { title: 'X' },
      yaxis: { title: 'Y' },
      zaxis: { title: 'Z' }
  }
};

const trace_1 = {
  x: result_1.x,
  y: result_1.y,
  z: result_1.z,
  mode: 'lines',
  type: 'scatter3d',
  line: { width: 2, color: 'blue' }
};

Plotly.newPlot('plot_1', [trace_1], layout_1);
