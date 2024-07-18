import { BrowserComponent } from "./ui/browser-component";
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { useState, useEffect } from 'react';
import { LaptopMinimal, Tablet, Smartphone} from 'lucide-react';
export const Broswer = () => {
  const [size, setSize] = useState('mobile');
  const [className, setClassName] = useState('w-[375px] h-[667px]');

  useEffect(() => {
    handleSizeChange(size);
  }, []);

  const handleSizeChange = (value: string) => {
    setSize(value);
    switch (value) {
      case 'mobile':
        setClassName('w-[375px] h-[667px]');
        break;
      case 'tablet':
        setClassName('w-[768px] h-[724px]');
        break;
      case 'desktop':
      default:
        setClassName('w-[1024px] h-[724px]');
        break;
    }
  };

  return (
    <>
      <ToggleGroup type="single" value={size} onValueChange={handleSizeChange} defaultValue="mobile">
        <ToggleGroupItem className="p-0 h-6 bg-black text-gray-500 hover:text-white" value="mobile"><Smartphone className="h-4"/></ToggleGroupItem>
        <ToggleGroupItem className="p-0 h-6 bg-black text-gray-500 hover:text-white" value="tablet"><Tablet className="h-4"/></ToggleGroupItem>
        <ToggleGroupItem className="p-0 h-6 bg-black text-gray-500 hover:text-white" value="desktop"><LaptopMinimal className="h-4"/></ToggleGroupItem>
      </ToggleGroup>
      <BrowserComponent className={className} url="https://slothmdx.vercel.app">
        <section className={'w-full h-full flex items-center justify-center'}>
          <h1 className={'md:text-xl text-base'}>Hi!</h1>
        </section>
      </BrowserComponent>
    </>
  )
}
