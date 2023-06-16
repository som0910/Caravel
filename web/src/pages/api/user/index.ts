/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../../../common/dist/model/User'
import UserCosmosClient from '../../../../../common/dist/server/UserCosmosClient'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User | User[]>
): Promise<void> {
    const { method } = req
    const cosmosClient = new UserCosmosClient()
    if (method === 'GET') {
        // const cosmosClient = new UserCosmosClient()
        try {
            const data = await cosmosClient.getUsers()
            res.status(200).json(data)
        } catch (e) {
            //need to update as per the api
            // eslint-disable-next-line no-console
            console.log(e)
        }
    } else if (method === 'POST') {
        console.log("hello")
        // const cosmosClient = new UserCosmosClient()
        try {

            const user = User.CreateNew(req.body)
            console.log(user)
            await cosmosClient.createOrUpdateUser(user)
            res.status(200).send(user)
        } catch (e) {
            //need to update as per the api
            // eslint-disable-next-line no-console
            console.log(e)
        }
    } else {
        res.status(405).end()
    }
}
