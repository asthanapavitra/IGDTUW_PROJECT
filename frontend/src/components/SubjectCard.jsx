import React from 'react'
import { Link } from 'react-router-dom'

const SubjectCard = () => {
  return (
    <div className="cursor-pointer group relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-80 md:w-75 hover:shadow-lg transition-shadow duration-300">
  <div className="relative h-56 -mb-4 md:m-2.5 overflow-hidden text-white rounded-md">
    <img className="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110" 
         src="https://images.unsplash.com/photo-1496436818536-e239445d3327?q=80&w=1200" alt="investment-seed-round" />
  </div>
  <div className="px-4 py-2">
    <h6 className="mb-2 text-slate-800 text-xl font-semibold">
      Successful Seed Round
    </h6>
    <p className="text-slate-600 leading-normal font-light">
      We are thrilled to announce the completion of our seed round, securing $2M in investment to fuel product development and market expansion.
    </p>
  </div>
  <div className="px-4 pb-6 pt-0 mt-2">
    <Link className="rounded-md bg-slate-800 py-2.5 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"to='/course' >
      Read article
    </Link>
  </div>
</div> 
  )
}

export default SubjectCard
