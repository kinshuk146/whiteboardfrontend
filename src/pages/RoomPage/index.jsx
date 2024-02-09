import { useRef, useState } from 'react';
import WhiteBoard from '../../components/Whiteboard';
import './index.css';

const RoomPage = ({ user,socket }) => {
  const canvasRef = useRef()
  const ctxRef = useRef()
  const [elements, setElements] = useState([])
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('black');

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")
    ctx.fillRect = "white";
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setElements([]);
  }

  console.log(user)

  const undo = () => {
    setHistory((prevHistory) => [...prevHistory, elements[elements.length - 1]]);
    setElements((prevElements) => prevElements.slice(0, prevElements.length - 1));
  }

  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1]
    ])
    setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
  }

  return (
    <div className='row'>
      <h1 className='text-center pt-3'>White Board Sharing App <span className='text-primary'></span></h1>
      {/* [Users Online: 0] */}

      {user?.presenter &&
      (
        <div className='col-md-12 px-5 mt-2 mb-5 d-flex align-items-center justify-content-start gap-4 mx-auto'>
          <div className='d-flex col-md-2 mx-auto justify-content-between gap-1'>
            <div className='d-flex gap-1 align-items-center'>
              <label htmlFor='pencil' className='mb-1'>Pencil</label>
              <input type="radio" name='tool' id='pencil' value='pencil' checked={tool === 'pencil'} onChange={(e) => setTool(e.target.value)} />
            </div>
            <div className='d-flex gap-1' >
              <label htmlFor='line' className='mb-1'>Line</label>
              <input type="radio" name='tool' id='line' value='line' checked={tool === 'line'} onChange={(e) => setTool(e.target.value)} />
            </div>
            <div className='d-flex gap-1' >
              <label htmlFor='rect' className='mb-1'>Rectangle</label>
              <input type="radio" name='tool' id='rect' value='rect' checked={tool === 'rect'} onChange={(e) => setTool(e.target.value)} />
            </div>
          </div>
          <div className='col-md-2'>
            <div className='d-flex align-items-center'>
              <label htmlFor="color">Select Color</label>
              <input type='color' id='color' className='mt-1 ms-3' value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
          </div>
          <div className='col-md-3 d-flex gap-2'>
            <button className='btn btn-primary mt-1'
              disabled={elements.length === 0}
              onClick={() => { undo() }}
            >Undo</button>

            <button className='btn btn-outline-primary mt-1'
              disabled={history.length === 0}
              onClick={() => { redo() }}>
              Redo</button>
          </div>
          <div className="col-md-2">
            <button className='btn btn-danger' onClick={handleClearCanvas}>Clear Board</button>
          </div>
        </div>
      )}

      <div className="col-md-10 mx-auto mt-0 canvas-box">
        <WhiteBoard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          tool={tool}
          color={color}
          user={user}
          socket={socket}
        />
      </div>
    </div>
  )
}

export default RoomPage