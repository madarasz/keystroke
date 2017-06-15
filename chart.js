google.charts.load("current", {packages:["timeline", "corechart"]});

// draw keyboard timeline
function drawKeyboardChart() {

    var container = document.getElementById('chart-keyboard');
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
        },
        height: 500
    };

    chart.draw(dataTable, options);
    container.classList.remove('hidden-xs-up'); // make chart visible
}

// draws mouse charts
function drawMouseCharts() {

    var prevX, prevY, prevTimestamp, speed, prevSpeed,
        // chart containers
        containerMovement = document.getElementById('chart-mouse-movement'),
        containerSpeed = document.getElementById('chart-mouse-speed'),
        containerAcceleration = document.getElementById('chart-mouse-acceleration'),
        // charts
        chartMovement = new google.visualization.ScatterChart(containerMovement),
        chartSpeed = new google.visualization.LineChart(containerSpeed),
        chartAcceleration = new google.visualization.LineChart(containerAcceleration),
        // data tables
        dataTableMovement = new google.visualization.DataTable(),
        dataTableSpeed = new google.visualization.DataTable(),
        dataTableAcceleration = new google.visualization.DataTable();

    // add data table columns
    dataTableMovement.addColumn({ type: 'number', id: 'x' });
    dataTableMovement.addColumn({ type: 'number', id: 'y' });
    dataTableMovement.addColumn({ type: 'string', role: 'style' }); // to indicate clicks with different color
    dataTableSpeed.addColumn({ type: 'number', id: 'time' });
    dataTableSpeed.addColumn({ type: 'number', id: 'speed' });
    dataTableAcceleration.addColumn({ type: 'number', id: 'time' });
    dataTableAcceleration.addColumn({ type: 'number', id: 'acceleration' });

    // iterate over mouse log
    for (var i = 0; i < mouseLog.length; i++) {

        // movement data
        if (mouseLog[i].type == 'movement') {

            dataTableMovement.addRow([mouseLog[i].x, mouseLog[i].y, null]);
            // speed data
            if (i > 0) {
                // speed = distance / time passed
                speed = Math.sqrt(Math.pow(mouseLog[i].x - prevX, 2) + Math.pow(mouseLog[i].x - prevY, 2))
                            / (mouseLog[i].timestamp - prevTimestamp);

                dataTableSpeed.addRow([mouseLog[i].timestamp, speed]);
            }
            // acceleration data
            if (i > 1) {
                dataTableAcceleration.addRow([mouseLog[i].timestamp, speed - prevSpeed]);
            }
            // storing previous values
            prevX = mouseLog[i].x; prevY = mouseLog[i].y; prevTimestamp = mouseLog[i].timestamp; prevSpeed = speed;

        }

    }

    // iterate for mouse clicks, so they are on top
    for (var i = 0; i < mouseLog.length; i++) {
        if (mouseLog[i].type == 'mouseup') {
            dataTableMovement.addRow([mouseLog[i].x, mouseLog[i].y, 'point { fill-color: #ff0000 }']);  // mark with red dot
        }
    }

    var optionsMovement = {
            title: 'Mouse movement',
            hAxis: { minValue: 0 },
            vAxis: { minValue: 0, direction: -1 },
            legend: 'none',
            height: 500,
            width: 500
        },
        optionsSpeed = {
            title: 'Mouse speed',
            legend: 'none'
        },
        optionsAcceleration = {
            title: 'Mouse acceleration',
            legend: 'none'
        };

    chartMovement.draw(dataTableMovement, optionsMovement);
    chartSpeed.draw(dataTableSpeed, optionsSpeed);
    chartAcceleration.draw(dataTableAcceleration, optionsAcceleration);
}