import React, { useRef, useState } from 'react';
import "./index.css";
import { useEffect } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const Testimonials = () => {
  let usersTestimonials = [
    {
      name:"User 1",
      image:"/assets/images/bus.jpg",
      description:"A nice app indeed"
    },
    {
      name:"User 2",
      image:"/assets/images/bus1.jpg",
      description:"All features well articulated"
    },
    {
      name:"User 3",
      image:"/assets/images/bus2.jpg",
      description:"Return worked well"
    },
  ]

  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedIndex,setSelectedIndex] = useState(0);

  const clickAndscrollTo = (index)=>{
    setSelectedIndex(index);
    scrollRef.current.scrollLeft = (index*containerRef.current.getBoundingClientRect().width-30)
  }
  useEffect(()=>{
    window.scroll(0,0);
  },[])
  return (
    <div
    ref={containerRef}
    className='testimonials'
    style={{
        marginTop:20
    }}
    >
      <div className='testimonials-holder' >
        <div
        className='testimonials-banner'
        ref={scrollRef}
        >
          {
            usersTestimonials.map((item,index)=>{
              return(
                <div className='testimonial' >
                  <label>
                    <FaQuoteLeft/> <br></br>
                    {item.description} 
                    <FaQuoteRight  /> 
                  </label>
                  <div
                  className='testimonial-user'
                  >
                    <img
                    src={item.image}
                    />
                    <label>{item.name}</label>
                  </div>
                </div>
              )
            })
          }
        </div>
        
      </div>
      <div
      className='sliders'
      >
        {usersTestimonials.map((item,index)=>{
          return(
            <div
            onClick={()=>clickAndscrollTo(index)}
            style={{
              width:20,
              height:5,
              backgroundColor:selectedIndex==index?"var(--app-color)":"red"
            }}
            />
          )
        })}
        
      </div>
    </div>
  )
}

export default Testimonials