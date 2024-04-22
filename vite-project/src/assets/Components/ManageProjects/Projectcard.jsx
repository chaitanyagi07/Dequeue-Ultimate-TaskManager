    import React,{useEffect, useState} from "react";
    import { Stack,Card, CardContent, Typography,Box, Button, DialogTitle, DialogContent, CardActions ,Dialog, DialogActions} from "@mui/material";
    import { styled } from "@mui/material/styles";
    import { useNavigate } from "react-router-dom";
    import { CreateprojectForm } from "./CreateProject";

    // Custom styles using Material UI's styled API
    const useStyles = {
  
      card: {
        backgroundColor: "#f5f5f5",
        borderRadius: 4,
        boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.4), 0px 4px 5px 0px rgba(0, 0, 0, 0.3), 0px 1px 10px 0px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
      },
    
      name: {
        fontSize:'20px',
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 8,
        alignSelf: 'flex-start',
        marginTop:'-30px'
      },
    
      status:{
        fontSize: 13,
        color: 'green',
        marginBottom: 8,
        alignSelf: 'flex-end',
        marginTop:-30,
        padding:12,
      },
    
      descriptionContainer: {
        flex: 1,
        marginBottom: 16,
      },
    
      description: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      topRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      }, 
      updatebutton: {
        alignSelf: 'flex-end', // Align to the top left corner
        color:'white',
        backgroundColor:'#8585ef',
        borderRadius:'8px',
        padding:'0px 0px 2px 2px',
        marginTop:-10,
        marginBottom:10,
        fontSize:'10px',
      },
      deletebutton: {
        alignSelf: 'flex-end', // Align to the top right corner
        color:'white',
        backgroundColor:'#c50909',
        borderRadius:'8px',
        padding:'0px 0px 2px 2px', 
        marginTop:-10,
        marginBottom:10,
        fontSize:'10px',
      },
    };
              

    export const Projectcard = ({project,update_project}) => {
      // const [projects,setproject]=useState([]);

      const [open,setopen]=useState(false);

      const handleDelete=async ()=>{
        try{
            const response=await fetch(`http://localhost:30001/project/${project._id}`,{
                method:'DELETE',
                headers: {
                  'Content-Type': 'application/json',
              },
              ...window.location.reload(false)
            });
            if(!response.ok){
              throw new Error('Network response was not ok');
            }
        }
        catch(error){
          console.error('Error deleting project:',error);
        }
    }
        
      return (
        <>
          
          {
            open && <Dialog open ={open} onClose={()=>setopen(false)}>
            <DialogTitle>Update Project</DialogTitle>
            <DialogContent dividers>
              <CreateprojectForm pro_id={project._id} name={project.name}  status={project.status}  desc={project.description} owner={project.owner} update_project={()=>{update_project(); setopen(false)}}/>
            </DialogContent>
          </Dialog>
        }
          
        <Card style={useStyles.card}>
        <CardContent>
        <div style={useStyles.topRow}>
            <Typography style={useStyles.name}>{project.name}</Typography>
            <Typography style={useStyles.status}>{project.status}</Typography>
          </div>
          
          <div style={useStyles.descriptionContainer}>
            <Typography style={useStyles.description}>{project.description}</Typography>
          </div>
        </CardContent>
        <CardActions sx={{gap:10}} >
        <Button style={useStyles.updatebutton} onClick={() => setopen(true)}>Update</Button>
        <Button style={useStyles.deletebutton} onClick={handleDelete}>Delete</Button>
        </CardActions>
      </Card>
        </>
      )
    };



