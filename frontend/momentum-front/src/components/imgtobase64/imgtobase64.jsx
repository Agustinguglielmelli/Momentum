
import React, { useState } from 'react';
import axios from 'axios'; 

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

const FileUpload = () => {
    const [base64, setBase64] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file.');
                return;
            }

            try {
                const base64String = await convertToBase64(file);
                setBase64(base64String);
                console.log('Base64:', base64String);
            } catch (error) {
                console.error('Error converting file:', error);
            }
        }
    };

    const uploadImage = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/upload-image', {
                image: base64,
            });

            console.log('Server response:', response.data);
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Image upload failed!');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {base64 && (
                <div>
                    <p>Preview:</p>
                    <img src={base64} alt="preview" style={{ maxWidth: '300px' }} />
                </div>
            )}
        </div>
    );
};

export default FileUpload;