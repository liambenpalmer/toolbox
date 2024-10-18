import { useState } from 'react';
import './SvgToPath.scss';

function SvgToPath() {
  const [input, setInput] = useState();
  const [output, setOutput] = useState();
  const svgToClipPathFn = () => {
    document.querySelector('.SvgToPath__invisible').innerHTML = ''
    // let path = document.querySelector('path');

    var el = document.createElement('div');
    el.innerHTML = input;
    

    const path = el.querySelector('path');

    if (path) {
      document.querySelector('.SvgToPath__invisible').appendChild(el);
      // let path = document.querySelector('path');

      let pathLength = Math.floor(path.getTotalLength());
      let steps = 10;
      let scaled = Math.floor(pathLength / steps);
      let bbox = path.getBBox();

      let points = Object.keys([...new Array(scaled)])
        .map((num) => {
          let point = path.getPointAtLength(num * steps);
          let x = ((point.x / bbox.width) * 100).toFixed(2);
          let y = ((point.y / bbox.height) * 100).toFixed(2);
          return `${x}% ${y}%`;
        })
        .join(',');

      setOutput(`polygon(${points})`);
    } else {
      alert('no svg inputted');
    }

    // document.querySelector('#clipped').value = ;
  };
  return (
    <div className="SvgToPath">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        SVG to Clip Path
      </h1>
      <div className="my-8">
        <h2 class="text-3xl font-bold dark:text-white mb-4">SVG input</h2>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows="6"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => svgToClipPathFn()}
        >
          Convert
        </button>
      </div>

      {output && (
        <div className="my-8">
          <h2 class="text-3xl font-bold dark:text-white mb-4">Clip path output</h2>
          <textarea
            value={output}
            rows="6"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
      )}
      <div className='SvgToPath__vectors'>
      <div className="SvgToPath__invisible"></div>
      {output && <div className="SvgToPath__path" style={{clipPath: output}}></div>}
      </div>
      
    </div>
  );
}

export default SvgToPath;
