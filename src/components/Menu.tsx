import { Popover, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

const methods: Array<Method> = ['default', 'darken', 'lighten'];

type MenuProps = {
  apply: (config: GenerateConfig) => void;
};

const Menu = ({ apply }: MenuProps) => {
  const [configs, setConfigs] = useState<GenerateConfig>({ width: 300, height: 300, chaos: 5, method: 'default' });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    apply(configs);
  };

  const numInputHandler = (key: keyof GenerateConfig) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfigs((p) => ({ ...p, [key]: e.target.valueAsNumber }));
  };

  const selectHandler = (key: keyof GenerateConfig) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfigs((p) => ({ ...p, [key]: e.target.value }));
  };

  return (
    <Popover as="div" className="fixed left-4 bottom-4">
      {({ close }) => (
        <>
          <div>
            <Popover.Button className="inline-flex w-full justify-center rounded-3xl border border-neutral-700 bg-black p-2 text-white hover:bg-neutral-900 focus:border-blue-500 focus:shadow-md focus:shadow-green-500 focus:outline-none">
              <svg viewBox="0 0 16 16" className="h-4 w-4">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                  <circle cx="2.5" cy="8" r=".75"></circle>
                  <circle cx="8" cy="8" r=".75"></circle>
                  <circle cx="13.5" cy="8" r=".75"></circle>
                </g>
              </svg>
            </Popover.Button>
          </div>

          <Transition
            as={Fragment}
            unmount={false}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel
              unmount={false}
              className="absolute left-0 -top-2 z-10 w-96 origin-bottom-left -translate-y-full border border-cyan-500 bg-neutral-900 text-white shadow-md shadow-green-500/50 focus:outline-none"
            >
              <form onSubmit={submit} className="grid grid-cols-2 gap-2 p-2">
                <div>
                  <label htmlFor="width" title="Width of the canvas." className="block text-xs">
                    Width
                  </label>
                  <input
                    min={1}
                    max={10000}
                    value={configs.width}
                    onChange={numInputHandler('width')}
                    required
                    id="width"
                    type="number"
                    className="w-full bg-neutral-600 px-1 py-0 text-sm focus:border-cyan-500 focus:ring-0"
                  />
                </div>
                <div>
                  <label htmlFor="height" title="Height of the canvas." className="block text-xs">
                    Height
                  </label>
                  <input
                    min={1}
                    max={10000}
                    value={configs.height}
                    onChange={numInputHandler('height')}
                    required
                    id="height"
                    type="number"
                    className="w-full bg-neutral-600 px-1 py-0 text-sm focus:border-cyan-500 focus:ring-0"
                  />
                </div>
                <div>
                  <label htmlFor="height" title="How chaotic the output will be." className="block text-xs">
                    Chaos level (1~255)
                  </label>
                  <input
                    min={0}
                    max={255}
                    value={configs.chaos}
                    onChange={numInputHandler('chaos')}
                    required
                    id="height"
                    type="number"
                    className="w-full bg-neutral-600 px-1 py-0 text-sm focus:border-cyan-500 focus:ring-0"
                  />
                </div>
                <div>
                  <label htmlFor="method" title="How chaotic the output will be." className="block text-xs">
                    Method
                  </label>
                  <select
                    value={configs.method}
                    onChange={selectHandler('method')}
                    id="method"
                    className="w-full bg-neutral-600 px-1 py-0 text-sm focus:border-cyan-500 focus:ring-0"
                  >
                    {methods.map((method) => (
                      <option key={'method-' + method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 border-t border-neutral-600 pt-1 text-right">
                  <button
                    onClick={close}
                    type="button"
                    className="mr-2 border border-neutral-600 px-3 pt-px pb-0.5 text-xs hover:bg-neutral-800"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="border border-cyan-500 px-3 pt-px pb-0.5 text-xs hover:bg-neutral-800"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Menu;
