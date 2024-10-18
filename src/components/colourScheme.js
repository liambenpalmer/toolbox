import { useState } from 'react';
// import './ColourScheme.scss';

function ColourScheme() {
  const [colours, setColours] = useState();
  const [input, setInput] = useState();

  function generateColorSchemeFromHex(baseHex) {
    const shades = [];
    const { h, s, l } = hexToHsl(baseHex);
    const saturation = s; // Use the same saturation as the base color
    const lightnessStart = l * 0.7; // Start a bit darker than the base color
    const lightnessEnd = l * 1.3 > 100 ? 100 : l * 1.3; // End a bit lighter

    for (let i = 0; i < 8; i++) {
      const hue = (h + i * 10) % 360; // Adjust hue slightly for variation
      const lightness = lightnessStart + (lightnessEnd - lightnessStart) * (i / 7); // Gradient from dark to light
      shades.push(hslToHex(hue, saturation, lightness));
    }

    setColours(shades);
  }

  function randomColour() {
    return `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;
  }

  function randomColorScheme() {
    const colourScheme = []
    Array.from(Array(8).keys()).map(() => {
      colourScheme.push(randomColour())
    })
    setColours(colourScheme); 
  }

  function hexToHsl(hex) {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }

    return { h: h, s: s * 100, l: l * 100 };
  }

  function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  function pastelScheme() {
    
    const colourScheme = []
    Array.from(Array(8).keys()).map(() => {
      const hue = Math.floor(Math.random() * 360);
      colourScheme.push(hslToHex(hue, 100, 87.5))
    })
    setColours(colourScheme); 
  }

  return (
    <div className="ColourScheme">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Colour scheme generator
      </h1>
      <div className="my-8">
        <h2 class="text-3xl font-bold dark:text-white mb-4">Hex input</h2>

        <input
          value={input}
           type="color"
          onChange={(e) => setInput(e.target.value)}
          className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
          onClick={() => generateColorSchemeFromHex(input)}
        >
          Generate
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
          onClick={() => pastelScheme()}
        >
          Pastel
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => randomColorScheme()}
        >
          Random
        </button>
      </div>

      <div className="ColourScheme__swatches mt-8 flex">
        {colours &&
          colours.map((c) => (
            <div className="" style={{ backgroundColor: c, height: '100px', width: '12.5%' }}></div>
          ))}
      </div>
      <div className="ColourScheme__array mt-8">
      {colours && <input           className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
 value={`[${colours.map((c)=> `"${c}"`).join(', ')}]`}/>}
      </div>
    </div>
  );
}

export default ColourScheme;
