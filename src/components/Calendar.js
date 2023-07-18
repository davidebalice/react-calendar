import React, { useState, useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import classes from "./Calendar.module.css";
import Modal from "./Modal";
import Description from "./Description";
import { Context } from "../common/Context";

const Calendar = () => {
  const { show, setShow, handleShow, modalType, setModalType } =
    useContext(Context);
  const [events, setEvents] = useState([]);
  const [titleValue, setTitleValue] = useState("");
  const [startValue, setStartValue] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [editDate, setEditDate] = useState();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const modifyEventByDate = (date, newTitle, newDate) => {
    const updatedEvents = events.map((event) => {
      const eventStart = new Date(event.start);
      const targetDate = new Date(date);
      eventStart.setSeconds(0, 0);
      targetDate.setSeconds(0, 0);
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

  const handleClose = () => setShow(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (modalType === "add") {
      const newEvent = {
        title: titleValue,
        start: moment(startValue).format("YYYY-MM-DD HH:mm:ss"),
      };
      setEvents([...events, newEvent]);
      setTitleValue("");
      setStartValue("");
    } else {
      modifyEventByDate(editDate, titleValue, startValue);
    }
    handleClose();
  };

  const handleDelete = (eventDate) => {
    //const updatedEvents = events.filter((event) => event.start !== date);
    const updatedEvents = events.filter((event) => {
      const eventStartDate = new Date(event.start);
      const targetDate = new Date(eventDate);
      return eventStartDate.getTime() !== targetDate.getTime();
    });

    setEvents(updatedEvents);
    setTitleValue("");
    setStartValue("");
    handleClose();
  };

  const addDemoEvent = () => {
    const currentDate = new Date();
    const today = new Date(currentDate.getTime());
    today.setHours(8);
    today.setMinutes(45);
    const formattedToday = formatDate(today);
    const newEvent = {
      title: "today",
      start: formattedToday,
    };

    const nextDay = new Date(currentDate.getTime() + 48 * 60 * 60 * 1000);
    nextDay.setHours(10);
    nextDay.setMinutes(30);
    const formattedNextDay = formatDate(nextDay);
    const newEvent1 = {
      title: "aaaaaaaaaaaa",
      start: formattedNextDay,
    };

    const previousDay = new Date(currentDate.getTime() - 48 * 60 * 60 * 1000);
    previousDay.setHours(9);
    previousDay.setMinutes(0);
    const formattedPreviousDay = formatDate(previousDay);
    const newEvent2 = {
      title: "bbbbbbbbbbbbbb",
      start: formattedPreviousDay,
    };

    const anotherDay = new Date(currentDate.getTime() - 64 * 60 * 60 * 1000);
    anotherDay.setHours(13);
    anotherDay.setMinutes(0);
    const formattedAnotherDay = formatDate(anotherDay);
    const newEvent3 = {
      title: "ccccccccccccccccc",
      start: formattedAnotherDay,
    };

    setEvents([...events, newEvent, newEvent1, newEvent2, newEvent3]);
  };

  useEffect(() => {
    addDemoEvent();
  }, []);

  function renderEventContent(eventInfo) {
    return (
      <>
        <b className={classes.start}>{eventInfo.timeText}</b> &nbsp;
        <i className={classes.title}>{eventInfo.event.title}</i>
      </>
    );
  }

  const handleDateSelect = (selectInfo) => {
    setModalType("add");
    const dateStart = `${selectInfo.startStr}T08:00`;
    setStartValue(dateStart);
    handleShow();
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
  };

  const handleEventClick = (clickInfo) => {
    setModalType("edit");
    setEditDate(clickInfo.event.start);
    const { title, start } = clickInfo.event;
    const formattedStart = formatDate(start);
    setTitleValue(title);
    setStartValue(formattedStart);
    console.log(formattedStart);
    handleShow();

    let calendarApi = clickInfo.view.calendar;
    calendarApi.unselect();
  };

  return (
    <div>
      <Description />

      <Modal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        titleValue={titleValue}
        setTitleValue={setTitleValue}
        startValue={startValue}
        setStartValue={setStartValue}
        modalType={modalType}
        setModalType={setModalType}
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
