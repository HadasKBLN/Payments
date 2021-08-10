// JavaScript source code


$(document).ready(function () {
    $("#calculate").click(function (e) {
        e.preventDefault();

        let form = $('#dataForm');
        let value = $(form)[0][3].value;

        let totalKVA = 0;
        let totalFixedPayment = 0;
        let totalDemands = 0; 

        var totalPayment = 0;

        var totalCotsh = 0;

        for (var i = 0; i < 20; i++) {
            totalDemands += Number($(form)[0][2 + 5 * i].value);
            totalFixedPayment += Number($(form)[0][3 + 5 * i].value);
            totalKVA += Number($(form)[0][4 + 5 * i].value);
            totalCotsh += Number($(form)[0][5 + 5 * i].value);
            totalPayment += Number($(form)[0][6 + 5 * i].value);
        }

        var previous = $(form)[0][0].value;
        var current = $(form)[0][1].value;
        var partialCotsh = Number(current) - Number(previous);

        var partialPayment = (totalPayment / totalCotsh) * partialCotsh;  // the payment is the Propotinal part of the cotsh 
        partialPayment += totalDemands;                                   // adding the payment all the ������ ������� �����
        partialPayment += (totalFixedPayment + totalKVA) / 2;             // adding the payment half of the fixed and KVA payment
        var finalPyment = partialPayment * 1.17;                          // with VAT (��"�)

        let round = Math.round(finalPyment * 100) / 100;
        document.getElementById("ResultTargetAmount").innerHTML = round;

    });

    $("#inform").click(function (e) {
        e.preventDefault();

        var table = document.getElementById("rateTable");
        table.innerHTML = "";
        var row = table.insertRow(0);

        let form = $('#dataForm');
        let value = $(form)[0][2].value;

        var payment = row.insertCell(0);
        payment.innerHTML = "����� ����";

        var cotsh = row.insertCell(1);
        cotsh.innerHTML = "����";

        var number = row.insertCell(2);
        number.innerHTML = "����";

        for (var i = 1; i <= value; i++) {
            row = table.insertRow(i);
            payment = row.insertCell(0);
            cotsh = row.insertCell(1);
            number = row.insertCell(2);

            number.innerHTML = i;
            cotsh.innerObject = $('#try');
            //value.innerHTML = response["values"][i - 1]["value"];
        }
    });

    $("#calculateWater").click(function (e) {
        e.preventDefault();

        let form = $('#waterForm');

        var totalPayment = 0;

        var totalKUB = 0;

        for (var i = 0; i < 20; i++) {
            
            totalKUB += Number($(form)[0][3 + 2 * i].value);
            totalPayment += Number($(form)[0][2 + 2 * i].value);
        }

        var previous = $(form)[0][0].value;
        var current = $(form)[0][1].value;
        var partialKUB = Number(current) - Number(previous);

        var finalPyment = (totalPayment / totalKUB) * partialKUB;  // the payment is the Propotinal part of the kub 

        let round = Math.round(finalPyment * 100) / 100;
        document.getElementById("ResultWaterTargetAmount").innerHTML = round;

    });
    

});

function cunculateOvall(num) {
    let score = "score" + num;
    num = num - 1;
    let form = $('#dataForm');
    let fixedPayment = form[0][3 + num * 5].value;
    let KVA = form[0][4 + num * 5].value;
    let cotsh = form[0][5 + num * 5].value;
    let consuption = form[0][6 + num * 5].value;
    let demands = form[0][2 + num * 5].value;

    let withoutVAT = Number(consuption) + Number(fixedPayment) + Number(KVA) + Number(demands);
    let VATincluded = withoutVAT * 1.17;
    let round = Math.round(VATincluded * 100) / 100;

    document.getElementById(score).innerHTML = round;

}

function craeteTable(response) {

    var table = document.getElementById("rateTable");
    table.innerHTML = "";
    var row = table.insertRow(0);

    var date = row.insertCell(0);
    date.innerHTML = "DATE";

    var value = row.insertCell(1);
    value.innerHTML = "CURRENCY";

    for (var i = 1; i <= response["values"].length; i++) {
        row = table.insertRow(i);
        date = row.insertCell(0);
        value = row.insertCell(1);
        date.innerHTML = response["values"][i - 1]["date"];
        value.innerHTML = response["values"][i - 1]["value"];
    }
}

