import  Row  from './Row';

import  { useEffect, useRef } from 'react';
const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

export default function Rows({rows})  {
  const divRows = useRef(null)
    return (
      <div ref={divRows}  className="card text-left scroll bg " style={{position:'relative', marginTop:'3.8rem'}}> 
      { (rows.map((row, i) => ( 
          < Row key={i} row={row}  />
        )))}    <AlwaysScrollToBottom />
      </div>
    );
  };


