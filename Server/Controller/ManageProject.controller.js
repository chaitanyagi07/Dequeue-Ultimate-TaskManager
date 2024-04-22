const Project = require('../Module/ManageProject.module');
const User=require('../Module/User.module')

class ProjectController {

    async createProject(req, res) {
        try {
            const userid = req.params.userid;
            const user = await User.findById(userid);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const temp={...req.body,user: userid};
            const newProject = await new Project(temp);
            await newProject.save();
            res.status(201).send('Project created successfully');
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    }

    async getProjectById(req,res){
        try {
            const result = await Project.findById(req.params.id);
            if (!result || result.length === 0) {
                res.status(404).send('Project not found');
            } else {
                res.send(result);
            }
        } 
        catch (error) {
            res.status(500).send('Internal server error');
        }
    }

    async getall(req, res) {
        try {
            const projects = await Project.find({user: req.params.userid});
            res.send(projects);
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    }

    async updateProjectById(req,res){
         try{
            const result = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!result) {
                res.status(404).send('Project not found');
            } else {
                res.send(result);
            }
         }
         catch(error){
            res.status(500).send('Internal server error');
         }
    }
    async deleteall(req, res) {
        try {
            const result = await Project.deleteMany();
            res.status(200).send('All projects deleted successfully');
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    }
    
    async projectbyname(req, res){
        try { 
              const projectname=req.params.name;
              console.log(projectname);
            const result = await Project.find({ name:projectname});
            if (!result || result.length === 0) {
                res.status(404).send('Project not found');
            } else {
                res.send(result);
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async deleteProjectById(req,res){
         try{
            const result=await Project.findByIdAndDelete(req.params.id);
            if (!result || result.length === 0) {
                res.status(404).send('Project not found');
            } else {
                res.status(200).send('Project deleted successfully');
            }
         }
         catch(error){
            res.status(500).send('Internal server error'); 
         }
    }
}

module.exports = new ProjectController();
