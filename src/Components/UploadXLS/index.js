import React from 'react';

import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';

export default function Upload({ onUpload }) {
  function renderDragMessage(isDragActive, isDragRejest) {
    if (!isDragActive) {
      return (
        <UploadMessage>Selecione ou arraste o arquivo aqui.</UploadMessage>
      );
    }

    if (isDragRejest) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
  }

  return (
    <>
      <Dropzone
        accept=".xls, .csv, .xlsx, application/vnd.ms-excel, text/csv, text/xls, text/xlsx"
        onDropAccepted={(files) => onUpload(files)}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} data-testid="upload" />
            {renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    </>
  );
}
