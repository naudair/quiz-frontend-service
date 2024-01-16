import * as React from 'react';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios"
import { useState } from "react"

export default function CreateFactModal({ userData, setData }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    const [fact, setFact] = useState('')
    const [factError, setFactError] = useState('')
    const [required, setRequired] = useState('')


    const handleChangeTitle = (event) => {
        const title = event.target.value
        if (title.length > 30) {
            setTitleError("Title is too long.")
        } else {
            setTitleError('')
        };
        setTitle(event.target.value)
    }
    const handleChangeFact = (event) => {
        const fact = event.target.value
        if (fact === "") {
            setFactError("Fact is empty.")
        } else {
            setFactError('')
        };
        setFact(event.target.value)
    }

    console.log(userData)

    const createFact = async () => {
        const userId = localStorage.getItem('userId')
        console.log(userId)
        await axios.post('https://quiz-app-backend-service-3a47.onrender.com/facts', {
            userID: userId,
            title: title,
            fact: fact
        }).then((res) => {
            console.log(res)
            handleClose()
            setData([...userData, { ...res.data }])
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleCreateFact = () => {
        if (title === "" || fact === "") {
            setRequired("Please, Enter all inputs.")
        } else {
            createFact()
        }
    }



    return (
        <div>
            <button className='navbutton' id='modalbutton' onClick={handleOpen}>Add Fact</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modalcontainer'>
                    <input
                        className='titleinput'
                        placeholder='Here is your title.'
                        value={title}
                        onChange={handleChangeTitle} />
                    <div style={{ color: "rgb(255, 0, 0)", height: "5px" }} >{titleError}</div>
                    <input
                        className='textinput'
                        placeholder='Here is your fact.'
                        value={fact}
                        onChange={handleChangeFact} />
                    <div style={{ color: "rgb(255, 0, 0)", height: "5px" }} >{factError}</div>
                    <div style={{ color: "rgb(255, 0, 0)", height: "5px" }} >{required}</div>
                    <button onClick={handleCreateFact}>
                        CREATE
                    </button>
                </Box>
            </Modal>
        </div>
    );
}