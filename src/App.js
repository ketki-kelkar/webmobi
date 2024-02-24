import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import './App.css';

// Import images
import Image1 from './images/001.png';
import Image2 from './images/002.png';
import Image3 from './images/003.png';
import Image4 from './images/004.png';
import Image5 from './images/005.png';
import Image6 from './images/006.png';
import Image7 from './images/007.png';
import Image8 from './images/008.png';

const initialModules =[
  { id: 1, image: Image1, color: '#FF5733' },
  { id: 2, image: Image2, color: '#33FF8D' },
  { id: 3, image: Image3, color: '#3373FF' },
  { id: 4, image: Image4, color: '#FF33F7' },
  { id: 5, image: Image5, color: '#33D5FF' },
  { id: 6, image: Image6, color: '#FFE433' },
  { id: 7, image: Image7, color: '#FF339C' },
  { id: 8, image: Image8, color: '#33FFD2' }
];

const Module = ({ module, index, moveModule, changeColor, removeModule }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'MODULE',
    item: { id: module.id, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'MODULE',
    hover(item, monitor) {
      if (!monitor.isOver({ shallow: true })) {
        return;
      }
      const dragId = item.id;
      const hoverId = module.id;

      if (dragId === hoverId) {
        return;
      }

      moveModule(dragId, hoverId);
      item.index = index;
    },
  });


  return (
    <div ref={node => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img src={module.image} alt={`Module ${module.id}`} />
    </div>
  );
};

const App = () => {
  const [modules, setModules] = useState(initialModules);

  useEffect(() => {
    const savedModules = JSON.parse(localStorage.getItem('dashboardModules')) || initialModules;
    setModules(savedModules);
  }, []);

  const moveModule = (dragId, hoverId) => {
    const dragIndex = modules.findIndex(module => module.id === dragId);
    const hoverIndex = modules.findIndex(module => module.id === hoverId);
    const newModules = [...modules];
    const draggedModule = newModules[dragIndex];

    newModules.splice(dragIndex, 1);
    newModules.splice(hoverIndex, 0, draggedModule);

    setModules(newModules);
  };


  useEffect(() => {
    localStorage.setItem('dashboardModules', JSON.stringify(modules));
  }, [modules]);

  console.log('Module data:', module);

  return (
    <div className="App">
      <h1>CUSTOMIZABLE DASHBOARD</h1>
      <DndProvider backend={HTML5Backend}>
        <div className="dashboard">
          <div className="full-width-module">
            <Module
              key={modules[0].id}
              module={modules[0]}
              index={0}
              moveModule={moveModule}
            />
          </div>

          <div className="half-width-modules">
            <Module
              key={modules[1].id}
              module={modules[1]}
              index={1}
              moveModule={moveModule}
            />
            <div className='space'></div>
            <Module
              key={modules[2].id}
              module={modules[2]}
              index={2}
              moveModule={moveModule}
            />
          </div>

          <div className="half-width-modules">
            <Module
              key={modules[3].id}
              module={modules[3]}
              index={3}
              moveModule={moveModule}
            />
            <div className='space'></div>
            <Module
              key={modules[4].id}
              module={modules[4]}
              index={4}
              moveModule={moveModule}
            />
          </div>

          <div className="half-width-modules">
            <Module
              key={modules[5].id}
              module={modules[5]}
              index={5}
              moveModule={moveModule}
            />
            <div className='space'></div>
            <Module
              key={modules[6].id}
              module={modules[6]}
              index={6}
              moveModule={moveModule}
            />
          </div>


          <div className="full-width-module">
            <Module
              key={modules[7].id}
              module={modules[7]}
              index={7}
              moveModule={moveModule}
            />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default App;
