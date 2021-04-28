import React, {useState, useEffect} from 'react';
import api from './services/api';

import './App.css';
import Header from './components/Header';

function App(){
    const [tags,setTags] = useState([]);

    useEffect(()=>{
        api.get('tags').then(response=>{
            setTags(response.data);
        });
    }, []);


    return(
        <>
            <Header title = "SISPRO TAGS"/>


            <ul>
                {tags.map(tag =><li key = {tag.tag} >{tag.nome} ({tag.tag}) entrada: {tag.input} saída: {tag.output} tempo trabalhado {tag.totalHoras}  (s)</li>)}
            </ul>

        </>
    );
}

export default App;
