import { NextPage } from 'next'
import { redirect } from 'next/navigation'


const ProfileStudent = ({}) => {
  return redirect("/tutor-dashboard/profile")
}

export default ProfileStudent