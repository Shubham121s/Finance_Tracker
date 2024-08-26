import TransactionForm from '@/components/TransactionForm'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';

export default function page() {
  return (
    <div className='flex justify-center items-center mt-10'>
      <TransactionForm />
    </div>
  )
}
