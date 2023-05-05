const complimentBtn = document.getElementById("complimentButton")

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)

function getRandomFortune() {
    // Create an array of fortunes
    const fortunes = [
      "A dream you dream alone is only a dream. A dream you dream together is reality.",
      "A friend asks only for your time not your money.",
      "A lifetime of happiness lies ahead of you.",
      "All your hard work will soon pay off.",
      "Believe in yourself and others will too.",
      "Don't worry, be happy.",
      "If you want the rainbow, you have to put up with the rain.",
      "Luck is on your side today.",
      "The greatest wealth is to live content with little.",
      "The man on the top of the mountain did not fall there.",
      "You will have a pleasant surprise.",
      "You will make many changes before settling down happily.",
    ];
    
    
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    
    
    return fortunes[randomIndex];
  }

  const fortune = getRandomFortune();

  const fortuneButton = document.getElementById('fortune-button');
  fortuneButton.addEventListener('click', () => {
    const fortune = getRandomFortune();
    const fortuneDisplay = document.getElementById('fortune-display');
    fortuneDisplay.textContent = fortune;
  });
  


const categorySelect = document.getElementById('category-select');
const goalInput = document.getElementById('goal-input');
const trackGoalBtn = document.getElementById('track-goal-btn');
const goalList = document.getElementById('goal-list');

let goals = [];

trackGoalBtn.addEventListener('click', () => {
  const category = categorySelect.value;
  const goal = goalInput.value;
  
  if (category && goal) {
    const newGoal = { category, goal };
    goals.push(newGoal);
    
    const goalItem = document.createElement('li');
    goalItem.textContent = `${category}: ${goal}`;
    
    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.addEventListener('click', () => {
      const newProgress = prompt('Enter new progress:');
      if (newProgress) {
        newGoal.progress = newProgress;
        goalItem.textContent = `${category}: ${goal} - Progress: ${newProgress}`;
      }
    });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      const index = goals.indexOf(newGoal);
      goals.splice(index, 1);
      goalList.removeChild(goalItem);
    });
    
    goalItem.appendChild(updateBtn);
    goalItem.appendChild(deleteBtn);
    goalList.appendChild(goalItem);
    
    categorySelect.value = '';
    goalInput.value = '';
  }
});

const generateBtn = document.getElementById('generate-btn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementsByClassName('close')[0];
const saveBtn = document.getElementById('save-btn');
const activityTitle = document.getElementById('activity-title');
const activityDesc = document.getElementById('activity-desc');

// Event listener for the generate button
generateBtn.addEventListener('click', () => {
  fetch('https://www.boredapi.com/api/activity/')
    .then(response => response.json())
    .then(data => {
      activityTitle.innerText = data.activity;
      activityDesc.innerText = data.description;
      modal.style.display = 'block';
    })
    .catch(error => console.error(error));
});

// Event listener for the close button
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Event listener for the save button
saveBtn.addEventListener('click', () => {
  // Save the activity to the user's personal list of activities
  console.log('Activity saved!');
  modal.style.display = 'none';
});

const form = document.getElementById('affirmation-form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting normally
  
  const timeInput = document.getElementById('time-input').value;
  const affirmationSelect = document.getElementById('affirmation-select').value;
  
  // save user preferences with a POST request
  fetch('/api/save-preferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      time: timeInput,
      affirmation: affirmationSelect
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error saving preferences');
    }
    // show success message to user
    alert('Preferences saved successfully');
  })
  .catch(error => {
    console.error(error);
    alert('Error saving preferences');
  });
});

// retrieve saved preferences with a GET request
fetch('/api/get-preferences')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error getting preferences');
    }
    return response.json();
  })
  .then(data => {
    // schedule daily affirmation at user's preferred time
    const affirmationTime = new Date(data.time);
    const affirmationText = data.affirmation;
    scheduleAffirmation(affirmationTime, affirmationText);
  })
  .catch(error => {
    console.error(error);
    alert('Error getting preferences');
  });

function scheduleAffirmation(time, text) {
  // calculate time until next scheduled affirmation
  const now = new Date();
  let delay = time.getTime() - now.getTime();
  if (delay < 0) {
    // time has already passed today, schedule for tomorrow
    delay += 24 * 60 * 60 * 1000;
  }
  
  // schedule affirmation with a timeout
  setTimeout(() => {
    alert(text);
    // reschedule affirmation for next day
    scheduleAffirmation(new Date(time.getTime() + 24 * 60 * 60 * 1000), text);
  }, delay);
}

