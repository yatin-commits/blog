import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { data } from './blogData';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { faPlus, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [newData, setNewData] = useState(data);

  const[titleName,setTitleName]=useState("");
  const[descriptionName,setDescriptionName]=useState("");

  const changeTitle=(event)=>
  {
    setTitleName(event.target.value)
  }
  const changeDescription=(event)=>
    {
      setDescriptionName(event.target.value);
    }


  const toggleForm = () => {
    setShowForm(!showForm);
  };

  
  
  const formSubmit=(event)=>
  {
    const newEntry = {
      id: data.length + 1,
      title: titleName,
      desc: descriptionName,
      tareek: new Date().toLocaleDateString()
    };
    if (titleName === "") {
      NotificationManager.warning( 'Title Cannot Be Empty ');
      event.preventDefault();
      return;
    }
    if (descriptionName === "") {
      NotificationManager.warning( 'Description Cannot Be Empty ');
      event.preventDefault();
      return;
    }

    setNewData([...newData, newEntry]);
    
    setTitleName("");
    setDescriptionName("");
    setShowForm(!showForm);

    event.preventDefault();

    
  };

  const  dltBtn=(index)=>
  {
    const filterData=newData.filter((v,i)=>
    {
      const filteredData = newData.filter((_, i) => i !== index);
    setNewData(filteredData);
    NotificationManager.success( 'Blog Deleated SuccessFully!');
    })
    
  }

  const editBtn=()=>
  {
    NotificationManager.error( 'Kaam Chlra Hai Ispe!!');

  }

  return (
    <>
      <div>
        <div className='headContainer'>
        
          <NotificationContainer/>
          <h1 className='heading'>Blog App</h1>
          <button className='newBtn' onClick={toggleForm}>
            Write New <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: "#039b36" }} />
          </button>
        </div>

        {showForm && (
          <div className='formOverlay'>
            <div className='formContainer'>
              <form onSubmit={formSubmit}>
                <label>
                  Title:
                  <input type='text' onChange={changeTitle} value={titleName} placeholder='Enter your Title' />
                </label>
                <br></br><br></br>
                <label>
                  Description:
                  <textarea rows={8} onChange={changeDescription} value={descriptionName} cols={50} placeholder='Enter your description' />
                </label>
                <button className='submit' type='submit'>Submit</button>
                <button className='closeBtn'  type='button' onClick={toggleForm}>Close</button>
              </form>
            </div>
          </div>
        )}

      

        <div className='card'>
          {newData.length === 0 ? (
            <h2>No Blogs To Display</h2>
          ) : (
            newData.map((value, index) => (
              <div key={index} className='subCard'>
                <h3 className='title'>{value.title}</h3>
                <p>{value.desc}</p>
                <div className='bottomContainer'>
                  <p className='tareek'>{value.tareek}</p>
                  <div className='icons'>
                    <FontAwesomeIcon onClick={()=>dltBtn(index)} className='Picon' icon={faTrash} style={{ color: "#ff0000" }} />
                    <FontAwesomeIcon onClick={editBtn}  className='Picon' icon={faPenToSquare} style={{ color: "#020647" }} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
