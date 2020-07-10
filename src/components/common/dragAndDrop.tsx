import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';

interface DragAndDropProps {
  files: RcFile[];
  onChange: (files: RcFile[]) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = props => {
  return (
    <Upload.Dragger
      beforeUpload={(file, files) => {
        props.onChange([...props.files, ...files]);
        return false;
      }}
      onRemove={file => {
        const index = props.files?.indexOf(file as RcFile);
        const files = [...props.files];
        files?.splice(index, 1);
        props.onChange(files);
      }}
      multiple
      fileList={props.files}
    >
      <p className='ant-upload-drag-icon'>
        <InboxOutlined />
      </p>
      <p className='ant-upload-text'>לחץ או גרור לכאן בשביל להעלות קבצים</p>
    </Upload.Dragger>
  );
};

export default DragAndDrop;
