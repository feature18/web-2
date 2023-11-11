const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {models} = require("mongoose");

const Chat = db.chat;

const createChat = (req, res) => {
    const chat = new db.chat({
        chatname: req.body.chatname,
        participants: req.body.participants,
        owner: req.body.owner,
        messages: []
    });
    chat.save().then((result, err) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        else{
            res.status(200).send({message: "Chat successfully added"});
            console.log(`Chat with name ${chat.chatname} added`);
        }
    })
}

const getChats = (req, res) => {
    db.chat.find({participants: req.params.user}).then((chats, err) => {
        if(err) {
            res.status(500).send({message: err});
        }
        if(!chats.length){
            res.status(404).send({message: `Chats for ${req.params.user} not found`});
        }
        res.status(200).send({
            message: "Chats is found", chats }
        );
    })
}

const deleteChat = (req, res) => {
    const _id = req.params.id;
    Chat.findOne({_id}).then((chat)=>{
        if (!chat)
        {
            return res.status(404).send({message: `Chat '${req.body.chatname}' not found`});
        }
        if (chat.owner === req.body.owner)
        {
            Chat.deleteOne({_id}).then(() => {
                return res.status(200).send({message: `Chat '${req.body.chatname}' is deleted`});
            }).catch((err) => {
                if (err)
                {
                    return res.status(500).send({message: err});
                }
            })
        }
    }).catch((err) => {
        if (err)
        {
            return res.status(500).send({message: err});
        }
    })
}

const updateChat = (req, res) => {
    Chat.updateOne({_id: req.params.id}, {
        chatname: req.body.chatname,
        participants: req.body.participants,
        owner: req.body.owner,
        messages: req.body.message
    }).then((chat) => {
        if (!chat)
        {
            return res.status(404).send({message: `Chat '${req.body.chatname}' not found`});
        }
        return res.status(200).send({message: `Chat '${req.body.chatname}' was updated`});
    }).catch((err) => {
        if (err)
        {
            return res.status(500).send({message: err});
        }
    })
}

module.exports = {
    createChat,
    getChats,
    deleteChat,
    updateChat
}