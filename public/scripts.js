document.addEventListener('DOMContentLoaded', function() {
    const shareButton = document.getElementById('share-button');
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const chooseButton = document.getElementById('choose-button');
    const uploadButton = document.getElementById('upload-button');
    const fileList = document.getElementById('file-list');

    shareButton.addEventListener('click', function() {
        shareButton.style.display = 'none';
        uploadForm.style.display = 'block';
        chooseButton.style.display = 'block';
    });

    chooseButton.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        fileList.innerHTML = ''; // Clear the current list
        for (let i = 0; i < fileInput.files.length; i++) {
            const li = document.createElement('li');
            li.textContent = fileInput.files[i].name;
            fileList.appendChild(li);
        }
        if (fileInput.files.length > 0) {
            chooseButton.style.display = 'none';
            uploadButton.style.display = 'block';
            fileList.style.position = 'absolute';
            fileList.style.bottom = '80px'; // Distância da lista ao rodapé
            fileList.style.left = '50%';
            fileList.style.transform = 'translateX(-50%)';
        } else {
            uploadButton.style.display = 'none';
            chooseButton.style.display = 'block';
            fileList.style.position = 'static';
        }
    });

    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(uploadForm);
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            uploadButton.style.display = 'none';
            shareButton.style.display = 'block';
            fileInput.value = '';
            uploadForm.style.display = 'none';
            fileList.innerHTML = ''; // Clear the list after submission
        })
        .catch(error => console.error('Erro:', error));
    });
});


