//-------------------------------google calendar request---------------------------------------------
 /* exported gapiLoaded */
      /* exported gisLoaded */
      /* exported handleAuthClick */
      /* exported handleSignoutClick */

      // TODO(developer): Set to client ID and API key from the Developer Console
      const CLIENT_ID = '94195819965-dpf9kuqrt6pg08b8elfg2q7gjh8hb55f.apps.googleusercontent.com';
      const API_KEY = 'AIzaSyDODGfzRiDMxFbFGhVgbqQvH_KOLR0nyWQ';

      // Discovery doc URL for APIs used by the quickstart
      const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      const SCOPES = 'https://www.googleapis.com/auth/calendar';

      let tokenClient;
      let gapiInited = false;
      let gisInited = false;

      document.getElementById('authorize_button').style.visibility = 'hidden';
      document.getElementById('signout_button').style.visibility = 'hidden';

      /**
       * Callback after api.js is loaded.
       */
      function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
      }

      /**
       * Callback after the API client is loaded. Loads the
       * discovery doc to initialize the API.
       */
      async function initializeGapiClient() {
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeEnableButtons();
      }

      /**
       * Callback after Google Identity Services are loaded.
       */
      function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
      }

      /**
       * Enables user interaction after all libraries are loaded.
       */
      function maybeEnableButtons() {
        if (gapiInited && gisInited) {
          document.getElementById('authorize_button').style.visibility = 'visible';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick() {
        tokenClient.callback = async (resp) => {
          if (resp.error !== undefined) {
            throw (resp);
          }
          document.getElementById('signout_button').style.visibility = 'visible';
          document.getElementById('authorize_button').innerText = 'Refresh';
          // await listUpcomingEvents();
        };

        if (gapi.client.getToken() === null) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          tokenClient.requestAccessToken({prompt: ''});
        }
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick() {
        const token = gapi.client.getToken();
        if (token !== null) {
          google.accounts.oauth2.revoke(token.access_token);
          gapi.client.setToken('');
          // document.getElementById('content').innerText = '';
          document.getElementById('authorize_button').innerText = 'Authorize';
          document.getElementById('signout_button').style.visibility = 'hidden';
        }
      }

      

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      // async function listUpcomingEvents() {
      //   let response;
      //   try {
      //     const request = {
      //       'calendarId': 'primary',
      //       'timeMin': (new Date()).toISOString(),
      //       'showDeleted': false,
      //       'singleEvents': true,
      //       'maxResults': 10,
      //       'orderBy': 'startTime',
      //     };
      //     response = await gapi.client.calendar.events.list(request);
      //   } catch (err) {
      //      document.getElementById('content').innerText = err.message;
      //     return;
      //   }

        // const events = response.result.items;
        // if (!events || events.length == 0) {
        //   document.getElementById('content').innerText = 'No events found.';
        //   return;
        // }
        // Flatten to string to display
      //   const output = events.reduce(
      //       (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
      //       'Events:\n');
      //   document.getElementById('content').innerText = output;
      // }

//second page variables
var btnsubmitEl = document.getElementById('formsubmit');
var inputEl =document.getElementById('eventName');


//add event to google calendar 
function createEventGoogle(){

    const event = {
      'summary': 'New fake event',
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': '2023-04-28T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': '2023-04-30T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'colorId':3,
    };

    const request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });
    
    request.execute(function(event) {
      appendPre('Event created: ' + event.htmlLink);
    });
    
  }

  function saveInfoEvent(event){
    event.preventDefault()
  if(localStorage !== null){
    var selecteDateUser = localStorage.getItem("dateselected");
    var eventName =inputEl.value;

  }
  

  console.log(selecteDateUser)
  console.log(eventName)
  
  
  }
  btnsubmitEl.addEventListener('click', saveInfoEvent)

  // alivia's code starts
// Get the input and button elements
const taskInput = document.querySelector('.task-input');
const addButton = document.querySelector('#add-button');
const eventForm = document.querySelector('#eventForm');
const eventInput = document.querySelector('#eventInput');
const events = document.querySelectorAll('.event');

// Load events from local storage
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key.startsWith('event')) {
    const value = localStorage.getItem(key);
    const index = key.split('-')[1];
    events[index].textContent = value;
  }
}

// Add new event to the planner and local storage
function addEvent(e) {
  e.preventDefault();
  const text = eventInput.value.trim();
  if (text.length === 0) return;
  for (let i = 0; i < events.length; i++) {
    if (events[i].textContent === '') {
      events[i].textContent = text;
      localStorage.setItem
    }}}

// Load tasks from local storage
loadTasks();

// Add event listener to button
addButton.addEventListener('click', addTask);

// Add event listener to input field for pressing enter key
taskInput.addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
		addTask();
	}
});

function addTask() {
	// Get the ul element and create a new li element
	const taskList = document.querySelector('#list');
	const newTask = document.createElement('li');

	// Create a new checkbox and input field
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.addEventListener('click', saveTasks);

	const taskInput = document.createElement('input');
	taskInput.type = 'text';
	taskInput.classList.add('task-input');
	taskInput.addEventListener('input', saveTasks);

	// Append the checkbox and input field to the new li element
	newTask.appendChild(checkbox);
	newTask.appendChild(taskInput);

	// Append the new li element to the ul element
	taskList.appendChild(newTask);

	// Clear the input field
	taskInput.value = '';

	// Set focus on the input field
	taskInput.focus();
}

function saveTasks() {
	// Get all the input fields and checkboxes
	const taskInputs = document.querySelectorAll('.task-input');
	const checkboxes = document.querySelectorAll('input[type="checkbox"]');

	// Save each task and its checked status to local storage
	let tasks = [];
	for (let i = 0; i < taskInputs.length; i++) {
		const task = taskInputs[i].value.trim();
		const checked = checkboxes[i].checked;
		if (task !== '') {
			tasks.push({ task: task, checked: checked });
		}
	}
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
	// Load tasks from local storage and create the necessary elements
	let tasks = JSON.parse(localStorage.getItem('tasks'));
	if (tasks !== null) {
		const taskList = document
  }
}

// alivias code ends