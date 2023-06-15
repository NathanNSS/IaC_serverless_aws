"use strict"

import aws from "aws-sdk"

export default async function fetchItems() {
    try {
        const dynamodb = new aws.DynamoDB.DocumentClient();

        let {Items : items} = await dynamodb.scan({
            TableName:"ItemTable"
        }).promise()

        return{
            statusCode:200,
            body: JSON.stringify(items)
        }

    } catch (error) {
        console.log(error)
    }
}
