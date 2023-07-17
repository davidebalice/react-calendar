import React, { useState, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import classes from "./Calendar.module.css";
import Modal from "./Modal";
import { Context } from "../common/Context";

const Calendar = () => {
  const { show, setShow, handleShow } = useContext(Context);
  const [events, setEvents] = useState([
    { title: "Meeting", start: new Date() },
    { title: "event 1", start: "2023-07-04 13:00:00" },
    { title: "event 2", start: "2023-07-04 12:00:00" },
  ]);
  const [titleValue, setTitleValue] = useState("");
  const [startValue, setStartValue] = useState(
    new Date().toISOString().slice(0, 16)
  );

  const handleClose = () => setShow(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEvent = {
      title: titleValue,
      start: moment(startValue).format("YYYY-MM-DD HH:mm:ss"),
    };
    setEvents([...events, newEvent]);
    setTitleValue("");
    setStartValue("");
    handleClose();
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <b className={classes.start}>{eventInfo.timeText}</b> &nbsp;
        <i className={classes.title}>{eventInfo.event.title}</i>
      </>
    );
  }

  const modifyEventByDate = (date, newTitle, newDate) => {
    const updatedEvents = events.map((event) => {
      const eventStart = new Date(event.start);
      const targetDate = new Date(date);

      // Rimuovi i secondi dalla data
      eventStart.setSeconds(0, 0);
      targetDate.setSeconds(0, 0);

      // Confronta le date senza considerare i secondi
      if (eventStart.getTime() === targetDate.getTime()) {
        return {
          ...event,
          title: newTitle,
          start: newDate,
        };
      }

      return event;
    });

    setEvents(updatedEvents);
  };

  const handleDateSelect = (selectInfo) => {
    const dateStart = `${selectInfo.startStr}T08:00`;
    setStartValue(dateStart);
    handleShow();
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
  };

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event.title);
    console.log(clickInfo.event.start);
    handleShow();

    let calendarApi = clickInfo.view.calendar;
    calendarApi.unselect();

    modifyEventByDate(
      clickInfo.event.start,
      "3456565435345",
      "2023-07-18T00:00"
    );

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

  return (
    <div>
      <h2>Calendar React</h2>

      <h5 className="mb-5">
        This demo use fullcalendar React package, I create a events management
        with modal window
      </h5>

      <Modal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        handleSubmit={handleSubmit}
        titleValue={titleValue}
        setTitleValue={setTitleValue}
        startValue={startValue}
        setStartValue={setStartValue}
      />

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

export default Calendar;
