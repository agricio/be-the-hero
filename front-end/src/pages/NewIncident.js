import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import LogoImg from '../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../services/api';
import './NewIncident.css'

export default function Newincident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data ={
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                  }
            })
            history.push('/profile');
        }catch (err) {
            alert('Error case is no registered, plase try again.')
        }

    }

    return (
        <div className="register_container">
            <div className="content">
                <section>
                   <img src={LogoImg} alt="Be The Hero"/>
                   <h1>Register new case</h1>
                   <p>Describe the case in detail to find a hero for make for that </p>
                   <Link className="back-link" to="/profile"> <FiArrowLeft size={16} color="#E02041"/> back to Profile</Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Case title"
                    value={title}
                    onChange={e => setTitle(e.target.value)} 
                    />
                    <textarea placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}  
                    />
                    <input placeholder="Price"
                    value={value}
                    onChange={e => setValue(e.target.value)}  
                    />
                    <button className="button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}