import {useCallback, useEffect, useMemo, useState} from 'react';
import './input1.css';
import ScrollerNumber from './scrollerNumber';

const Input1 = ({active}) => {
  const [activeCell, setActiveCell] = useState(0);
  const [numbers, setNumbers] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const setNextNumber = useCallback((index) => {
    const newNumber = numbers[index] < 9 ? numbers[index] + 1 : 0;
    setNumbers([...numbers.slice(0, index), newNumber, ...numbers.slice(index + 1)]);
  }, [numbers]);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setNextNumber(activeCell);
      }, 500);
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      }
    }

  }, [active, setNextNumber, activeCell])

  const selectNextNumber = useCallback(() => {
    setActiveCell(activeCell < 9 ? activeCell + 1 : 0);
  }, [activeCell]);

  const calculateHighlightMargin = useMemo(() => (
    activeCell * 30 + ((activeCell > 2) + (activeCell > 5) + (activeCell > 7)) * 40
  ), [activeCell]);

  return (
    <div className='input1'>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div className='input1__phonecode'>
          +7
        </div>
        <div className='input1__margin'></div>
        <div className='input1-phonenumber'>
          <div className='input1__highlight' style={{left: `${calculateHighlightMargin}px`}}/>
          <ScrollerNumber number={numbers[0]}/>
          <ScrollerNumber number={numbers[1]}/>
          <ScrollerNumber number={numbers[2]}/>
          <div className='input1__margin'></div>
          <ScrollerNumber number={numbers[3]}/>
          <ScrollerNumber number={numbers[4]}/>
          <ScrollerNumber number={numbers[5]}/>
          <div className='input1__margin'></div>
          <ScrollerNumber number={numbers[6]}/>
          <ScrollerNumber number={numbers[7]}/>
          <div className='input1__margin'></div>
          <ScrollerNumber number={numbers[8]}/>
          <ScrollerNumber number={numbers[9]}/>
        </div>
      </div>
      <div className='input1__stop-btn' onClick={selectNextNumber}>
        Остановить
      </div>
    </div>
  )
}

export default Input1