import { useEffect, useMemo, useState } from 'react';
import './scrollerNumber.css';

const ScrollerNumber = ({number}) => {
  const [isAnim, startAnim] = useState(false);
  
  const animStyles = {
    marginTop: 0,
    transition: '0.25s'
  }

  useEffect(() => {
    startAnim(true);
    setTimeout(() => {startAnim(false)}, 250)
  }, [number])
  
  const prevNumber = (number) => number === 0 ? 9 : number - 1;

  const lower = useMemo(() => {
    return isAnim ? prevNumber(number) : number
  }, [isAnim])


  const renderNumbers = () => (
    <div className='scroller-number' style={isAnim ? animStyles : {}}>
      <div className='scroller-number__cell'>{number}</div>
      <div className='scroller-number__cell'>{lower}</div>
    </div>
  )
  return (
    <div className='scroller-number-container'>
      {renderNumbers()}
    </div>
  )
}

export default ScrollerNumber;