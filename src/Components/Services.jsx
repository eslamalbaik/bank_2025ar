import React from 'react'
import Button from './Button'

const Services = () => {
  return (
    <div className='pt-[100px] px-4'>
    <h2 className='text-white text-[20px] leading-[20px]'>الخدمات المصرفية عبر الأنترنت</h2>
    <div className=''>
    <div className="flex justify-center items-center gap-4 w-full mt-12">
    <Button text_btn="تفعيل التطبيق " link_btn="login"/>
    <Button text_btn="الاشتراك بالجوائز " link_btn="subs"/>
    </div>
    <div className="flex justify-center items-center gap-4 w-full mt-6">
    <Button text_btn="تفعيل iBURAQ" link_btn="subs"/>  
     <Button text_btn="القروض" link_btn="subs"/>
    </div>
    <div className="flex justify-center items-center gap-4 w-full mt-6">
     <Button text_btn="تجديد البطاقه" link_btn="subs"/>
    <Button text_btn="حذف الأجهزة" link_btn="subs"/>
    </div>
    <div className='mt-6'>
    <Button text_btn="تفعيل التطبيق بدون انترنت" link_btn="subs"/>
    </div>
    </div>
    </div>
  )
}

export default Services