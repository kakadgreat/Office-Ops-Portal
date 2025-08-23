import React from 'react'

export default function RequestTimeOff(){
  return (
    <div className="page" style={display:'grid', gap:16}>
      <div className="page-title">Request Time Off</div>
      <div className="card">
        <form action="https://formsubmit.co/ankuryadav@outlook.com" method="POST">
          <input type="hidden" name="_subject" value="Time Off Request Submitted" />
          <input type='hidden' name='_captcha' value='false' />\n<input type='hidden' name='_next' value='/thanks' />
          <label>Employee name<br/><input type='text' name='Employee' required/></label>\n<label style='display:block;margin-top:8px'>Dates requested<br/><input type='text' name='Dates' required/></label>\n<label style='display:block;margin-top:8px'>Reason<br/><input type='text' name='Reason'/></label>\n<label style='display:block;margin-top:8px'>Supervisor (optional)<br/><input type='text' name='Supervisor'/></label>
          <div style={marginTop:12}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
