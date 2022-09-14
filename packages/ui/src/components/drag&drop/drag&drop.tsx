/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// Experimental component,  not ready to use
import React, { PropsWithChildren } from 'react';
import './drag&drop.css';

type DropProps = {
  dropEffect?: string;
};

const Drop = ({ children, dropEffect }: PropsWithChildren<DropProps>) => {
  const dropHandler = (e: any) => {
    e.preventDefault();
    // ev.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.effectAllowed = dropEffect;
    const data = e?.dataTransfer?.getData('dragData');
    console.log('dropped', data);
  };
  const dragOverHandler = (e: any) => {
    e.preventDefault();
    e.dataTransfer.effectAllowed = dropEffect;
    console.log('dragOverHandler');
  };

  return (
    //@ts-ignore
    <div
      className="answerBox"
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      {children}
    </div>
  );
};

type DragProps = {
  data: string;
  dropEffect?: string;
};

const Drag = ({ data, children, dropEffect }: PropsWithChildren<DragProps>) => {
  const dragStartHandler = (e: any) => {
    e?.dataTransfer?.setData('dragData', data);
    e.dataTransfer.effectAllowed = dropEffect;
  };
  return (
    <span className="draggable" draggable onDragStart={dragStartHandler}>
      {children}
    </span>
  );
};

export const DragDrop = () => {
  return (
    <>
      <Drag data="am" dropEffect="all">
        am
      </Drag>
      <div>
        {' '}
        <span>I</span>
        <Drop dropEffect="all" />
      </div>
    </>
  );
};
