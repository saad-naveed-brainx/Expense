import React from 'react'
import { GiClosedDoors } from 'react-icons/gi'

export default function Expenses() {
  return (
    <div className='bg-black rounded-xl p-4 h-full flex flex-col'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-white'>New Expense</h1>
        <Buttom>
          <GiClosedDoors />
        </Buttom>
      </div>
    </div>

  )
}