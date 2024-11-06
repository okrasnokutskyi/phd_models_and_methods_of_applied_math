const math = require('mathjs');

// Функція, яка визначає модель Ван дер Поля
function vanDerPol(t, state, epsilon) {
    const [x, y] = state;
    const dxdt = y;
    const dydt = epsilon * (1 - x ** 2) * y - x;
    return [dxdt, dydt];
}

// Метод Рунге-Кутта 4-го порядку для розв'язання системи диференціальних рівнянь
function rk4(func, y0, tSpan, dt, epsilon) {
    const [t0, tEnd] = tSpan;
    let t = t0;
    let y = y0;
    const result = { t: [], x: [], y: [] };

    while (t <= tEnd) {
        result.t.push(t);
        result.x.push(y[0]);
        result.y.push(y[1]);

        const k1 = func(t, y, epsilon);
        const k2 = func(t + dt / 2, y.map((yi, i) => yi + (dt / 2) * k1[i]), epsilon);
        const k3 = func(t + dt / 2, y.map((yi, i) => yi + (dt / 2) * k2[i]), epsilon);
        const k4 = func(t + dt, y.map((yi, i) => yi + dt * k3[i]), epsilon);

        y = y.map((yi, i) => yi + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
        t += dt;
    }
    return result;
}

// Функція для обчислення середнього періоду коливань
function calculateAveragePeriod(solution) {
    const peaks = [];
    const times = solution.t;

    for (let i = 1; i < solution.x.length - 1; i++) {
        if (solution.x[i - 1] < solution.x[i] && solution.x[i] > solution.x[i + 1]) {
            peaks.push(times[i]);
        }
    }

    const periods = [];
    for (let i = 1; i < peaks.length; i++) {
        periods.push(peaks[i] - peaks[i - 1]);
    }

    const averagePeriod = periods.length > 0 ? math.mean(periods) : null;
    return averagePeriod;
}

// Значення параметрів
const epsilons = [-0.2, 0.1, 0.2, 0.5, 1.5, 2.0];
const tSpan = [0, 50];
const dt = 0.01;
const initialConditions = [1, 0]; // Початкові умови x(0) = 1, y(0) = 0

// Розв'язок рівняння для кожного значення ε та обчислення середнього періоду
epsilons.forEach(epsilon => {
    const solution = rk4(vanDerPol, initialConditions, tSpan, dt, epsilon);
    const averagePeriod = calculateAveragePeriod(solution);
    console.log(`Середній період коливань при ε = ${epsilon}: ${averagePeriod ? averagePeriod.toFixed(2) : 'N/A'}`);
});
