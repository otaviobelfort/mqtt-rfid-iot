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
            <Header title = "TAGS"/>


            <ul>
                {tags.map(tag =><li key = {tag.title} >{tag.title} trabalhou {tag.time}  hora(s)</li>)}
            </ul>

        </>
    );
}

export default App;
