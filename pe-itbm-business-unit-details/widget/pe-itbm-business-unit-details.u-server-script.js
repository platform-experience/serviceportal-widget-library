(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */

    data.details = [{
        title: "Human Capital Management",
        value: "$500,000",
        label: "POTENTIAL SAVE",
        pipeline: {
            projects: 2,
            value: "$500K",
            project: [{
                title: "New Hire Onboarding",
                subtitle: "Globalization",
                value: "$150K",
                roi: 90,
                risk: 20
            }, {
                title: "T&A",
                subtitle: "Cloud Migration",
                value: "$250K",
                roi: 110,
                risk: 30
            }]
        },
        projects: [{
            title: "Oracle",
            status: 1,
            category: [{ title: "COST", value: "$200K", status: 1 },
                { title: "CSAT", value: "80", status: 3 },
                { title: "SLA BREACHED", value: "25%", status: 1 }
            ]
        }, {
            title: "SAP",
            status: 2,
            category: [{ title: "COST", value: "$300K", status: 1 },
                { title: "CSAT", value: "85", status: 3 },
                { title: "SLA BREACHED", value: "20%", status: 2 }
            ]
        }, {
            title: "Workday",
            status: 3,
            category: [{ title: "COST", value: "$50K", status: 3 },
                { title: "CSAT", value: "98", status: 3 },
                { title: "SLA BREACHED", value: "5%", status: 3 }
            ]
        }]
    }, {
        title: "Talent Acquisition",
        value: "$250,000",
        label: "POTENTIAL SAVE",
        pipeline: { projects: 0 },
        projects: [{
            title: "Oracle",
            status: 3,
            category: [{ title: "COST", value: "$150K", status: 2 },
                { title: "CSAT", value: "99", status: 3 },
                { title: "SLA BREACHED", value: "0%", status: 3 }
            ]
        }, {
            title: "SAP",
            status: 3,
            category: [{ title: "COST", value: "$100K", status: 2 },
                { title: "CSAT", value: "96", status: 3 },
                { title: "SLA BREACHED", value: "2%", status: 3 }
            ]
        }]
    }, {
        title: "Workforce Planning",
        value: "$250,000",
        label: "POTENTIAL SAVE",
        pipeline: { projects: 0 },
        projects: [{
            title: "Oracle",
            status: 3,
            category: [{ title: "COST", value: "$75K", status: 3 },
                { title: "CSAT", value: "96", status: 3 },
                { title: "SLA BREACHED", value: "4%", status: 3 }
            ]
        }, {
            title: "SAP",
            status: 3,
            category: [{ title: "COST", value: "$50K", status: 3 },
                { title: "CSAT", value: "96", status: 3 },
                { title: "SLA BREACHED", value: "2%", status: 3 }
            ]
        }, {
            title: "Workday",
            status: 3,
            category: [{ title: "COST", value: "$125K", status: 2 },
                { title: "CSAT", value: "97", status: 3 },
                { title: "SLA BREACHED", value: "1%", status: 3 }
            ]
        }]
    }];

    data.chartOptions = {
        chart: { type: 'pie', reflow: false, spacing: [0, 0, 0, 0], marginTop: -10, height: 90, width: 90, spacingBottom: 12 },
        plotOptions: { pie: { borderWidth: 0, innerSize: '70%', dataLabels: { enabled: false } } },
        colors: ['#E89033', '#dbdad6'],
        exporting: { enabled: false },
        credits: { enabled: false },
        subtitle: { text: 'title', verticalAlign: 'bottom', y: 11, style: { fontSize: '12px', fontWeight: 'bold', color: '#B4B2B3' }, widthAdjust: 80 },
        title: { text: '%', margin: 0, y: 0, x: 0, style: { fontSize: '12px', fontWeight: 500, color: '#000000' }, align: 'center', verticalAlign: "middle" },
        legend: { enabled: false },
        xAxis: { labels: { enabled: false } },
        yAxis: { allowDecimals: false, title: null, labels: { enabled: false } },
        tooltip: { enabled: false },
        series: []
    }

})();