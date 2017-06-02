google.charts.load("current", {packages:["timeline"]});

function drawChart() {

    var container = document.getElementById('chart');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Char' });
    dataTable.addColumn({ type: 'number', id: 'Start' });
    dataTable.addColumn({ type: 'number', id: 'End' });

    for (var i = 0; i < keystrokeLog.length; i++) {
        dataTable.addRow([
            keyboardMap[keystrokeLog[i].keycode],
            keystrokeLog[i].keyDownTimestamp,
            keystrokeLog[i].keyUpTimestamp
        ]);
    }

    var options = {
        timeline: {
            groupByRowLabel: true,
            singleColor: 'red'
        }
    };

    chart.draw(dataTable, options);
}