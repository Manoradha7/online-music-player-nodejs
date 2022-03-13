import express from 'express';
import { ObjectId } from 'mongodb';
import { client } from '../index.js';
import { auth } from "../auth.js";
const router =express.Router();

//create song 
router.route('/').post(async(req,res)=>{
    const data = req.body;
    const song = await client.db("music").collection('songs').insertOne(data);
    res.status(201).send({data:song,Message:"Song Created Successfully"})
});

//get all songs
router.route('/').get(async(req,res)=>{
    // const data = req.query;
    const songs = await client.db("music").collection("songs").find().toArray() 
    res.status(200).send(songs)
    
})

// get favourite Songs
router.route('/favourite').get(async(req,res)=>{
    const filter = req.query;
    // console.log(filter);
    if(filter.favourite= true){
        filter.favourite == filter.favourite;
    }
    const filteredSongs = await client.db("music").collection("songs").find(filter).toArray() 
    // console.log(filteredSongs);
    res.send(filteredSongs)
})

//update song
router.route('/:id').put(auth,async(req,res)=>{
    const {id}= req.params;
    const data = req.body;
    const song = await client.db("music").collection("songs").findOneAndUpdate({_id:ObjectId(id)},{$set:data});
    res.status(200).send({Message:"Updated Song Successfully"})
})

//delete song by id
router.route("/:id").delete(auth,async(req,res)=>{
    const {id} = req.params;
    await client.db("music").collection("songs").deleteOne({_id:ObjectId(id)});
    res.status(200).send({Message:"Song Deleted Successfully"})
})

//like song
router.route("/liked/:id").put(async(req,res)=>{
    const {id}= req.params;
    const song = await client.db("music").collection("songs").findOne({_id:ObjectId(id)});
    // console.log(song)
    const updateSong =await client.db("music").collection("songs").updateOne(song,{$set:{favourite:true}})
    // console.log(updateSong)
})
router.route("/disliked/:id").put(async(req,res)=>{
    const {id}= req.params;
    const song = await client.db("music").collection("songs").findOne({_id:ObjectId(id)});
    // console.log(song)
    const updateSong =await client.db("music").collection("songs").updateOne(song,{$set:{favourite:false}})
    // console.log(updateSong)
})
export const SongRouter =router;