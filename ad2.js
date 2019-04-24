(function() {
    
    console.log('V.1');
    
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "date",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "cost",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "download",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "click",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "per_cost",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "AD",
            alias: "AD",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://sheetsu.com/apis/v1.0su/edf14537c4b2", function(resp) {
            
            
            console.log(resp);
            
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = resp.length; i < len; i++) {
                
                console.log(resp[i]);
                
                tableData.push({
                    "date": resp[i].date,
                    "cost": resp[i].cost,
                    "download": resp[i].download,
                    "click": resp[i].click,
                    "per_cost": resp[i].per_cost
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        
        console.log('V.2');
        
        $("#submitButton").click(function() {
            tableau.connectionName = "AD"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
