import { NextPage } from 'next'
import { redirect } from 'next/navigation'


const Profile = ({}) => {
  return redirect("/dashboard/profile")
}

export default Profile