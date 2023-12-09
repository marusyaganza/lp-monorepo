import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export type PreviewStyle = 'presentationBox' | 'page' | 'footer' | 'centered';

export const styledPreviewDecorator = (previewStyle?: PreviewStyle) => {
  const decorator = (Story: JSX.ElementType) => (
    <div className={previewStyle ?? 'presentationBox'}>
      <Story />
    </div>
  );

  return decorator;
};

export const routerDecorator = (Story: JSX.ElementType) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};
