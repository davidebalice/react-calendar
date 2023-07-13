import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import Form from "react-bootstrap/Form";
import moment from "moment";
import classes from "./Calendar.module.css";

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: "Meeting", start: new Date() },
    { title: "event 1", start: "2023-07-04 13:00:00" },
    { title: "event 2", start: "2023-07-04 12:00:00" },
  ]);
  const [titleValue, setTitleValue] = useState("");
  const [startValue, setStartValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEvent = {
      title: titleValue,
      start: moment(startValue).format("YYYY-MM-DD HH:mm:ss"),
    };
    setEvents([...events, newEvent]);
    setTitleValue("");
    setStartValue("");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={startValue}
            onChange={(event) => setStartValue(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={titleValue}
            onChange={(event) => setTitleValue(event.target.value)}
          />

          <button type="submit">Aggiungi</button>
        </Form.Group>
      </Form>

      <h2>Calendar React</h2>
      <h5 className="mb-5">
        This demo use fullcalendar React package, I create a events management
        with modal window
      </h5>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventClick={handleEventClick}
        weekends={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
        eventContent={renderEventContent}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        timeFormat="H:mm"
        select={handleDateSelect}
        events={events}
      />
    </div>
  );
};
//        eventTimeFormat={{ hour12: false }}

function renderEventContent(eventInfo) {
  return (
    <>
      <b className={classes.start}>{eventInfo.timeText}</b> &nbsp;
      <i className={classes.title}>{eventInfo.event.title}</i>
    </>
  );
}

const handleDateSelect = (selectInfo) => {
  let title = prompt("Please enter a new title for your event");
  let calendarApi = selectInfo.view.calendar;

  calendarApi.unselect(); // clear date selection

  if (title) {
    /*
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });*/
  }
};

const handleEventClick = (clickInfo) => {
  console.log(clickInfo.event.title);
  console.log(clickInfo.event.start);
  /*
  if (
    confirm(
      `Are you sure you want to delete the event '${clickInfo.event.title}'`
    )
  ) {
    clickInfo.event.remove();
  }
*/
};

const handleEvents = (events) => {
  this.setState({
    currentEvents: events,
  });
};

export default Calendar;

//https://stackblitz.com/github/fullcalendar/fullcalendar-examples/tree/main/react?file=src%2Fevent-utils.js

/*


import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'

export default class DemoApp extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: []
  }

  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          
            />
            </div>
          </div>
        )
      }
    
      renderSidebar() {
        return (
          <div className='demo-app-sidebar'>
            <div className='demo-app-sidebar-section'>
              <h2>Instructions</h2>
              <ul>
                <li>Select dates and you will be prompted to create a new event</li>
                <li>Drag, drop, and resize events</li>
                <li>Click an event to delete it</li>
              </ul>
            </div>
            <div className='demo-app-sidebar-section'>
              <label>
                <input
                  type='checkbox'
                  checked={this.state.weekendsVisible}
                  onChange={this.handleWeekendsToggle}
                ></input>
                toggle weekends
              </label>
            </div>
            <div className='demo-app-sidebar-section'>
              <h2>All Events ({this.state.currentEvents.length})</h2>
              <ul>
                {this.state.currentEvents.map(renderSidebarEvent)}
              </ul>
            </div>
          </div>
        )
      }
    

      handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
    
        calendarApi.unselect() // clear date selection
    
        if (title) {
          calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          })
        }
      }
    
      handleEventClick = (clickInfo) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
          clickInfo.event.remove()
        }
      }
    
      handleEvents = (events) => {
        this.setState({
          currentEvents: events
        })
      }
    
    }
    
    function renderEventContent(eventInfo) {
      return (
        <>
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
        </>
      )
    }
    
    function renderSidebarEvent(event) {
      return (
        <li key={event.id}>
          <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
          <i>{event.title}</i>
        </li>
      )
    }
  */
