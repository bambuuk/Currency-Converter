import { useState, useEffect } from 'react';

import './App.css';

const App = (props) => {
  const [courses, setCourses] = useState([]);
  const [chosenCourse, setChosenCourse] = useState('');
  const [currentCourse, setCurrentCourse] = useState(0);
  const _apiKey = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  useEffect(() => {
    if (chosenCourse !== '') {
      let elem = courses.filter(item => item.cc === chosenCourse);
      setCurrentCourse(elem[0].rate.toFixed(2));
    } else {
      setCurrentCourse(0)
    }
  }, [chosenCourse]);

  async function getInfoCourse(url) {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  }

  const getExchangeRates = async () => {
    const response = await getInfoCourse(_apiKey);
    return response;
  }

  function showCourse(e) {
    getExchangeRates(e)
      .then(res => {
        setCourses(res);
        setChosenCourse(e.target.name);
      })
      .catch(err => console.log(err))
  }


  return (
    <div className="app">
      <div className="counter">{currentCourse}</div>
      <div className="controls">
        <button className={chosenCourse === 'USD' ? 'btn btn_active' : 'btn'} name='USD' onClick={showCourse}>USD</button>
        <button className={chosenCourse === 'EUR' ? 'btn btn_active' : 'btn'} name='EUR' onClick={showCourse}>EUR</button>
        <button className={chosenCourse === 'RUB' ? 'btn btn_active' : 'btn'} name='RUB' onClick={showCourse}>RUB</button>
        <button className={chosenCourse === 'PLN' ? 'btn btn_active' : 'btn'} name='PLN' onClick={showCourse}>PLN</button>
      </div>
      <div className='text'>
        Выбери курс валюты, чтобы узнать
        <br />
        его стоимость покупки в UAH</div>
    </div>
  )
}

export default App;