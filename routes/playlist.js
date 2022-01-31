import express from 'express';
const router = express.Router();
import { ObjectId } from 'mongodb';
import { client } from '../index.js';
import { auth } from "../auth.js";
import {getUserById } from '../helper.js'

//create playlist
// router.route('/').post(auth,async(req,res)=>{
//     // const user=await 
// })


export const PlayListRouter = router;