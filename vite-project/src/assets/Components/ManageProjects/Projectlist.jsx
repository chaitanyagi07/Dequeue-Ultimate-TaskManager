import React,{useState,useEffect} from "react";
import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { Projectcard } from "./Projectcard";
import { CreateprojectForm } from "./CreateProject";
import SideBar from '../layout/Sidbar/sideBar'


export const Projectlist=()=>{
    const [open,setopen]=useState(false);
    const [projectList,setProjectList]=useState([]);
    const [searchText, setSearchText]=useState('');
    const [searchProject, setSearchProject]=useState([]);
    const [FinalProject, setFinalProject]=useState([]);
    const [search,setSearch]=useState(false);
    const usertoken=window.localStorage.getItem("usertoken")
    // console.log(usertoken);
    const tokenParts = usertoken.split('.');
    // console.log(tokenParts);
    const tokenPayload = JSON.parse(atob(tokenParts[1]));
    // console.log(tokenPayload);
    const userId = tokenPayload.userId; 
      
     const getproject =async()=>{
          try{
             const response=await fetch(`http://localhost:30001/project/${userId}`,{
                 method:'GET',
                 headers:{
                    'Content-Type': 'application/json'
                 }
             })
               console.log(response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const projectList=await response.json();
            setProjectList(projectList);
            console.log(projectList);
          }
          catch(error){
             console.log('Error fetching users:',error);
          }
     }

   const update_project=()=>{
        getproject();
        setopen(false);
    }
     useEffect(()=>{
        getproject();  
     },[])
    
     const projectsearch=async()=>{
          try{
             const response=await fetch(`http://localhost:30001/project/name/${searchText}`,{
                   method:'GET',
                   headers:{
                    'Content-Type': 'application/json'
                   }
             })
             if(!response.ok){
                throw new Error('Network response was not ok');
             }
             const data=await response.json();
             setSearch(true);
             setSearchProject(data);
             console.log(data);
          }
          catch(error){
            console.error('Error updating project:', error);
          }
     }

     useEffect(()=>{
           if(search){
               setFinalProject(searchProject);
           }
           else{
             setFinalProject(projectList);
           }
     },[search,searchProject,projectList])

     const renderInput = (params) => (
        <TextField {...params} label="Search" variant="outlined" />
      );
      
     return(
         <>
          <SideBar/>
         <Box
            component="form"
            sx={{
                '& > :not(style)': { m:1, width: '25ch',display:'flex',flexDirection:'column'},

            }}
            noValidate
            autoComplete="off"
            >
           
           <Autocomplete
           disablePortal
           id="combo-box-demo"
           options={projectList?.map((s)=>{
              return s.name;
           }) || []}
           onChange={(_e,value)=>{
             setSearchText(value) 
           }}   
            style={{
            position: 'absolute',
            marginLeft:'1200px',
            marginTop:-'80px',
            width:'195px'
          }}

           renderInput={renderInput}
           sx={{ width: 300 }}
           value={searchText}
         />   
        <Button 
         onClick={projectsearch}
          variant="contained"
          style={{
            position: 'absolute',
            marginLeft:'1200px',
            marginTop:'70px',
          }}
          >Search</Button>
       </Box> 
           <Dialog  open ={open} onClose={()=>setopen(false)}>
              <DialogTitle>Create Project</DialogTitle>
              <DialogContent dividers>
                <CreateprojectForm update_project={update_project}/>
              </DialogContent>
          </Dialog>

       <Box sx={{display:"flex",gap:2,flexDirection:"column",marginLeft:"100px"}} className="projectlist">
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
            <Button 
            variant="contained" 
            onClick={()=>setopen(true)}
            style={{
              position: 'absolute',
              marginTop:'20px',
            }}
            >+Create Project</Button>
        </Box>

          <Box>
            <Grid container gap={2} sx={{marginTop:'120px'}}>
            {FinalProject?.map((project)=>(
                (
                  <Grid item xs={2.8}> 
                     <Projectcard  key={project._id} project={project} update_project={update_project}/>
                  </Grid>
               )
            ))}
            </Grid>
          </Box>
        </Box>
          
        </>
     )
     
}
 
