import React, {useState, useRef, Suspense} from 'react'
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import  Fox  from '../models/Fox';
import { Loader } from '../components/Loader';
export const Contact = () => {
  const [currentAnimation, setCurrentAnimation]= useState('idle');
  const formref = useRef(null);
  const [isloading, setIsloading] = useState(false);
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    message: '',
  })

  const onsubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    setCurrentAnimation('hit');

    emailjs.send( 
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID, 
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID, 
      {
        from_name: form.name,
        to_name: 'Het Patel', 
        from_email: form.email,
        to_email: 'hetptl143324@gmail.com', 
        message: form.message,  
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsloading(false);
      alert('Thank you. I will get back to you as soon as possible.');

      setTimeout(() => {
        setCurrentAnimation('idle');

      setForm({
        name: '',
        email: '',
        message: '',
      })
      }, 3000);
      
    }, (error) => {
      setIsloading(false);
      setCurrentAnimation('idle');
      console.log(error);
      alert('Something went wrong. Please try again.');
    });
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }
  const handlefocus = (e) => {
    setCurrentAnimation('walk');
  }
  const handleblur = (e) => {
    setCurrentAnimation('Idle');
  }
  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in Touch</h1>
        <form className='w-full flex flex-col gap-7 mt-14' ref={formref} onSubmit={onsubmit}>
          <label className=" text-black-500 font-semibold">
            Name
            <input type="text" name="name" className="input" placeholder="Your Name" required value={form.name} onChange={handleChange} onFocus={handlefocus} onBlur={handleblur}/>
          </label>
          <label className=" text-black-500 font-semibold">
            Email
            <input type="email" name="email" className="input" placeholder="Your Email" required value={form.email} onChange={handleChange} onFocus={handlefocus} onBlur={handleblur}/>
          </label>
          <label className=" text-black-500 font-semibold">
            Message
            <textarea name="message" rows={4} className="input resize-none" placeholder="Your Message" required value={form.message} onChange={handleChange} onFocus={handlefocus} onBlur={handleblur}/>
          </label>
          <button type="submit" className='btn ' disabled={isloading}>{isloading ? "Sending" : "Send Message"}</button> 
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
      <Canvas camera={{position: [0, 0, 5], fov: 75, near: 0.1, far:1000 }}>
        <directionalLight position={[0,0,1]} intensity={2.5}/>
        <ambientLight intensity={0.5}/>
        <Suspense fallback={<Loader/>}> 
          <Fox position={[0.5, 0.35, 0]}
          currentAnimation={currentAnimation}
          rotation={[12.6, -0.6, 0]}
          scale={[0.5,0.5,0.5]}/>
        </Suspense>
        </Canvas>
      </div>
    </section>
  )
}
