import React from 'react'
import Card from '../ui/Card.jsx'

export default function Dashboard({ data, query }) {
  if(!data) return <div>Loading...</div>
  const { meetings, events, offices } = data
  const upcoming = (events.items || []).slice(0,4)
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card title="This Month's Meetings">
        <ul className="list-disc ml-5">
          {meetings.recurring.map((m,i) => (
            <li key={i}><b>{m.name}</b> – {m.schedule}</li>
          ))}
        </ul>
      </Card>
      <Card title="Upcoming Events">
        <ul className="list-disc ml-5">
          {upcoming.map((e,i) => (
            <li key={i}><b>{e.title}</b> — {e.date} — {e.location}</li>
          ))}
        </ul>
      </Card>
      <Card title="Office Quick Links">
        <ul className="list-disc ml-5">
          {offices.locations.map((o,i) => (
            <li key={i}><b>{o.name}</b> — {o.address} — {o.county}</li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
