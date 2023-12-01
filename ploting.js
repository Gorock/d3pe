const data = await d3.csv(stock, (row) => {
  return {
    time: new Date(row.time),
    resource: row.resource,
    ammount: +row.ammount,
  };
});
console.log(data);
const div = document.querySelector("#myplot");
const div2 = document.querySelector("#myplot2");

const sd = d3.sort(data, (a, b) => d3.descending(a.time, b.time));
const gtime = d3.group(data, (d) => d.time);
const newest = gtime.get(sd[0].time);
const plot = Plot.plot({
  marginLeft: 130,
  marginRight: 100,
  width: Math.max(640, 1000),
  style: "margin: auto",
  x: {
    axis: "top",
    grid: true,
  },
  color: { scheme: "category10", legend: false },
  marks: [
    Plot.barX(newest, {
      y: "resource",
      x: "ammount",
      fill: "resource",
      fy: "time",
      sort: { y: null, color: null, fy: { value: "-x", reduce: "sum" } },
      tip: {fill: "rgb(23, 27, 21)"},
    }),
    Plot.ruleX([0]),
    Plot.text(newest, {
      text: (d) => d.ammount,
      fy: "time",
      y: "resource",
      x: 2,
      fontWeight: 600,
      textAnchor: "start",
      dx: 3,
      fill: "white",
    }),
  ],
});

const plot2 = Plot.plot({
  grid: true,
  nice: true,
  marginLeft: 130,
  marginRight: 100,
  width: Math.max(640, 1000),
  style: "margin: auto",
  color: { scheme: "category10", legend: false },

  marks: [
    Plot.ruleY([0]),
    Plot.lineY(data, {
      x: "time",
      y: "ammount",
      stroke: "resource",
      tip: { fill: "rgb(33, 37, 41)" },
      marker: false,
    }),
    Plot.text(
      data,
      Plot.selectLast({
        x: "time",
        y: "ammount",
        z: "resource",
        text: "resource",
        textAnchor: "start",
        dx: 3,
      })
    ),
    Plot.axisX(),
    Plot.axisY({ ticks: 50, text: null, tickSize: 3 }),
    Plot.axisY(),
    // Plot.text(data, {x: "time", y: "ammount", z: "resource", text: "ammount", textAnchor: "start", dy: -8})
  ],
});

div.append(plot);
div2.append(plot2);
