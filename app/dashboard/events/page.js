'use client'
import React from 'react'
import EventList from '../../../components/EventList'

const EventsPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-white mt-7 ml-4">All Events</h1>
        <EventList/>
        </>
  )
}

export default EventsPage