"use strict"

import { randomUUID as v4 } from "crypto";
import aws from "aws-sdk"

export default async function createItem(event) {
    try {
        const { item } = JSON.parse(event.body);
        const createdAt = new Date().toISOString();
        const id = v4();

        const dynamodb = new aws.DynamoDB.DocumentClient();

        const newItem = {
            id,
            item,
            createdAt,
            itemStatus: false
        };

        await dynamodb.put({
            TableName: "ItemTable",
            Item: newItem
        }).promise()

        return{
            statusCode:201,
            body: JSON.stringify(newItem)
        }

    } catch (error) {
        console.log(error)
    }

}
