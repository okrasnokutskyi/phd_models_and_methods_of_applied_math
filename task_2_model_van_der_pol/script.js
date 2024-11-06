// Define the Van der Pol differential equation
function vanDerPol(t, [x, y], epsilon) {
  let dxdt = y;
  let dydt = epsilon * (1 - x ** 2) * y - x;
  return [dxdt, dydt];
}

// Runge-Kutta 4th order method for solving differential equations
function rk4(func, y0, tSpan, dt, epsilon) {
  let [t0, tEnd] = tSpan;
  let t = t0;
  let y = y0;
  let result = { t: [], x: [], y: [] };

  while (t <= tEnd) {
      result.t.push(t);
      result.x.push(y[0]);
      result.y.push(y[1]);

      let k1 = func(t, y, epsilon);
      let k2 = func(t + dt / 2, y.map((yi, i) => yi + (dt / 2) * k1[i]), epsilon);
      let k3 = func(t + dt / 2, y.map((yi, i) => yi + (dt / 2) * k2[i]), epsilon);
      let k4 = func(t + dt, y.map((yi, i) => yi + dt * k3[i]), epsilon);

      y = y.map((yi, i) => yi + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
      t += dt;
  }
  return result;
}

// Function to plot x(t) and y(t) graphs
function plotGraphs() {
  let epsilon = parseFloat(document.getElementById("epsilon").value);
  let initialConditions = [1, 0];
  let tSpan = [0, 50];
  let dt = 0.01;

  let solution = rk4(vanDerPol, initialConditions, tSpan, dt, epsilon);

  // Data for x(t) vs t
  let xTrace = {
      x: solution.t,
      y: solution.x,
      mode: 'lines',
      name: `x(t) for ε = ${epsilon}`,
      line: { width: 2 }
  };

  // Data for y(t) vs t
  let yTrace = {
      x: solution.t,
      y: solution.y,
      mode: 'lines',
      name: `y(t) for ε = ${epsilon}`,
      line: { width: 2 }
  };

  // Layout for x(t) vs t
  let xLayout = {
      title: `x(t) vs t for ε = ${epsilon}`,
      xaxis: { title: 't' },
      yaxis: { title: 'x(t)' },
      showlegend: false
  };

  // Layout for y(t) vs t
  let yLayout = {
      title: `y(t) vs t for ε = ${epsilon}`,
      xaxis: { title: 't' },
      yaxis: { title: 'y(t)' },
      showlegend: false
  };

  // Plot x(t) vs t
  Plotly.newPlot('x_t_plot', [xTrace], xLayout);

  // Plot y(t) vs t
  Plotly.newPlot('y_t_plot', [yTrace], yLayout);
}
