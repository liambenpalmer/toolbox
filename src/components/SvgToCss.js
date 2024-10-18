import { useState } from 'react';

function SvgToCSS() {
  const [input, setInput] = useState()
  const [output, setOutput] = useState()
  const svgToCssBackground = () => {
    // Remove unnecessary whitespace and line breaks
    const cleanedSvgString = input
        .replace(/[\n\r]/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
    
    // Encode the cleaned SVG string in base64
    const base64Svg = btoa(unescape(encodeURIComponent(cleanedSvgString)));

    // Create the CSS background-image property
    const cssBackground = `background-image: url('data:image/svg+xml;base64,${base64Svg}');`;

    setOutput(cssBackground);
}
  return (
    <div className="SvgToCSS">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">SVG to CSS background</h1>
      <div className='my-8'>
      <h2 class="text-3xl font-bold dark:text-white mb-4">SVG input</h2>

        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows="6" className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'></textarea>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' onClick={()=>  svgToCssBackground()}>Convert</button>
        </div>
        <div className='my-8'>
        <h2 class="text-3xl font-bold dark:text-white mb-4">CSS output</h2>

        <textarea  value={output} rows="6" className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'></textarea>
        </div>
    </div>
  );
}

export default SvgToCSS;
