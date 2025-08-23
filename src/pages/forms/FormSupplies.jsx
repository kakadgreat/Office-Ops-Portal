import React from 'react'

export default function OrderSupplies(){
  return (
    <div className="page" style={{display:'grid', gap:16}}>
      <div className="page-title">Order Supplies</div>
      <div className="card">
        <form action="https://formsubmit.co/ankuryadav@outlook.com" method="POST">
          <input type="hidden" name="_subject" value="Supply Order Submitted" />
          <input type='hidden' name='_captcha' value='false' />\n<input type='hidden' name='_next' value='/thanks' />
          <label>Location<br/><input type='text' name='Location' required/></label>\n<label style='display:block;margin-top:8px'>Items needed<br/><textarea name='Items' rows='5' required></textarea></label>\n<label style='display:block;margin-top:8px'>Needed by date<br/><input type='text' name='Needed By'/></label>\n<label style='display:block;margin-top:8px'>Requested by (name)<br/><input type='text' name='Requested By' required/></label>
          <div style={{marginTop:12}}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
