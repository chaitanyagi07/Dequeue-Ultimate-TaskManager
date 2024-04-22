const { json } = require('body-parser');
const Card = require('../Module/Card.module');
const User=require('../Module/User.module')


class CardController {
    async createCard(req, res) {
        try {
          const userid = req.params.userid;
          const user = await User.findById(userid);
          if (!user) {
              return res.status(404).json({ error: 'User not found' });
          }
          const newCardData = { ...req.body, user: userid };
          const newCard = new Card(newCardData);
            await newCard.save();
            console.log(newCard);
            return  res.status(200).json(newCard);
        } catch (error) {
            throw error;
        }
    }

    async getCardById(req, res) {
        try {
            const card = await Card.findById(req.params.id);
            //  console.log(req.params.id);
            if (!card) {
                return res.status(404).json({ error: 'Card not found' });
            }
            return  res.status(200).json(card);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
 async getall(req,res){
    try {
      const card = await Card.find({user: req.params.userid});
        return res.status(200).json(card);
    } catch (error) {
        throw error;
    }
 }

 async deleteall(req,res){
    try{
        const result=await Card.deleteMany();
        return res.status(200).json({ message: 'Deleted successfully', result});
     }
     catch(error){
        return res.status(500).json({ message: 'Internal server error' });
     }
 }

 async createSubtask(req, res) {
    try {
      const task = await Card.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      const subtaskTitle = req.body.title;
  
      task.subtask.push(subtaskTitle);
      await task.save();
  
      console.log(`Subtask "${subtaskTitle}" is created`);
      return res.status(200).json(task);
    } catch (error) {
    //   console.error("Error creating subtask:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async deleteSubtask(req, res) {
    try {
      const task = await Card.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      const subtaskTitle = req.body.title;
      const subtaskIndex = task.subtask.findIndex((subtask) => subtask === subtaskTitle);
  
      if (subtaskIndex === -1) {
        return res.status(404).json({ message: "Subtask not found" });
      }
  
      task.subtask.splice(subtaskIndex, 1);
  
      await task.save();
  
      console.log(`Subtask "${subtaskTitle}" is deleted`);
      return res.status(200).json(task);
    } catch (error) {
     
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
  async deleteCardbyId(req,res){
    try{
        const result= await Card.findByIdAndDelete(req.params.id);
         return res.status(200).json({ message: 'Deleted successfully', result});
   }
   catch(err){
        console.error(err.message)
   }
 }
}

module.exports = new CardController();
