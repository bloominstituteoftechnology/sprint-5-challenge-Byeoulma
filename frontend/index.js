async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  document.addEventListener('DOMContentLoaded', function () {
    fetchData();
  });

  async function fetchData() {
    try {
      const responseA = await axios.get('http://localhost:3003/api/learners');
      const responseB = await axios.get('http://localhost:3003/api/mentors');
      // access response data using responses
      const dataA = responseA.data;
      const dataB = responseB.data;
      // continue with data processing
      combinedData = processData(dataA, dataB);
    } catch (error) {
      console.log('Error fetching data:', error);
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
        mentors
      }
    })
    // Call function to render learner cards
    renderLearnerCards(combinedData);
  }

  // create function to take a single learner as an argument and returns a Learner Card
  function createLearnerCard(learner) {
    // create HTML elements for the learner card
    const learnerCardElement = document.createElement('div');
    learnerCardElement.classList.add('card');

    const h3 = document.createElement('h3');
    h3.textContent = `${learner.fullName}`;

    const idSpan = document.createElement('span');
    idSpan.textContent = `ID: ${learner.id}`;

    const emailSpan = document.createElement('span');
    emailSpan.textContent = `Email: ${learner.email}`;

    const fullNameSpan = document.createElement('span');
    fullNameSpan.textContent = `Full Name: ${learner.fullName}`;

    //create ul for mentor list
    const mentorList = document.createElement('ul');
    learner.mentors.forEach(mentor => {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = mentor;
      mentorList.appendChild(mentorItem)
    });

    learnerCardElement.appendChild(h3)
    learnerCardElement.appendChild(idSpan);
    learnerCardElement.appendChild(emailSpan);
    learnerCardElement.appendChild(fullNameSpan);
    learnerCardElement.appendChild(mentorList);
    

    return learnerCardElement;
  }

  function renderLearnerCards(data) {
    const container = document.querySelector('.cards')
    
    // loop over data and create cards
    if(!container) {
      console.error('Container not found in the DOM.')
      return;
    }
    container.innerHTML = '';

    data.forEach(learner => {
      const learnerCard = createLearnerCard(learner);
      container.appendChild(learnerCard);
    })
  }

  document.addEventListener('DOMContentLoaded', function () {
    fetchData();

  document.querySelector('.cards').addEventListener('click', function (event) {
    const target = event.target;
    //to check if click is on specific element
    if (target.classList.contains('learner-card')) {
      target.classList.toggle('selected');

      const idSpan = target.querySelector('span:first-child');
      const learnerId = idSpan.textContent.replace('ID: ', '')
      const learner = combinedData.find(learner => learner.id === parseInt(learnerId))
      idSpan.textContent = `ID: ${learner.id} - ${learner.selected ? 'Selected' : 'Not Selected'}`
    }
  })
})

// style element

const fontFaceDeclaration = `@font-face {
  font-family: 'Titillium Web';
  src: url('./TitilliumWeb.ttf');
}`
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

styleElement.textContent = fontFaceDeclaration;

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
