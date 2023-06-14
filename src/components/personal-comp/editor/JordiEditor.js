import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Layout, theme, Button, Space, Input } from 'antd';
import { saveArticle } from '../../../service/storage-service';
import { useLocation } from 'react-router-dom';
import { addToIpfs } from '../../../service/ipfs-service';
import { mintNFT } from '../../../service/nft-service';
import { messageBox } from '../../../service/message-service';
import { storeMeta, storeArticle } from '../../../service/arweave-service';

const { Content, Footer } = Layout;


const Example = () => {
  const editor = useRef(null);
  const location = useLocation();

  const [content, setContent] = useState(location.state?.title);
  const [title, setTitle] = useState(location.state?.content);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const config = {
    zIndex: 0,
    readonly: false,
    toolbarButtonSize: 'middle',
    theme: 'default',
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: false,
    editorCssClass: false,
    triggerChangeEvent: true,
    height: 400,
    imageDefaultWidth: 100,
    uploader: {
      insertImageAsBase64URI: true
    },

  };

  async function savePost() {
    saveArticle(title, content)
  }
  async function publishPost() {
    await mintArticle()
  }
  const mintArticle = async () => {
    let uri = await storeMeta(content);
    messageBox("success", "", uri)
    let meta = { name: title, description: title, type: "article", uri }
    let entity = JSON.stringify(meta)
    // let tokenURI = await addToIpfs(entity);
    let tokenURI = await storeArticle(entity);
    messageBox("success", "", tokenURI)
    let {success, tokenId} = await mintNFT(tokenURI)
    if (success) {
      messageBox("success", "", tokenId)
    } else {
      messageBox("danger", "", "mint failed")
    }
  }
  return (
    <Layout>

      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer
        }}
      >
        <Input value={title} style={{ textAlign: "center", fontSize: 24 }} onChange={(e) => setTitle(e.target.value)} placeholder='请输入标题' />

        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        />
      </Content>
      <Footer>
        <Space wrap>
          <Button type="primary" onClick={publishPost} >发表</Button>
          <Button type="primary" onClick={savePost} >保存</Button>
        </Space>
      </Footer>
    </Layout>
  );
};
export default Example