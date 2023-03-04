const loadAllData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(res => res.json())
        .then(allData => allDataDisplay(allData.data.tools.slice(0, 6)))
    troglerSpinner(true)
}

const allDataDisplay = (allData) => {
    const seeAllDiv = document.getElementById('See-all')
    if (allData.length === 6) {
        seeAllDiv.classList.remove('d-none')
    }
    else if (allData.length === allData.length) {
        seeAllDiv.classList.add('d-none')
    }
    else {
        seeAllDiv.classList.add('d-none')
    }
    const cardContainer = document.getElementById('card-Container')
    cardContainer.innerHTML = ''
    const spinner = document.getElementById('spinner')
    spinner.classList.remove('d-none')


    allData.forEach(data => {
        const createCard = document.createElement('div')
        createCard.classList.add('col')
        const { image, features, id, name, published_in } = data
        createCard.innerHTML = `
        <div class="card shadow-lg w-100">
        <div class="h-75 "> <img src="${image}" class="card-img-top card-image " alt="..."></div>
        <div class="card-body h-75">
          <h5 class="card-title">Features</h5>
          <div>
          <p class="card-text mb-1 opacity-75">1. ${features[2] ? features[2] : 'Not Available'}</p>
          <p class="card-text mb-1 opacity-75">2. ${features[0] ? features[0] : 'Not Available'}</p>
          <p class="card-text opacity-75">3. ${features[1] ? features[1] : 'Not Available'}</p>
          </div>
         </div>
       
          <div class="d-flex px-3 justify-content-between align-items-center mt-4">
                <div class="d-flex flex-column">
                 <h5>${name}</h5>
                 <p> <i class="fa-regular fa-calendar-days"></i>  ${published_in}</p>
                </div>
             <div>
             <button onclick=openModal('${id}') type="button"  class=" btn btn- bg-dark-subtle px-3 py-2 rounded-circle" data-bs-toggle="modal" data-bs-target="#detailsModal"> <i class="fa-solid fa-arrow-right text-danger"></i></button>
             </div>
         </div>
        </div>
        
        `
        cardContainer.appendChild(createCard)
        troglerSpinner(false)
    });

}
const See_all_aLL = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(res => res.json())
        .then(allData => allDataDisplay(allData.data.tools))
    troglerSpinner(true)
}


const openModal = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
        .then(res => res.json())
        .then(details => displayModalDetails(details.data))
}
const displayModalDetails = (details) => {
    // console.log(details)
    const part_1 = document.getElementById('part_1')
    part_1.innerHTML = ''
    const modalBody_2 = document.getElementById('modalBody-2')
    modalBody_2.innerHTML = ''
    const features_ul = document.getElementById('Features')
    features_ul.innerHTML = ''
    const integrations_ul = document.getElementById('Integrations')
    integrations_ul.innerHTML = ''
    const { description, pricing, features, image_link, input_output_examples, integrations, accuracy } = details

    const accuracyy = document.getElementById('accuracy')
    if (accuracy.score === null || accuracy.score === '') {
        // console.log(accuracy.score)
        accuracyy.classList.add('d-none')
    }
    else {
        accuracyy.classList.remove('d-none')
        accuracyy.innerText = `${accuracy.score ? accuracy.score * 100 + '% accuracy' : ''}`
    }

    part_1.innerHTML = `
            <div class="part_1"> 
             <h5  class="card-title mt-3">${description ? description : 'Not Available'}</h5>
             <div  class="card-text flex-column flex-md-row flex-lg-row d-flex gap-2 justify-content-between    align-items-center px-2 mt-4"> 
  
                 <div class="text-bg-light  text-center fw-bold p-3 rounded-2"> <p class="mb-0"> ${pricing ? pricing[0].price : 'Free of cost '}</p> <p class="mb-1"> ${pricing ? pricing[0].plan : ''} </p></div>
         
                 <div class="text-bg-light  text-center p-3 fw-bold rounded-2">  <p class="mb-0"> ${pricing ? pricing[1].price : 'Free of cost '} </p> <p class="mb-1"> ${pricing ? pricing[1].plan : ''} </p></div>
  
                 <div class="text-bg-light  text-center fw-bold p-3 rounded-2"> <p class="mb-0"> ${pricing ? pricing[2].price.slice(0, 10) : 'Free of cost '} </p> <p  class="mb-1"> ${pricing ? pricing[2].plan : ''} </p></div>
                 </div>
                  
            </div>
     `

    const features__ = Object.values(features)
    features__.forEach(features => {
        // console.log(features.feature_name)
        features_ul.innerHTML += ` 
          <li>${features ? features.feature_name : 'No Data Found'}</li>
        `
    });

    if (integrations === null) {
        integrations_ul.innerHTML += ` <li>${'No Data Found'}</li>`
    }
    else {
        integrations.forEach(integration => {
            integrations_ul.innerHTML += ` <li>${integration ? integration : 'No Data Found'}</li>`
        });
    }

    modalBody_2.innerHTML = `
   <div class="modalBody_2">
   <img class="card-img-top modal-card-image" src="${image_link[0] ? image_link[0] : ''}"  alt="...">
  
   <div class="card-body text-center">
       <h4 class="card-title">${input_output_examples ? input_output_examples[0].input : 'Can you give any example?'}</h4>
       <p class="card-text"> ${input_output_examples ? input_output_examples[0].output.slice(0, 100) : 'No! Not Yet! Take a break!!!'}</p>
   </div>
   `
}
const troglerSpinner = isLoading => {
    const spinner = document.getElementById('spinner')
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}

const sortData = (tools) => {
    tools.forEach(data => {
        console.log(data.published_in)

    });

}