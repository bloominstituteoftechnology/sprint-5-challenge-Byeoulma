async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  function updateFooterText() {
    const footer = document.querySelector('footer');
    if (footer) {
      const currentYear = new Date().getFullYear();
      footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY 2023`;
    } else {
      console.error('Footer element not found in the DOM.');
    }
  };

  // function to combine the data from Endpoint A and EndpointB
  let combinedData;
 
  async function fetchData() {
    
    try {
      const [responseA, responseB] = await Promise.all([
      axios.get('http://localhost:3003/api/learners'),
      axios.get('http://localhost:3003/api/mentors'),
      ]);
     

      // access response data using responses
      if (responseA && responseB) {
      const dataA = responseA.data;
      const dataB = responseB.data;

      combinedData = await processData(dataA, dataB)
    }
    
} catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  
  await fetchData();

  
  function processData(dataA, dataB) {
    const combinedData = dataA.map(learnerA => {
      const mentors = learnerA.mentors.map(mentorID => {
        const mentorB = dataB.find(mentor => mentor.id === mentorID);
        return mentorB ? `${mentorB.firstName} ${mentorB.lastName}` : null;
        
      });
      return {
        id: learnerA.id,
        email: learnerA.email,
        fullName: learnerA.fullName,
        mentors: mentors,
      }
    })
   
    // Call function to render learner cards
    
    renderLearnerCards(combinedData);
    return combinedData;
  }
  
 // create function to take a single learner as an argument and returns a Learner Card
 function createLearnerCard(learner) {
  try { // create HTML elements for the learner card
   const learnerCardElement = document.createElement('div');
   learnerCardElement.classList.add('card');

   

   const idSpan = document.createElement('span');
   idSpan.textContent = `ID: ${learner.id}`;

   const emailSpan = document.createElement('span');
   emailSpan.textContent = `Email: ${learner.email}`;

   const fullNameSpan = document.createElement('span');
   fullNameSpan.textContent = `Full Name: ${learner.fullName}`;

   const h3 = document.createElement('h3');
   h3.textContent = `${learner.fullName}`;

   const h3div = document.createElement('div');
   h3div.textContent = `${learner.email}`

   const h4 = document.createElement('h4');
   h4.classList.add('closed');
   h4.textContent = `Mentors`;

   //create ul for mentor list
   const mentorList = document.createElement('ul');
   
   learner.mentors.forEach((mentor) => {
    if (Array.isArray(mentor)) {
      mentor.forEach((m) => {
        const mentorItem = document.createElement('li');
        mentorItem.textContent = m;
        mentorList.appendChild(mentorItem);
      });
    } else {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = mentor;
      mentorList.appendChild(mentorItem);
    }
  });

   learnerCardElement.appendChild(h3);
   learnerCardElement.appendChild(h3div);
   learnerCardElement.appendChild(h4);
   learnerCardElement.appendChild(mentorList);
  
   return learnerCardElement;
 } catch (error) {
   console.log('Error creating learner card:', error)
 }
 }


 function renderLearnerCards(data) {
  const container = document.querySelector('.cards');

  try {
    if (!container) {
      console.error('Container not found in the DOM.');
      return;
    }
    container.innerHTML = '';

    data.forEach((learner) => {
      try {
        const learnerCard = createLearnerCard(learner);
        container.append(learnerCard);
      } catch (error) {
        console.log('Error creating learner card:', error);
      }
    });

    // If no learner card is selected, display the default message
    const selectedCard = document.querySelector('.card.selected');
    const infoElement = document.querySelector('.info');
    if (!selectedCard) {
      infoElement.textContent = 'No learner is selected';
    }
  } catch (error) {
    console.log('Error creating learner card:', error);
  }
}


const cardsContainer = document.querySelector('.cards');

cardsContainer.addEventListener('click', function (event) {
  const target = event.target;
  const card = target.closest('.card');
  const h4 = target.closest('h4');

  if (card) {
    const isSelected = card.classList.contains('selected');

    const allCards = document.querySelectorAll('.card');
    allCards.forEach((c) => c.classList.remove('selected'));

    if (!isSelected) {
      card.classList.add('selected');
    }

    const idSpan = card.querySelector('h3');
    idSpan.classList.toggle('card-id', !isSelected);

    const selectedCard = document.querySelector('.card.selected');

    const infoElement = document.querySelector('.info');
    if (selectedCard) {
      const learnerId = selectedCard.querySelector('h3').textContent;
      const learner = combinedData.find((learner) => learner.fullName === learnerId);
      infoElement.textContent = `The selected learner is ${learner.fullName}`;
    } else {
      infoElement.textContent = `No learner is selected`;
    }
  } else if (h4) {
    const mentorList = h4.parentElement.querySelector('ul');
    h4.classList.toggle('open');
    mentorList.style.display = h4.classList.contains('open') ? 'block' : 'none';
  } else {
    console.error('No card or h4 element found.');
  }
});

// Additional click event listener for h4 element
cardsContainer.addEventListener('click', function (event) {
  const target = event.target;
  const h4 = target.closest('h4');
  const card = target.closest('.card');

  if (h4 && card) {
    const mentorList = card.querySelector('ul');
    const isOpen = h4.classList.contains('open');

    h4.classList.toggle('open', !isOpen);
    h4.classList.toggle('closed', isOpen);
    mentorList.style.display = isOpen ? 'none' : 'block';
  }
});
  
  updateFooterText();


// style element
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

const fontFaceDeclaration = `@font-face {
  font-family: 'Titillium Web';
  src: url('./TitilliumWeb.ttf');
}`;

styleElement.textContent = fontFaceDeclaration
 
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()