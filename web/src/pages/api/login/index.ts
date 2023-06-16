/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../../../common/dist/model/User'
import UserCosmosClient from '../../../../../common/dist/server/UserCosmosClient'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User | undefined | {}>
): Promise<void> {
    const { method } = req
    const id = req.query.id;
    const cosmosClient = new UserCosmosClient()
    if (method === 'GET') {
        try {
            if (typeof id === 'string') {
                const data = await cosmosClient.getById(id)
                res.status(200).json(data)
              } 
            
        } catch (e) {
            //need to update as per the api
            // eslint-disable-next-line no-console
            console.log(e)
        }
    } 
    else if(method=="POST"){
        try{
            const {id,password} = req.body;
            const data = await cosmosClient.getById(id);
            if(data===undefined){
                res.status(201).json(data)
            } else{
                if(data.dob === password){
                    res.status(200).json(data);
                }else{
                    res.status(401).json({
                        "message":"wrong password"
                    })
                }
            }
        }catch(e){
            console.log(e)
        }
    }
    else {
        res.status(405).end()
    }
}
