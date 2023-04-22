import { useState } from 'react';

function useS3() {
  const [response, setResponse] = useState({
    uploadUrl: null,
    uploadError: null,
  });

  async function uploadToS3(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/uploadToS3', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setResponse({
        uploadUrl: data.url,
        uploadError: null,
      });
      return data;
    } catch (error) {
      setResponse({
        uploadUrl: null,
        uploadError: error.message,
      });
      return null;
    }
  }

  return { uploadToS3, uploadResponse: response };
}

export default useS3;
