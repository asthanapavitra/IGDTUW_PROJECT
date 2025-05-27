import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SubjectCard = ({ course }) => {
  const navigate = useNavigate()
  const [imgUrl, setImgUrl] = useState('')
  const [loading, setLoading] = useState(true)

  // Use Google Gemini Flash 2 Text-to-Image API to generate a subject-related image
  // async function fetchGeminiFlashImage(subject) {
  //   setLoading(true)
  //   try {
  //     const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
  //     const response = await fetch(
  //       'https://generativelanguage.googleapis.com/v1beta2/textToImage:generate',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${apiKey}`,
  //         },
  //         body: JSON.stringify({
  //           prompt: subject,
  //           model: 'image-alpha-flash-2',    // switch to Gemini Flash 2 image model
  //           imageCount: 1,
  //           imageSize: '1024x1024',
  //         }),
  //       }
  //     )
  //     const data = await response.json()
  //     if (data.candidates && data.candidates.length > 0) {
  //       setImgUrl(data.candidates[0].imageUri)
  //     } else {
  //       console.warn('Gemini Flash 2 returned no images for:', subject)
  //       setImgUrl('')
  //     }
  //   } catch (err) {
  //     console.error('Gemini Flash 2 fetch error:', err)
  //     setImgUrl('')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   if (course.subject) fetchGeminiFlashImage(course.subject)
  // }, [course.subject])

  return (
    <div className="cursor-pointer group relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-80 md:w-75 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-56 -mb-4 md:m-2.5 overflow-hidden text-white rounded-md bg-gray-100 flex items-center justify-center">
        {loading ? (
          <span className="text-gray-400">Generating image...</span>
        ) : imgUrl ? (
          <img
            className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] transform group-hover:scale-110"
            src={imgUrl}
            alt={course.subject}
          />
        ) : (
          <span className="text-gray-400">No image available</span>
        )}
      </div>

      <div className="px-4 py-2">
        <h6 className="mb-2 text-slate-800 text-xl font-semibold">
          {course.subject}
        </h6>
        <p className="text-slate-600 leading-normal font-light">
          {course.subject_code}
          <br />
          {course.allotments?.[0]?.faculty?.fullName?.firstName}{' '}
          {course.allotments?.[0]?.faculty?.fullName?.lastName}
        </p>
      </div>

      <div className="px-4 pb-6 pt-0 mt-2">
        <button
          onClick={() => navigate('/course', { state: { allotments: course.allotments } })}
          className="rounded-md bg-slate-800 py-2.5 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default SubjectCard
