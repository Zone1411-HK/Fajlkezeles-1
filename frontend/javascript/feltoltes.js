document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('uploadEmployee').addEventListener('click', uploadData);
});

async function uploadData() {
    try {
        const uploadStatus = document.getElementById('uploadStatus');
        uploadStatus.innerText = '';
        const inputs = document.querySelectorAll('input');
        const data = {
            name: '',
            position: '',
            birth: '',
            salary: 0
        };
        let isValid = true;
        inputs.forEach((element) => {
            if (element.value == '') {
                element.classList.add('border', 'border-danger');
                isValid = false;
            } else {
                element.classList.remove('border', 'border-danger');
            }
        });
        if (isValid) {
            data.name = inputs[0].value;
            data.position = inputs[1].value;
            data.birth = inputs[2].value;
            data.salary = inputs[3].value;

            const response = await PostFetch('/api/employeesAdd', data);
            if (response.success) {
                uploadStatus.innerText = 'Sikeres feltöltés';
                uploadStatus.classList.remove('text-danger');
                uploadStatus.classList.add('text-success');
            } else {
                uploadStatus.innerText = 'Sikertelen feltöltés';
                uploadStatus.classList.remove('text-success');
                uploadStatus.classList.add('text-danger');
            }
        } else {
            uploadStatus.innerText = 'Sikertelen feltöltés';
            uploadStatus.classList.remove('text-success');
            uploadStatus.classList.add('text-danger');
        }
    } catch (error) {
        console.error(error);
    }
}
