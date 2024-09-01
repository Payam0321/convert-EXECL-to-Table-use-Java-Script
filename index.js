var table = document.getElementById("table");
document.getElementById('loadButton').addEventListener('click', function () {
    // Trigger file input click when button is clicked
    document.getElementById('fileInput').click();
});

// Event listener for file input change
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0]; // Get the selected file
    if (!file) return;

    // Read the file using FileReader
    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        //console.log(data);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming we read the first sheet and use its content
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert the sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Use jsonData as a parameter (for example, log to console)
        //console.log(jsonData);

        // Display data in a simple format
        //document.getElementById('output').innerHTML = JSON.stringify(jsonData, null, 2);
        var rowIndex = 0;
        jsonData.forEach(element => {
            var row = table.insertRow(rowIndex);
            //var celIndex = 0;
            for (let i = 0; i < element.length; i++) {
                //console.log(element[i]);
                var cell1 = row.insertCell(i);
                cell1.innerHTML = element[i];
                //celIndex++;
            }
            //const vlaues = element.split(",");
            //document.getElementById('output').innerHTML = element;
            rowIndex++;
        });

    };

    // Read the file as an array buffer
    reader.readAsArrayBuffer(file);
});