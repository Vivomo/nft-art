import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';

const {Content} = Layout;

const Article = () => {
  const editor = useRef(null);
  const location = useLocation();
  const {title, content} = location.state;


  const config = {
    zIndex: 0,
    readonly: true,
    theme: 'default',
    height: 400,
    imageDefaultWidth: 100,
  };

  return (
    <Layout>

      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <h1>{title}</h1>

        <JoditEditor
          ref={editor}
          value={content}
          config={config}
        />
      </Content>

    </Layout>
  );
};
export default Article