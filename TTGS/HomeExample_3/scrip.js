var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
var chart_1 = $(".chart_1")
// Chart 1:
const data_1 = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
        {
            label: '',
            // display: "none",
            data: [190, 180, 140, 120, 138, 155, 165],
            // borderColor: Utils.CHART_COLORS.red,
            // backgroundColor: "#FCBD88",
            backgroundColor: ["#04CCCA"],  

           barPercentage: 0.6

        },

    ]
};
const config_1 = {
    type: 'bar',
    data: data_1,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },

        },
        scales: {
            y: {
                max: 230,
                min: 40,
                ticks: {
                    stepSize: 40
                }
            },
            xAxes: [{
                maxBarThickness: 10,
            }],
        }
    },
};
var CHART_1 = new Chart(chart_1, config_1)
// Chart 2
var chart_2 = $(".chart_2")
const data_2 = {
    labels: [
        'CHROME',
        'COCCOC',
        'FIREFOX',
        'OHTER'
    ],

    datasets: [{
        label: 'My First Dataset',
        data: [1320, 987, 2010, 1054],
        backgroundColor: [
            '#FCBD88',
            '#F87EB9',
            '#7FE6E5',
            '#7DBCFF'
        ],
        hoverOffset: 4
    }]
};
const config_2 = {
    type: 'doughnut',
    data: data_2,
    options: {
        plugins: {
            legend: {
                display: false,
            },

        },
    },

};
var CHART_2 = new Chart(chart_2, config_2)
// Chart 3
var chart_3 = $(".chart_3")
const data_3 = {
    labels: ["", "", "", "", ""],
    datasets: [
        {
            label: '',
            data: [1320, 987, 2010, 1054, 1550],
            backgroundColor: ["#4bc0c0"],
            fill: true
        },
        {
            label: '',
            data: [1320, 987, 2010, 1054, 2870],
            backgroundColor: "#36a2eb",
            fill: true
        },
    ]
};
const config_3 = {
    type: 'line',
    data: data_3,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: false,
                text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked
            },
            tooltip: {
                mode: 'index'
            },
            legend: {
                display: false,
                position: 'top',
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: 'Month'
                }
            },
            y: {
                max: 10000,
                min: 40,
                display: false,
                stacked: true,
                title: {
                    display: false,
                    text: 'Value'
                }
            }
        }
    }
};
var CHART_3 = new Chart(chart_3, config_3)
// Chart 5
var chart_5 = $(".chart_5")

const labels_5 = ['SMARTPHONE', 'DESKTOP', 'TABLET', 'OTHER'];
const data_5 = {
    labels: labels_5,
    datasets: [
        {
            label: 'Dataset 1',
            data: [6098, 3902, 2165, 1065],
            backgroundColor: [
                // "rgba(255, 0, 0,0.5)",
                // "rgba(255, 165, 0,0.5)",
                // "rgba(255, 255, 0,0.5)",
                // "rgba(0, 128, 0, 0.5)",
                "#F7A4A4",
                "#FEBE8C",
                "#FF5858",
                "#B6E2A1",
            ]
        }
    ]
};
const config_5 = {
    type: 'polarArea',
    data: data_5,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Polar Area Chart'
            }
        }
    },
};
var CHART_5 = new Chart (chart_5,config_5);

