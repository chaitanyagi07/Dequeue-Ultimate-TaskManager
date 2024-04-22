import React,{useState,useEffect} from 'react';
import { Box, Button, Input, ListItemText, Menu, MenuItem, Select } from '@mui/material'; 
import { Form, Formik } from 'formik';    
import *  as Yup from 'yup'



const Status=["Inprogress","Complete"]

export const CreateprojectForm=({pro_id,name,status,description,owner,update_project})=>{
    const [userlist,setuserlist]=useState([])
    const [anchorEl, setAnchorEl] = useState(null); 


    const CreatevalidationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        status: Yup.string().required('Status is required'),
        description: Yup.string().required('Description is required'),
        owner: Yup.string().required('Owner is required')
    });
 
    const usertoken=window.localStorage.getItem("usertoken")
    // console.log(usertoken);
    const tokenParts = usertoken.split('.');
    // console.log(tokenParts);
    const tokenPayload = JSON.parse(atob(tokenParts[1]));
    // console.log(tokenPayload);
    const userId = tokenPayload.userId; 

    const getuser=async(values)=>{
        try {
            const response = await fetch('http://localhost:30001/user/');
            // console.log(response.body);
    
            if (!response.ok) {
                throw new Error('Network respoe was not ok');
            }
            const userList=await response.json();
            console.log(userlist);
            setuserlist(userList);
        } catch (error) {
            console.error('Error fetching users:', error);
        }  
    }
   
    const handleSubmit = async (values) => {
        try {
            const response = await fetch(`http://localhost:30001/project/${userId}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                // ...window.location.reload(false)
            });
        
            console.log(response);

            if (!response.ok) {
                throw new Error('Network respoe was not ok');
            }
             update_project();
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    useEffect(()=>{
        getuser();
      },[])     

   const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
          
  const handleUpdate =async (values)=>{
    try {
        const response = await fetch(`http://localhost:30001/project/update/${pro_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          
            // ...window.location.reload(false)
        });
        console.log(response);
        
        if (!response.ok) {
            throw new Error('Network respoe was not ok');
        }
         update_project();
    } catch (error) {
        console.error('Error updating project:', error);
    }  
  }

  return (
    <Box>
    <Formik
        initialValues={{
            name:name??'',
            status:status??'',
            description:description??'',
            owner:owner??''
        }}
        validationSchema={CreatevalidationSchema}

        onSubmit={pro_id ? handleUpdate : handleSubmit }
    >
        {({ handleChange, handleBlur, errors, touched, values }) => (
             <Form> 
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <label><b>Name:</b></label>
                    <Input
                        value={values.name}
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.name && errors.name && <div>{errors.name}</div>}

                    <label><b>Status:</b></label>
                    <Select
                        value={values.status}
                        name="status"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                     {Status.map((st) => (
                        <MenuItem value={st} key={st}>
                            {st}
                        </MenuItem>
                    ))}
                     </Select>
                    {touched.status && errors.status && <div>{errors.status}</div>}
                    <label><b>description:</b></label>
                    <Input
                        value={values.description}
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.description && errors.description && <div>{errors.description}</div>}
                    <label><b>owner:</b></label>
                    <Select
                        value={values.owner}
                        name="owner"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-controls="user-menu"
                        aria-haspopup="true"
                        onOpen={handleMenuOpen}
                        style={{ marginBottom: '20px' }}
                    >
                         { userlist && (userlist.length>0) && userlist.map((e)=>{
                               return(
                                 <MenuItem 
                                 style={{backgroundColor:'white', color:'black'}} 
                                 key={e._id} value={e._id}> 
                                     {e.name}
                                 </MenuItem>  )
                          })}
                    </Select>
                    {touched.owner && errors.owner && <div>{errors.owner}</div>}
                </Box>
                <Button type="submit" variant="contained"> {pro_id ? "Update" : "Create"} </Button>
             </Form>
        )}
     </Formik>   
</Box>
  )
}