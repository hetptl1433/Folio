import React from 'react'

export const Contact = () => {
  const setLoading = () => {}
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  }
  const handlefocus = (e) => {
    e.target.classList.add('input-focus');
  }
  const handleblur = (e) => {
    e.target.classList.remove('input-focus');
  }
  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in Touch</h1>
        <form className='w-full flex flex-col gap-7 mt-14'>
          <label className=" text-black-500 font-semibold">
            Name
            <input type="text" name="name" className="input" placeholder="Your Name" required value={form.name} onchange={handleChange} onFocus={handlefocus} onBlur={handleblur}/>
          </label>
          <label className=" text-black-500 font-semibold">
            Email
            <input type="email" name="email" className="input" placeholder="Your Email" required value={form.email} onchange={handleChange} onFocus={handlefocus} onBlur={handleblur}/>
          </label>
          <label className=" text-black-500 font-semibold">
            Message
            <textarea name="message" rows={4} className="input resize-none" placeholder="Your Message" required value={form.message} onchange={handleChange} onFocus={handlefocus} onBlur={handleblur}/>
          </label>
          <button type="submit" className='btn  '>Send Message</button> 
        </form>
      </div>
    </section>
  )
}
