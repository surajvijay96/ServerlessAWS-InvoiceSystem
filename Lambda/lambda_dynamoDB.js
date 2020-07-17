const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient({region : 'us-east-1'});


exports.handler = function (event, context, callback){
    let scanningParams = {
        TableName : 'invoiceTable'
    }
    client.scan(scanningParams, function(err, data){
        if(err){
            callback(err, null);
        }else{
            callback(null, data.Items);
        }
    })

};
