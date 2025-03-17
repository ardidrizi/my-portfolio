import React from 'react';
import { useTheme } from './ThemeController';

const ExampleComponent: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl mb-4">Theme Demonstration</h2>
      <p>Current theme: <strong>{theme}</strong></p>

      <div className="mt-4">
        <button
          onClick={() => setTheme('dark')}
          className="px-3 py-1 bg-gray-800 text-white rounded mr-2"
        >
          Set Dark
        </button>
        <button
          onClick={() => setTheme('light')}
          className="px-3 py-1 bg-gray-200 text-black rounded"
        >
          Set Light
        </button>
      </div>
    </div>
  );
};

export default ExampleComponent;
