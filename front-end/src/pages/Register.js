import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../services/api';
import LogoImg from '../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import './Register.css';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();
 

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('ongs', data);
            alert(`register are sussecfull! your ID is : ${response.data.id}`);
            history.push('/');
            
        } catch (err) {
            alert('Error in add, plase try again.');

        }

    }
    return (
        <div className="register_container">
            <div className="content">
                <section>
                   <img src={LogoImg} alt="Be The Hero"/>
                   <h1>Register</h1>
                   <p>Make your register in the plataform and help peoples to find your ONG cases!</p>
                   <Link className="back-link" to="/"> <FiArrowLeft size={16} color="#E02041"/> Sing in</Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="OMG Name"
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    />
                    <input type="email" placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    />
                    <input placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input placeholder="City"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF" style={{ width: 80 }}
                        value={uf}
                        onChange={e => setUF(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Submit</button>

                </form>
            </div>
        </div>
    )
}