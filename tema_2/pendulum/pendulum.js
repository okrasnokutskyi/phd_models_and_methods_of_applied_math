// Параметр omega
const omega = 1.0;

// Система рівнянь для маятника
function pendulum(t, y) {
    const x1 = y[0];
    const x2 = y[1];

    // Похідні
    const dx1dt = omega * x2;
    const dx2dt = -omega * x1;

    return [dx1dt, dx2dt];
}

// Метод Рунге-Кутти для системи диференціальних рівнянь
function rungeKutta4(func, t0, y0, h, steps) {
    let t = t0;
    let y = y0;
    let result = { x1: [], x2: [], t: [] };

    for (let i = 0; i < steps; i++) {
        result.x1.push(y[0]);
        result.x2.push(y[1]);
        result.t.push(t);

        let k1 = func(t, y);
        let k2 = func(t + 0.5 * h, [y[0] + 0.5 * h * k1[0], y[1] + 0.5 * h * k1[1]]);
        let k3 = func(t + 0.5 * h, [y[0] + 0.5 * h * k2[0], y[1] + 0.5 * h * k2[1]]);
        let k4 = func(t + h, [y[0] + h * k3[0], y[1] + h * k3[1]]);

        y[0] += (h / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
        y[1] += (h / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
        t += h;
    }

    return result;
}

// Початкові умови та параметри
const initial_conditions = [
    [1, 0], // Початкове положення 1, швидкість 0
    [0, 1], // Початкове положення 0, швидкість 1
    [-1, 0], // Початкове положення -1, швидкість 0
    [0, -1]  // Початкове положення 0, швидкість -1
];
const h = 0.05; // Крок інтегрування
const steps = 400; // Кількість кроків

// Побудова фазового портрету для кожної початкової умови
let data = [];
initial_conditions.forEach((initial) => {
    let result = rungeKutta4(pendulum, 0, initial, h, steps);
    let trace = {
        x: result.x1,
        y: result.x2,
        mode: 'lines',
        name: `x1_0 = ${initial[0]}, x2_0 = ${initial[1]}`
    };
    data.push(trace);
});

// Відображення графіка
Plotly.newPlot('plot', data, {
    title: 'Фазовий портрет гармонічного маятника',
    xaxis: { title: 'x1 (Положення)' },
    yaxis: { title: 'x2 (Швидкість)' },
    grid: true
});
