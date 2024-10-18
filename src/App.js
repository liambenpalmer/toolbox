import './App.css';
import { useState } from 'react';
import SideNav from './components/navBar';
import SvgToPath from './components/SvgToPath';
import SvgToCSS from './components/SvgToCss';
import ColourScheme from './components/colourScheme';

function App() {
  const [showComponent, setShowComponent] = useState('svg-to-path')
  return (
    <div className="App">
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
      <SideNav showComponent={showComponent} setShowComponent={setShowComponent}></SideNav>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {showComponent === 'svg-to-path' && <SvgToPath />}
        {showComponent === 'svg-to-css' && <SvgToCSS />}
        {showComponent === 'colour-scheme' && <ColourScheme />}
      </div>
    </div>
      
     
    </div>
  );
}

export default App;
