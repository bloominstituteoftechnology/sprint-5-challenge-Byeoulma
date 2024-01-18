async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  function updateFooterText() {
    const footer = document.querySelector('footer');
    if (footer) {
      const currentYear = new Date().getFullYear();
      footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
    } else {
      console.error('Footer element not found in the DOM.');
    }
  }
  
  // Call the function to update the footer text
  updateFooterText();


  let combinedData;
  
  async function fetchData() {
    try {
      

      const [responseA, responseB] = await Promise.all([
      axios.get('http://localhost:3003/api/learners'),
      axios.get('http://localhost:3003/api/mentors'),
      ]);
      // access response data using responses
      const dataA = responseA.data;
      const dataB = responseB.data;
      // continue with data processing
      combinedData = await processData(dataA, dataB);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  

  async function firstCardRender(queryOptions, waitForOptions) {
    try { 
      const bob = await screen.findByText((content, element) => {
        return element.textContent === 'Bob Johnson' && element.tagName.toLowerCase() === 'h3';
      }, queryOptions, waitForOptions);
  
      expect(bob).toBeInTheDocument();
    } catch (error) {
      console.error('Error in firstCardRender:', error.message);
    }
  }
  fetchData();
  firstCardRender()


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
    learner.mentors.forEach(mentor => {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = mentor;
      mentorList.appendChild(mentorItem)
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
    const container = document.querySelector('.cards')
    
    // loop over data and create cards
      try {
        if(!container) {
      console.error('Container not found in the DOM.')
      return;
    }
    container.innerHTML = '';

    data.forEach((learner) => {
      try {
        const learnerCard = createLearnerCard(learner);
        container.appendChild(learnerCard);
      } catch (error) {
      console.log('Error creating learner card:', error);
    }
  });
  } catch (error) {
    console.log('Error creating learner card:', error)
  }
}

    // function to combine the data from Endpoint A and EndpointB
    function processData(dataA, dataB) {
      const combinedData = dataA.map(learnerA => {
        const mentors = learnerA.mentors.map(mentorID => {
          const mentorB = dataB.find(mentor => mentor.id === mentorID);
          return mentorB ? mentorB.fullName : null;
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
    }


  let learner;
  document.addEventListener('DOMContentLoaded', function () { const cardsContainer = document.querySelector('.cards');


  if(!cardsContainer) {
    console.error("Container with class 'cards' not found in DOM")
    return;
  }


  cardsContainer.addEventListener('click', function (event) {
    const target = event.target;
    //to check if click is on specific element
    if (target.classList.contains('card')) {
      const allCards = document.querySelectorAll('.card');
      allCards.forEach((card) => card.classList.remove('selected'));
      
      target.classList.toggle('selected');

      const idSpan = target.querySelector('span:first-child');
      if(idSpan) {
      const learnerId = idSpan.textContent.replace('ID: ', '')
      learner = combinedData.find((learner) => learner.id === parseInt(learnerId));
      

      if(learner) {
        idSpan.textContent = `ID: ${learner.id} - Selected`;
        document.querySelector('.info').textContent = `The selected learner is ${learner.fullName}`;
      }
      }
      
    } else {
      console.error('No span element found as the first child.')
    }
  })
})

// style element
const fontFaceDeclaration = `@font-face {
  font-family: 'Titillium Web';
  src: url('./TitilliumWeb.ttf');
}`;
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

styleElement.textContent = fontFaceDeclaration;

console.log('Mentors:', learner.mentors);
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
