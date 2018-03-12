import React from 'react';

// Sample Events
// http://api.eventful.com/rest/events/search?app_key=ggDtcWH8PpkKG8N5&keywords=Deer%20&date=Future&where=40.8243482,-73.937445&within=25

// add &categories=music at the end to narrow down results even further

function EventsBy() {
  return (
    <div className="eventful-badge eventful-small">
      <img src="http://api.eventful.com/images/powered/eventful_58x20.gif"
        alt="Local Events, Concerts, Tickets" />
      <p><a href="http://eventful.com/">Events</a> by Eventful</p>
    </div>
  );
}

export default EventsBy;
