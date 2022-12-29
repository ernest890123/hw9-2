import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
const router = Router();

router.delete("/cards", (_,res) => {
    const Delete = async() =>{
        await ScoreCard.deleteMany({})
        res.json({message: 'Database cleared'})
    }
    Delete();
}); 

router.post("/card", (req,res) =>{
    const cardName = req.body.name;
    const cardSubject = req.body.subject;
    const cardScore = req.body.score;

    const Post = async() =>{
        const count = await ScoreCard.countDocuments({name: cardName, subject: cardSubject})

        if(count > 0){
            ScoreCard.updateOne({name: cardName, subject: cardSubject}, {$set:{score: cardScore}}).then((date) => { console.log('date', date);})
            res.json({message: 'Updating (' + cardName + ', ' + cardSubject + ', ' + cardScore + ')' , card:''});
        }else if(count == 0){
            new ScoreCard({name: cardName, subject: cardSubject, score: cardScore}).save();
            res.json({message: 'Adding (' + cardName + ', ' + cardSubject + ', ' + cardScore + ')' , card:ScoreCard({name: cardName, subject: cardSubject, score: cardScore})});
        }
    }

    Post();
});

router.get("/cards", (req,res) =>{
    const searchType = req.query.type;
    const searchString = req.query.queryString;
    const Search = async() =>{
        if (searchType == 'name'){
            const thisCard = await ScoreCard.find({name: searchString})
            if(thisCard.length > 0){
                const returnMessage = new Array(thisCard.length)
                for(let i=0; i<thisCard.length; i++){
                    returnMessage[i] = 'Found card with name: (' + thisCard[i].name + ', ' + thisCard[i].subject + ', ' + thisCard[i].score + ')'
                }
                res.json({messages: returnMessage, message: ''})
            }else{
                res.json({message: "Name" +" ("+ searchString+ ") not found!"})
            }
        }else if(searchType == 'subject'){
            const thisCard = await ScoreCard.find({subject: searchString})
            if(thisCard.length > 0){
                const returnMessage = new Array(thisCard.length)
                for(let i=0; i<thisCard.length; i++){
                    returnMessage[i] = 'Found card with subject: (' + thisCard[i].name + ', ' + thisCard[i].subject + ', ' + thisCard[i].score + ')'
                }
                res.json({messages: returnMessage, message: ''})
            }else{
                res.json({message: "Subject" +" ("+ searchString+ ") not found!"})
            }
        }
    }
    
    Search();
});

export default router;
