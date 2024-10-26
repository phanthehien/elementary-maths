import { useEffect, useRef } from 'react';

const NumberCircleItem = ({ value }: { value: number }) => {
  const circleClass =
    'w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg';

  return <div className={circleClass}>{value}</div>;
};

function getOffset(el: HTMLDivElement) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    width: rect.width || el.offsetWidth,
    height: rect.height || el.offsetHeight,
  };
}

function connect(
  div1: HTMLDivElement,
  div2: HTMLDivElement,
  color: string,
  thickness: number
) {
  // draw a line connecting elements
  const off1 = getOffset(div1);
  const off2 = getOffset(div2);
  // bottom right
  const x1 = off1.left + off1.width;
  const y1 = off1.top + off1.height;
  // top right
  const x2 = off2.left + off2.width;
  const y2 = off2.top;
  // distance
  const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  // center
  const cx = (x1 + x2) / 2 - length / 2;
  const cy = (y1 + y2) / 2 - thickness / 2;
  // angle
  const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
  // make hr
  const htmlLine =
    "<div style='padding:0px; margin:0px; height:" +
    thickness +
    'px; background-color:' +
    color +
    '; line-height:1px; position:absolute; left:' +
    cx +
    'px; top:' +
    cy +
    'px; width:' +
    length +
    'px; -moz-transform:rotate(' +
    angle +
    'deg); -webkit-transform:rotate(' +
    angle +
    'deg); -o-transform:rotate(' +
    angle +
    'deg); -ms-transform:rotate(' +
    angle +
    'deg); transform:rotate(' +
    angle +
    "deg);' />";
  return htmlLine;
}

type SentenceItem = {
  total: number;
  first: number;
  second: number;
};

const SentenceItem = (props: SentenceItem) => {
  const { total, first, second } = props;
  const refTotal = useRef<HTMLDivElement>(null);
  const refFirst = useRef<HTMLDivElement>(null);
  const refSecond = useRef<HTMLDivElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refTotal.current && refFirst.current && refSecond.current) {
      const first = connect(refTotal.current, refFirst.current, 'black', 2);
      const second = connect(refTotal.current, refSecond.current, 'black', 2);
      refContainer.current?.insertAdjacentHTML('beforebegin', first);
      refContainer.current?.insertAdjacentHTML('beforebegin', second);
    }
  }, []);

  return (
    <div className='relative w-40 h-40' ref={refContainer}>
      <div
        ref={refTotal}
        className='absolute top-0 left-1/2 transform -translate-x-1/2'
      >
        <NumberCircleItem value={total} />
      </div>
      <div ref={refFirst} className='absolute bottom-0 left-0'>
        <NumberCircleItem value={first} />
      </div>
      <div ref={refSecond} className='absolute bottom-0 right-0'>
        <NumberCircleItem value={second} />
      </div>
    </div>
  );
};

export default SentenceItem;
