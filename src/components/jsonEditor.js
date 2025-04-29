import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

function JsonEditor() {
  const [input, setInput] = useState();
  const [output, setOutput] = useState();

  function createEditView(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    let jsonData = JSON.parse(input);
    if (!Array.isArray(jsonData)) {
      jsonData = JSON.parse(jsonData);
    }
    const form = document.createElement('form');

    const fields = new Set();
    jsonData.forEach((item) => {
      Object.keys(item).forEach((key) => fields.add(key));
    });

    jsonData.forEach((item, index) => {
      const fieldset = document.createElement('div');
      fieldset.classList.add(
        'dropdown',
        'p-4',
        'mb-4',
        'bg-white',
        'border',
        'border-gray-200',
        'rounded-lg',
        'dark:bg-neutral-900',
        'dark:border-neutral-700'
      );

      const title = document.createElement('h3');
      title.classList.add('text-lg', 'font-bold', 'dark:text-white', 'cursor-pointer');
      title.textContent = `↓ Item ${index + 1}`;
      title.onclick = () => {
        content.classList.toggle('hidden');
      };
      fieldset.appendChild(title);

      const content = document.createElement('div');
      content.classList.add('content', 'hidden');

      Object.keys(item).forEach((key) => {
        const label = document.createElement('label');
        label.textContent = key;
        label.style.display = 'block';
        label.classList.add('block', 'mb-2', 'text-sm', 'font-medium', 'text-gray-900', 'pt-4');

        let input;
        if (typeof item[key] === 'string' && item[key].length > 50) {
          input = document.createElement('textarea');
          input.classList.add(
            'p-1',
            'min-h-[100px]',
            'w-full',
            'block',
            'bg-white',
            'border',
            'border-gray-200',
            'cursor-pointer',
            'rounded-lg',
            'disabled:opacity-50',
            'disabled:pointer-events-none',
            'dark:bg-neutral-900',
            'dark:border-neutral-700'
          );
          input.rows = 4;
        } else {
          input = document.createElement('input');
          input.classList.add(
            'p-1',
            'h-10',
            'w-full',
            'block',
            'bg-white',
            'border',
            'border-gray-200',
            'cursor-pointer',
            'rounded-lg',
            'disabled:opacity-50',
            'disabled:pointer-events-none',
            'dark:bg-neutral-900',
            'dark:border-neutral-700'
          );
          input.type = 'text';
        }

        input.value = item[key];
        input.dataset.index = index;
        input.dataset.key = key;
        input.oninput = (event) => {
          const i = event.target.dataset.index;
          const k = event.target.dataset.key;
          jsonData[i][k] = event.target.value;
        };

        content.appendChild(label);
        content.appendChild(input);
      });

      fieldset.appendChild(content);
      form.appendChild(fieldset);
    });

    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.textContent = 'Add Item';
    addButton.classList.add(
      'bg-blue-500',
      'hover:bg-blue-700',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      'rounded',
      'mt-4'
    );
    addButton.onclick = () => {
      const newItem = {};
      fields.forEach((field) => (newItem[field] = ''));
      jsonData.push(newItem);
      createEditView(containerId);
    };

    // form.appendChild(addButton);

    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.classList.add(
      'bg-blue-500',
      'hover:bg-blue-700',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      'rounded',
      'mt-4',
      'mr-2'
    );
    saveButton.textContent = 'Save';
    saveButton.onclick = () => {
      setOutput(JSON.stringify(jsonData, null, 2));
    };

    form.appendChild(saveButton);
    container.appendChild(form);
  }
  return (
    <div className="JsonEditor">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        JSON Editor
      </h1>
      <div className="my-8">
        <h2 class="text-3xl font-bold dark:text-white mb-4">Input</h2>

        <textarea
          value={input}
          type="textarea"
          onChange={(e) => setInput(e.target.value)}
          className="p-1 min-h-[100px] w-full block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
          onClick={() => createEditView('editor')}
        >
          Generate
        </button>
      </div>
      <div id="editor" className="my-8"></div>
      {output && (
        <div className="my-8">
          <h2 class="text-3xl font-bold dark:text-white mb-4">Output</h2>
          <textarea
            value={output}
            type="textarea"
            className="p-1 min-h-[100px] w-full block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
          />
          <h2 class="text-2xl font-bold dark:text-white my-4">Stringify</h2>

          <input
            className="mb-4 p-1 h-10 w-full block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
            value={JSON.stringify(output)}
          />
        </div>
      )}
    </div>
  );
}
export default JsonEditor;
