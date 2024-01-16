import * as React from 'react';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios"
import { useState } from "react"

export default function EditFactModal({ factId, title, fact, setData, userData }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [titles, setTitle] = useState(title)
    const [titleError, setTitleError] = useState('')
    const [facts, setFact] = useState(fact)
    const [factError, setFactError] = useState('')
    const [required, setRequired] = useState('')


    const handleChangeTitle = (event) => {
        const titles = event.target.value
        if (titles.length > 30) {
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


    const editFact = async () => {
        console.log(facts)
        console.log(titles)
        await axios.put(`https://quiz-app-backend-service-3a47.onrender.com/facts/${factId}`, {
            title: titles,
            fact: facts
        }).then((res) => {
            console.log(res)
            handleClose()

            const uptadedData = userData.map((data) => {
                if (data._id === res.data._id) {
                    return { ...res.data }
                } else {
                    return data
                }
            })

            setData(uptadedData)

        }).catch((err) => {
            console.log(err)
        })
    }
    const handleEditFact = () => {
        if (title === "" || fact === "") {
            setRequired("Please, Enter all inputs.")
        } else {
            editFact()
        }
    }



    return (
        <div>
            <img src="image/edit.png" style={{width:"33px"}}  onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modalcontainer'>
                    <input
                        className='titleinput'
                        placeholder='Please, enter a title.'
                        value={titles}
                        onChange={handleChangeTitle} />
                    <div style={{ color: "rgb(255, 0, 0)", height: "5px" }} >{titleError}</div>
                    <textarea
                        rows={5}
                        className='textinput'
                        placeholder='Please, enter a fact.'
                        value={facts}
                        onChange={handleChangeFact} />
                    <div style={{ color: "rgb(255, 0, 0)", height: "5px" }} >{factError}</div>
                    <div style={{ color: "rgb(255, 0, 0)", height: "5px" }} >{required}</div>
                    <button onClick={handleEditFact}>
                        EDIT
                    </button>
                </Box>
            </Modal>
        </div>
    );
}