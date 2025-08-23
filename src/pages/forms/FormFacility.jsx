import React from 'react'

export default function ReportaFacilityIssue(){
  return (
    <div className="page" style={display:'grid', gap:16}>
      <div className="page-title">Report a Facility Issue</div>
      <div className="card">
        <form action="https://formsubmit.co/ankuryadav@outlook.com" method="POST">
          <input type="hidden" name="_subject" value="Facility Issue Submitted" />
          <input type='hidden' name='_captcha' value='false' />\n<input type='hidden' name='_next' value='/thanks' />
          <label>Location<br/><input type='text' name='Location' required/></label>\n<label style='display:block;margin-top:8px'>Issue<br/><textarea name='Issue' rows='5' required></textarea></label>\n<label style='display:block;margin-top:8px'>Reported by (name)<br/><input type='text' name='Reported By' required/></label>\n<label style='display:block;margin-top:8px'>Contact email/phone<br/><input type='text' name='Contact'/></label>
          <div style={marginTop:12}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
