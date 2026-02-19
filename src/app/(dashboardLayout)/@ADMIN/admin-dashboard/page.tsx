import { NextPage } from 'next'
import { redirect } from 'next/navigation'


const Profile = ({}) => {
  return redirect("/admin-dashboard/profile")
}

export default Profile