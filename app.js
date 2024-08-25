// Function to handle form submission and call the API
function onClickedEstimateSurvival() {
    // Log that the function is called
    console.log('Estimate Survival button clicked');

    // Get values from the form
    var pclass = document.querySelector('input[name="uiPclass"]:checked') ? document.querySelector('input[name="uiPclass"]:checked').value : null;
    var age = document.getElementById('uiAge').value;
    var sibsp = document.getElementById('uiSibSp').value;
    var fare = document.getElementById('uiFare').value;
    var sex_female = document.querySelector('input[name="uiSex"]:checked') ? document.querySelector('input[name="uiSex"]:checked').value : null;
    var sex_male = sex_female === '1' ? '0' : '1'; // If female is 1, male will be 0, and vice versa
    
    // Log form data
    console.log(`Pclass: ${pclass}, Age: ${age}, SibSp: ${sibsp}, Fare: ${fare}, Sex Female: ${sex_female}, Sex Male: ${sex_male}`);
    
    // Create the data object to send in the POST request
    var data = new FormData();
    data.append('pclass', pclass);
    data.append('age', age);
    data.append('sibsp', sibsp);
    data.append('fare', fare);
    data.append('sex_female', sex_female);
    data.append('sex_male', sex_male);
    
    // Send POST request to the server
    fetch('http://127.0.0.1:5000/get_survival', {
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then(data => {
        // Log and display the result
        console.log('Response data:', data);
        document.getElementById('uiSurvivalPrediction').innerText = 
            'Survival Prediction: ' + (data.survival_prediction === 1 ? 'Survived' : 'Did Not Survive');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Add event listener to the button
document.querySelector('.submit').addEventListener('click', onClickedEstimateSurvival);
