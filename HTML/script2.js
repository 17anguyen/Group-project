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
var donebtnEl = document.getElementById('closeEventTab');


//add event to google calendar 
function createEventGoogle(nameEvent,dateTStart, dateTimeEnd){

    const event = {
      'summary': nameEvent,
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': dateTStart,
        'timeZone': '',
      },
      'end': {
        'dateTime': dateTimeEnd,
        'timeZone': '',
      },
      'attendees': [
        {'email': 'lpage@example.com'},
        {'email': 'sbrin@example.com'}
      ],

      'colorId':3,
    };

    const request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });
    
    request.execute(function(event) {
      appendPre('Event created: ' + event.summary);
    });
    
  }

  function saveInfoEvent(event){
    event.preventDefault()
  if(localStorage !== null){
    var selecteDateUser = localStorage.getItem("dateselected");
    var starthour = "14"
    var endhour = parseInt(starthour)+ 01;
    console.log(endhour)
    var dateParsestart = dayjs(selecteDateUser).format('YYYY-MM-DDT'+starthour+':mm:ssZ') ;
    var dateParseend = dayjs(selecteDateUser).format('YYYY-MM-DDT'+endhour+':mm:ssZ')

    var eventName =inputEl.value;

    createEventGoogle(eventName,dateParsestart,dateParseend);


  }
  
  }
  function backToMainCalendar(){
    window.location.href = "../index.html";
    //save info to local storage

  }
  btnsubmitEl.addEventListener('click', saveInfoEvent)
  donebtnEl.addEventListener('click',backToMainCalendar)