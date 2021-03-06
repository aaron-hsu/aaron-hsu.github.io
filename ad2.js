(function() {
    
    console.log('V.2');
    
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
            id: "show",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "click",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "download",
            dataType: tableau.dataTypeEnum.string
        } ,{
            id: "ctr",
            dataType: tableau.dataTypeEnum.string
        } ,{
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
        $.getJSON("https://script.google.com/macros/s/AKfycbxIaWgRCHgkYxzjJdRfjahMMddD-flHP-IyUC4lWYmvS2r7f_sX/exec", function(resp) {
            
            
            console.log(resp);
            
            var ad_data = resp.ad_data,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = ad_data.length; i < len; i++) {
                
                console.log(ad_data[i]);
                
                tableData.push({
                    "date": ad_data[i].date,
                    "cost": ad_data[i].cost,
                    "show": ad_data[i].show,                    
                    "click": ad_data[i].click,                                        
                    "download": ad_data[i].download,
                    "ctr": ad_data[i].ctr,
                    "per_cost": ad_data[i].per_cost
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
