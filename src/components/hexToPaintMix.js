

import { useState } from 'react';
// import './HexToPaint.scss';

function HexToPaint() {
    const [input, setInput] = useState();
    const [output, setOutput] = useState();

    function hexToPaintMix(hex) {
        // Ensure hex is in the correct format
        hex = hex.replace('#', '');
        if (hex.length !== 6) {
            setOutput('Invalid hex code');
        }
        
        // Convert hex to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    // Approximate subtractive color mixing (CMY)
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    
    let mix = [];
    
    // Determine base colors
    if (c > m && c > y) mix.push('cyan (blue + green)');
    if (m > c && m > y) mix.push('magenta (red + blue)');
    if (y > c && y > m) mix.push('yellow');
    
    // Adjust with black or white
    let brightness = (r + g + b) / (3 * 255);
    if (brightness > 0.8) {
        mix.push('white to lighten');
    } else if (brightness < 0.3) {
        mix.push('black to darken');
    }
    
    // Fine-tune based on RGB balance
    if (r > g && g > b) mix.push('a bit more red and yellow for warmth');
    if (b > r && r > g) mix.push('some red and blue for purple tones');
    if (g > b && b > r) mix.push('blue and yellow for a green hue');
    
        
        setOutput(`To mix this color: Use ${mix.join(', ')}.`);
    }
    
    // Example usage
    // console.log(hexToPaintMix('#ff5733'));
  return (
    <div className="HexToPaint">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Hex to Paint Mixer
      </h1>
      <div className="my-8">
        <h2 class="text-3xl font-bold dark:text-white mb-4">Hex input</h2>

        <input
          value={input}
           type="input"
          onChange={(e) => setInput(e.target.value)}
          className="p-1 h-10 w-100 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
          onClick={() => hexToPaintMix(input)}
        >
          Generate
        </button>
      </div>
      {output && <div>
        <div className="h-20 h20" style={{backgroundColor: input}}></div>
        {output}
      </div>}
    </div>
  );
}

export default HexToPaint;
