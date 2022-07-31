import logo from './logo.svg';
import './App.css';
import { useEffect, useMemo, useState } from 'react';
import Input1 from './inputs/1/input1'
import Input2 from './inputs/2/input2'
import Input3 from './inputs/3/input3'

const pagesComponents = [
  {
    component: Input1,
    background: 'white'
  },
  {
    component: Input2,
    background: 'white'
  },
  {
    component: Input3,
    background: 'white'
  }
];

function App() {
  const [page, setPage] = useState(0);
  const [isCooldown, toggleCooldown] = useState(false);

  const pages = useMemo(
    () => pagesComponents.map((Page, index) => (<Page.component active={index===page} />))
  , [page]);

  function renderBreadcrumbs(index) {
    return <div className={`nav-breadcrumbs ${index===page && 'nav-breadcrumbs--active'}`} key={`bc${index}`} onClick={() => selectPage(index)}>{index+1}</div>
  }
  function renderSections(item, index) {
    return <div className='section' key={`sec${index}`}>{item}</div>
  }
  useEffect(() => {
    toggleCooldown(true);
    setTimeout(() => {toggleCooldown(false)}, 1000)
  }, [page])

  const onWheel = (e) => {
    if(e.deltaY < 0) {
      pagePrev();
    } else {
      pageNext();
    }
  }

  const selectPage = (page) => {
    if(!isCooldown) {
      setPage(page)
    }
  }

  const pagePrev = () => {
    if(!isCooldown && page > 0) {
      setPage(page - 1)
    }
  }

  const pageNext = () => {
    if(!isCooldown && page < pages.length-1) {
      setPage(page + 1)
    }
  }
  
  return (
    <div className={`App`} style={{background: `${pagesComponents[page].background}`}} >
      <div className='nav'>
        {pagesComponents.map((item, index) => renderBreadcrumbs(index))}
      </div>
      <div className='content' style={{marginTop: `${page * (-100)}vh`}} onWheel={(e) => {onWheel(e)}}>
        {pages.map((item, index) => renderSections(item, index))}
      </div>
    </div>
  );
}

export default App;
