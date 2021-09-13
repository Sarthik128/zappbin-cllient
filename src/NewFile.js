import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Loader from './Loader';

export default function NewFile({id}) {
    const [val, setVal] =  useState("");
    const [duplicate, setDuplicate] = useState(false);
    const [link1, setLink] = useState("");
    const [newurl, setNewurl] = useState(false);
    const [lines, setLines] = useState(0);
    const [loader, setLoader] = useState(true);
    const history = useHistory();

    const baseLink = 'https://zappbin.web.app/';
    const serverURL = 'https://codebin-server.herokuapp.com/';

    const api = axios.create({
        baseURL: serverURL
    });

    async function saveText(){
        setLoader(true);
        if(val){
        if(duplicate){
            //save in new link
            const res = await api.post('/duplicate', { val1: val, link1: link1});
            //set new link
            console.log(res.data);
            setDuplicate(false)
        }else{
            //save the text in db in new or if exists then overwrite
            const res = await api.post('/new', { val1: val, link1: link1});
            console.log(res.data);
        }
    }
        setLoader(false);
    }

    async function getlink(){
        setLoader(true);
        const res = await api.get('/getlink');
        //set new link
        setLink(res.data.newLink);
        setLoader(false);
    }

    function duplicateText(){
        setDuplicate(true);
        //create new link to save
        getlink();
        setNewurl(true);
    }

    async function getData(newid){
        setLoader(true);
        const res = await api.post('/load', { id: newid });
        if(res.data.valid){
            setVal(res.data.context);
            setLink(res.data.link1);
        }else{
            history.push('/error');
        }
        setLoader(false); 
    }

    function copyLink(e){
        if(e.target.value === "Copy Text"){
            navigator.clipboard.writeText(val);
        }else{
            navigator.clipboard.writeText(baseLink+link1);
        }    
        console.log("Copied");
    }

    useEffect(() => {
        if(id){
            getData(id);
        }else{
        getlink();
        setNewurl(true);
        }
        setLoader(false);
    }, []);

    useEffect(() => {
        const lines1 = val.split('\n').length;
        setLines(lines1);
    }, [val]);

    return (
        <div>
            {loader ? <Loader /> : ""}
            <div className="btn-box">
                <div onClick={() => history.push('/')} className="logo"><span>Zapp</span>Bin</div>
                <div className="btns">
                    <input className="btn" disabled={!newurl} onClick={saveText} value="Save" type="button"/>
                    <input className="btn" disabled={!duplicate} onClick={duplicateText} value="Duplicate" type="button"/>
                    <input className="btn" value="Copy Text" onClick={copyLink} type="button"/>
                    <input className="btn" value="Share Link" onClick={copyLink} type="button"/>
                    </div>
            </div>
            <div className="lines">
                <div>
                    Lines : {lines}
                </div>
                <div>
                    Link : {baseLink+link1}
                </div>
            </div>
            <div>
            <textarea value={val} onChange={(e)=> {setVal(e.target.value); 
            setDuplicate(true);}}></textarea>
            </div>
        </div>
    )
}
