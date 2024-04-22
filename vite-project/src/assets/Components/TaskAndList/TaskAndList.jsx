import React, { useState, useEffect } from "react";
import "./TaskAndList.css";
import SideBar from '../layout/Sidbar/sideBar'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  CardActions,
  Grid,
  Box,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const TaskCard = ({ title, onDelete, onAddSubtask, subtask ,onDeleteSubtask}) => {

  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [openSubtaskDialog, setOpenSubtaskDialog] = useState(false);

  const handleSubtaskDialogClose = () => {
    setOpenSubtaskDialog(false);
  };
  const handleSubtaskDialogOpen = () => {
    setOpenSubtaskDialog(true);
  };


  const handleSubtaskTitleChange = (event) => {
    setSubtaskTitle(event.target.value);
  };
  
  return (
    <div className="card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Subtasks:
        </Typography>
        <List>
          {subtask &&
            subtask.map((subtaskItem, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    <>
                      <span>&#8226; </span>
                      {subtaskItem}
                    </>
                  }
                />
                <Button
                  size="small"
                  variant="text"
                  color="error"
                  onClick={() => onDeleteSubtask(subtaskItem)}
                >
                  &#10005;
                </Button>
              </ListItem>
            ))}
        </List>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubtaskDialogOpen}
        >
          Create Subtask
        </Button>
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>

      <Dialog open={openSubtaskDialog} onClose={handleSubtaskDialogClose}>
        <DialogTitle>Create Subtask</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="subtaskTitle"
            label="Subtask Title"
            type="text"
            fullWidth
            value={subtaskTitle}
            onChange={handleSubtaskTitleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubtaskDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onAddSubtask(subtaskTitle);
              handleSubtaskDialogClose();
            }}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export const TaskAndList = () => {
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
    const [name, setName] = useState("");
    const [cards, setCards] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);

    const usertoken=window.localStorage.getItem("usertoken")
    // console.log(usertoken);
    const tokenParts = usertoken.split('.');
    // console.log(tokenParts);
    const tokenPayload = JSON.parse(atob(tokenParts[1]));
    // console.log(tokenPayload);
    const userId = tokenPayload.userId; 
    // console.log(userId); 

    // console.log(userId)
    
    // console.log(_id);
    useEffect(() => {
      fetchCards();
    }, []);
    const update_card = () => {
      fetchCards();
    }
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:30001/cards/${userId}`);
        const data = await response.json();
        const cardsWithData = data.map(card => ({
          ...card,
          subtasks: card.subtasks || [] // Ensure subtasks array exists, default to empty array
        }));
        setCards(cardsWithData);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    const deleteCard = async (cardId) => {
      try {
        await fetch(`http://localhost:30001/cards/${cardId}`, {
          method: "DELETE",
        });
        setCards(cards.filter((card) => card._id !== cardId));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    };
    const onDeleteSubtask = async (cardId, subtaskTitle) => {
      try {
        const response = await fetch(`http://localhost:30001/cards/${cardId}/subtask/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: subtaskTitle }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        update_card();
      } catch (error) {
        console.error("Error deleting subtask:", error);
      }
    };


    const handleCreateCard = async () => {
      try {
        const response = await fetch(`http://localhost:30001/cards/${userId}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });
        // const data = await response.json();
        // setCards([...cards, data]);
      setOpenTaskDialog(false);
      setName("");
      if (!response.ok) {
        throw new Error('Network respoe was not ok');
      }
      update_card();
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  const handleCreateSubtask = async (cardId, subtaskTitle) => {
    if (!subtaskTitle) {
      console.error("Subtask title cannot be empty");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:30001/cards/${cardId}/subtask/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: subtaskTitle }),
        }
      );
      if (!response.ok) {
        throw new Error('Network respoe was not ok');
      }
      update_card();
    } catch (error) {
      console.error("Error creating subtask:", error);
    }
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <Box>
         <SideBar/>
        <Grid container spacing={2} style={{marginLeft:'30px'}}>
          {cards.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <TaskCard
                title={card.name}
                onDelete={() => deleteCard(card._id)}
                onAddSubtask={(subtaskTitle) =>
                  handleCreateSubtask(card._id, subtaskTitle)
                }
                subtask={card.subtask}
                onDeleteSubtask={(subtaskTitle) => onDeleteSubtask(card._id, subtaskTitle)}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenTaskDialog(true)}
          style={{ position: "fixed", bottom: "20px", right: "20px" }}
        >
          Create Task
        </Button>

        <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
          <DialogTitle>Create Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="taskTitle"
              label="Task Title"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenTaskDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateCard} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
