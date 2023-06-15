"use strict"

import aws from "aws-sdk"

export default async function fetchItemByID(event) {
    try {
        const {id} = event.pathParameters
        const {itemStatus} = JSON.parse(event.body);
        
        const dynamodb = new aws.DynamoDB.DocumentClient();

        await dynamodb.update({
            TableName: "ItemTable",
            Key: {id},
            UpdateExpression: 'set itemStatus = :itemStatus',
            ExpressionAttributeValues: {
              ':itemStatus': itemStatus
            },
            ReturnValues: "ALL_NEW"
          }).promise()

        return{
            statusCode:200,
            body: JSON.stringify({
                msg: `Item ${id} update`
            })
        }

    } catch (error) {
        console.log(error)
    }
}
