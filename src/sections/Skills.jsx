import {FaReact, FaMicrosoft, FaAws} from 'react-icons/fa';
import {SiNextdotjs, SiTypescript, SiTailwindcss, SiFastapi, SiDocker, SiMongodb, SiAngular, SiZoho} from 'react-icons/si';
import {DiNodejsSmall} from 'react-icons/di';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';


export default function Skills() {

const skills = [
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiAngular />, name: "Angular" },
    { icon: <FaMicrosoft />, name: "Microsoft D365" },
    { icon: <SiZoho />, name: "Zoho" },
    { icon: <FaAws />, name: "AWS" },
  ];
const repeated = [...skills , ...skills]

const [dir , setDir] = useState(-1);
const [active , setActive] = useState(false);
const sectionRef = useRef(null);
const trackRef = useRef(null);
const touchY = useRef(null);
const x= useMotionValue(0);

useEffect(()=> {
const el = sectionRef.current;
if(!el) return;

const io = new IntersectionObserver((
  [entry]) => {
    setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
  }, 
{ threshold : [0.1 ] }
)
io.observe(el);
return () => io.disconnect();

}, [])

useEffect(()=> {
  if(!active) return;

  const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);
  const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
  const onTouchMove = (e) => {
    if(touchY.current == null) return;
    const delta = e.touches[0].clientY - touchY.current;
    setDir( delta > 0 ? 1 : -1);
    touchY.current = e.touches[0].clientY; 
  };
  window.addEventListener('wheel' , onWheel , {passive : true});
  window.addEventListener('touchstart' , onTouchStart , {passive : true});
  window.addEventListener('touchmove' , onTouchMove , {passive : true});

  return () => {
    window.removeEventListener('wheel' , onWheel);
    window.removeEventListener('touchstart' , onTouchStart);
    window.removeEventListener('touchmove' , onTouchMove);
  }
},[active]);



useEffect(()=> {
  let id;
  let last = performance.now();
  const SPEED = 80;

  const tick = (now) => {
    const dt = (now -last)/1000;
    last = now;
    let next = x.get() + SPEED*dir*dt;
    const loop = trackRef.current?.scrollWidth/2 || 0;

    if(loop){
      if(next <= -loop) next += loop;
      if(next >= 0) next -= loop;
    }
    x.set(next)
    id = requestAnimationFrame(tick)
  }
  id = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(id);
}, [dir , x]);


  return(
    <section id="skills" 
    ref={sectionRef}
    className="w-full py-10 md:py-12 lg:py-16 flex flex-col items-center justify-center relative bg-background text-foreground overflow-hidden">
      <div className='absolute inset-0 pointer-events-none'>
<div className='absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-violet to-teal
opacity-15 blur-[120px] animate-pulse
'/>
<div className='absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-teal to-violet
opacity-15 blur-[120px] animate-pulse delay-500
' />

      </div>

      <motion.h2 className='text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal to-violet z-10'
      initial={{opacity:0 , y: -30}}
      whileInView={{opacity:1 , y:0}}
      transition={{duration:0.5 , delay:0.1 }}
      >
        My Skills
      </motion.h2>
      <motion.p className='mt-2 mb-8 text-foreground/90 text-base sm:text-lg z-10'
      initial={{opacity:0 , y: -10}}
      whileInView={{opacity:1 , y:0}}
      transition={{duration:0.5 , delay:0.1 }}
      
      >
Modern Applications | Modern Technologies
      </motion.p>

<div  className='relative w-full overflow-hidden'>
<motion.div
ref={trackRef}
className='flex gap-10 pt-6 text-6xl text-teal'
style={{x, whiteSpace: "nowrap" , willChange: "transform"}}
>

{repeated.map((s,i) => (
  <div
  key={i}
  tabIndex={0}
  className='group relative flex flex-col items-center gap-2 min-w-[120px] outline-none'
  aria-label = {s.name}
  title = {s.name}
  >
{/* gradient halo glow, sits behind the icon */}
<span
  aria-hidden="true"
  className='pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full
  bg-gradient-to-br from-teal/40 to-violet/40 blur-xl opacity-0 scale-75
  transition-all duration-300 ease-out
  group-hover:opacity-100 group-hover:scale-100
  group-focus-visible:opacity-100 group-focus-visible:scale-100
  motion-reduce:transition-none'
/>
<span className='relative z-10 inline-block transition-transform duration-300 ease-out
group-hover:-translate-y-1.5 group-hover:scale-[1.08]
group-focus-visible:-translate-y-1.5 group-focus-visible:scale-[1.08]
motion-reduce:transition-none motion-reduce:transform-none'>
{s.icon}
</span>
<p className='relative z-10 text-sm text-foreground/80 transition-colors duration-300 ease-out
group-hover:text-foreground group-focus-visible:text-foreground'>
  {s.name}
</p>
  </div>
))}
</motion.div>


</div>


    </section>
  )
}