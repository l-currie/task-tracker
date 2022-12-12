import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TaskList from '/components/TaskList'
import Title from '../components/Title'

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] flex-row justify-center h-screen">
      <Title />
      <div>
      <TaskList />
      </div>
       

    </div>
  )
}
