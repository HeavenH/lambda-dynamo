const AWS = require("aws-sdk");

const ddb = new AWS.DynamoDB.DocumentClient({ region: 'sa-east-1' });

exports.handler = async(event, context, callback) => {
        const requestId = context.awsRequestId;
        await createWish(requestId).then(() => {
        callback(null, {
            statusCode: 201,
            body: '',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        });
    }).catch((err) => {
        console.error(err)
    })
};
const createWish = (requestId) => {
    const params = {
        TableName: 'wish_List',
        Item: {
          'id': requestId,
          'name': 'dog'
        }
    }
    
    return ddb.put(params).promise();
}
