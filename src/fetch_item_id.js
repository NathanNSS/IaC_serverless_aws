"use strict"

import aws from "aws-sdk"

export default async function fetchItemByID(event) {
    try {
        const {id} = event.pathParameters
        
        const dynamodb = new aws.DynamoDB.DocumentClient();

        let {Items : items} = await dynamodb.get({
            TableName:"ItemTable",
            Key:{id}
        }).promise()

        return{
            statusCode:200,
            body: JSON.stringify(items)
        }

    } catch (error) {
        console.log(error)
    }
}
